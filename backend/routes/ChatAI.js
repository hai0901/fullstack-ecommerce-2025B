// backend/routes/ChatAI.js
const express = require('express');
const router = express.Router();
const requireAuth = require('../middleware/auth');
const Product = require('../models/Product');
const { fetch } = require('undici');

const RESPONSES_URL = 'https://api.openai.com/v1/responses';
const CHAT_URL = 'https://api.openai.com/v1/chat/completions';

const MODEL = process.env.OPENAI_MODEL || 'gpt-5-mini'; // primary
const FALLBACK_CHAT_MODEL = process.env.OPENAI_FALLBACK_CHAT_MODEL || 'gpt-4o-mini'; // only used if OPENAI_FALLBACK_CHAT=1

// Utility: call OpenAI with robust fallbacks
async function callOpenAIExtractIntent({ apiKey, message }) {
  // 1) Responses API (new) — text.format AS OBJECT
  const payloadNew = {
    model: MODEL,
    input: [
      { role: 'system', content: `You extract ecommerce product search intents.
Return ONLY JSON with keys:
- "query": string
- "categories": string[]
- "priceMin": number|null
- "priceMax": number|null` },
      { role: 'user', content: message }
    ],
    // IMPORTANT: format is an OBJECT { type: 'json_object' }
    text: { format: { type: 'json_object' } },
  };

  let resp = await fetch(RESPONSES_URL, {
    method: 'POST',
    headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
    body: JSON.stringify(payloadNew),
  });
  let data = await resp.json();

  // If still complaining about unsupported parameter, try legacy field
  if (!resp.ok && data?.error?.code === 'unsupported_parameter') {
    const payloadLegacy = {
      model: MODEL,
      input: [
        { role: 'system', content: `You extract ecommerce product search intents.
Return ONLY JSON with keys:
- "query": string
- "categories": string[]
- "priceMin": number|null
- "priceMax": number|null` },
        { role: 'user', content: message }
      ],
      response_format: { type: 'json_object' },
    };

    resp = await fetch(RESPONSES_URL, {
      method: 'POST',
      headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
      body: JSON.stringify(payloadLegacy),
    });
    data = await resp.json();
  }

  // Optional: final fallback to Chat Completions if enabled
  if (!resp.ok && process.env.OPENAI_FALLBACK_CHAT === '1') {
    const chatPayload = {
      model: FALLBACK_CHAT_MODEL,
      messages: [
        { role: 'system', content: `You extract ecommerce product search intents.
Return ONLY JSON with keys:
- "query": string
- "categories": string[]
- "priceMin": number|null
- "priceMax": number|null` },
        { role: 'user', content: message }
      ],
      response_format: { type: 'json_object' },
    };

    const chatResp = await fetch(CHAT_URL, {
      method: 'POST',
      headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
      body: JSON.stringify(chatPayload),
    });
    const chatData = await chatResp.json();
    return { ok: chatResp.ok, data: chatData, source: 'chat' };
  }

  return { ok: resp.ok, data, source: 'responses' };
}

// Normalize different OpenAI payload shapes to a JSON string
function extractJSONText(payload) {
  if (!payload) return null;

  // Responses API helpers
  if (payload.output_text) return payload.output_text;
  if (Array.isArray(payload.output) && payload.output[0]?.content?.[0]?.text)
    return payload.output[0].content[0].text;
  if (Array.isArray(payload.content) && payload.content[0]?.text)
    return payload.content[0].text;

  // Chat completions-like
  if (payload.choices?.[0]?.message?.content) return payload.choices[0].message.content;

  return null;
}

router.post('/search-products', requireAuth, async (req, res) => {
  try {
    const { message } = req.body || {};
    if (!message) return res.status(400).json({ error: 'message is required' });

    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) return res.status(500).json({ error: 'Missing OPENAI_API_KEY' });

    // --- Call OpenAI ---
    const { ok, data, source } = await callOpenAIExtractIntent({ apiKey, message });

    if (!ok) {
      console.error('OpenAI error:', data);
      const msg = data?.error?.message || 'OpenAI API error';
      return res.status(502).json({ error: msg });
    }

    // --- Parse to object ---
    let jsonStr = extractJSONText(data);
    if (!jsonStr) jsonStr = '{}';

    let parsed;
    try {
      parsed = JSON.parse(jsonStr);
    } catch {
      const cleaned = jsonStr.replace(/```json|```/g, '').trim();
      parsed = JSON.parse(cleaned || '{}');
    }

    const { query, categories, priceMin, priceMax } = parsed || {};

    // --- Build Mongo filter (YES: this queries MongoDB via your Product model) ---
    const filter = {};
    if (query) filter.name = new RegExp(String(query), 'i');
    if (Array.isArray(categories) && categories.length) filter.category = { $in: categories };
    if (priceMin != null || priceMax != null) {
      filter.price = {};
      if (priceMin != null) filter.price.$gte = Number(priceMin);
      if (priceMax != null) filter.price.$lte = Number(priceMax);
    }

    // Final DB fetch (Mongo)
    const items = await Product.find(filter).limit(10).lean();

    return res.json({
      intent: parsed,
      items,
      meta: { source } // 'responses' or 'chat' (for debugging)
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: err.message || 'Server error' });
  }
});

module.exports = router;
