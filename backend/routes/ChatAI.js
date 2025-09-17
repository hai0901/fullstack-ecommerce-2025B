const express = require('express');
const router = express.Router();

const requireAuth = require('../middleware/auth');
const Product = require('../models/Product');
const { fetch } = require('undici');

const RESPONSES_URL = 'https://api.openai.com/v1/responses';
const MODEL = process.env.OPENAI_MODEL || 'gpt-5-mini';

// Normalize OpenAI payload output
function extractJSONText(payload) {
  if (!payload) return null;
  if (payload.output_text) return payload.output_text;
  if (Array.isArray(payload.output) && payload.output[0]?.content?.[0]?.text)
    return payload.output[0].content[0].text;
  if (Array.isArray(payload.content) && payload.content[0]?.text)
    return payload.content[0].text;
  if (payload.choices?.[0]?.message?.content)
    return payload.choices[0].message.content;
  return null;
}

router.post('/search-products', requireAuth, async (req, res) => {
  try {
    const { message } = req.body || {};
    if (!message) return res.status(400).json({ error: 'message is required' });

    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) return res.status(500).json({ error: 'Missing OPENAI_API_KEY' });

    const system = `You extract ecommerce product search intents from user chat.
Return ONLY JSON with keys:
- "query": string
- "categories": string[]
- "priceMin": number|null
- "priceMax": number|null`;

    // ✅ New Responses API format
    const payload = {
      model: MODEL,
      input: [
        { role: 'system', content: system },
        { role: 'user', content: message },
      ],
      text: { format: { type: 'json_object' } }, // <— correct shape
    };

    const resp = await fetch(RESPONSES_URL, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    const data = await resp.json();
    if (!resp.ok) {
      console.error('OpenAI error:', data);
      const msg = data?.error?.message || 'OpenAI API error';
      return res.status(502).json({ error: msg });
    }

    // Parse the JSON string safely
    let jsonStr = extractJSONText(data) || '{}';
    let intent;
    try {
      intent = JSON.parse(jsonStr);
    } catch {
      const cleaned = jsonStr.replace(/```json|```/g, '').trim();
      intent = JSON.parse(cleaned || '{}');
    }

    const { query, categories, priceMin, priceMax } = intent || {};

    // ✅ This is where MongoDB is queried via your Product model
    const filter = {};
    if (query) filter.name = new RegExp(String(query), 'i');
    if (Array.isArray(categories) && categories.length)
      filter.category = { $in: categories };
    if (priceMin != null || priceMax != null) {
      filter.price = {};
      if (priceMin != null) filter.price.$gte = Number(priceMin);
      if (priceMax != null) filter.price.$lte = Number(priceMax);
    }

    const items = await Product.find(filter).limit(10).lean();

    return res.json({ intent, items });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: err.message || 'Server error' });
  }
});

module.exports = router;
