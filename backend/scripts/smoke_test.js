// scripts/smoke_test.js
// RMIT Vietnam | COSC2769 | 2025B | Assignment 02
// Run: node scripts/smoke_test.js
// Requires: npm i axios @3846masa/axios-cookiejar-support tough-cookie dotenv

require('dotenv').config();
const axiosBase = require('axios').default;
const { wrapper } = require('@3846masa/axios-cookiejar-support');
const tough = require('tough-cookie');

const BASE_URL = process.env.BASE_URL || 'http://localhost:5000/api';

// Test identities (unique per run)
const RUN_ID = Date.now();
const CUSTOMER = {
  email: `customer.${RUN_ID}@test.com`,
  password: 'Abc12345!',
  role: 'customer',
  name: 'Smoke Customer',
  address: '123 Smoke St',
};
const VENDOR = {
  email: `vendor.${RUN_ID}@test.com`,
  password: 'Abc12345!',
  role: 'vendor',
  businessName: 'Smoke Vendor 3',      // keep unique + within your uniqueness constraint
  businessAddress: '99 Vendor Ave 3',  // keep unique + within your uniqueness constraint
};
// optional shipper if you later want to cover shipper flows
const SHIPPER = {
  email: `shipper.${RUN_ID}@test.com`,
  password: 'Abc12345!',
  role: 'shipper',
  distributionHubId: null,
};

// Axios with cookie jar (to carry httpOnly JWT cookies)
function newClient() {
  const jar = new tough.CookieJar();
  const instance = wrapper(axiosBase.create({
    baseURL: BASE_URL,
    withCredentials: true,
    validateStatus: () => true,
    headers: { 'Content-Type': 'application/json' },
    jar,
  }));
  instance.jar = jar;
  return instance;
}

const anon = newClient();
const asCustomer = newClient();
const asVendor = newClient();

// ====== Reporting helpers (non-fatal) ======
const RESULTS = { pass: 0, fail: 0, skips: 0, details: [] };

function logOK(label, res) {
  RESULTS.pass += 1;
  console.log(`✔ ${label} -> ${res?.status}`);
}

function logSkip(label, why) {
  RESULTS.skips += 1;
  console.log(`↷ SKIP ${label} (${why})`);
}

function logFail(label, res, err) {
  RESULTS.fail += 1;
  let msg = res?.data?.error || res?.data?.message || res?.statusText || (err && err.message) || 'Unknown error';
  let errors = res?.data?.errors;
  console.error(`✘ ${label} -> ${res?.status ?? 'ERR'} ${msg}`);
  if (Array.isArray(errors)) {
    console.error('  validator errors:', errors);
  }
  RESULTS.details.push({ label, status: res?.status, message: msg, errors });
}

/**
 * Runs a step and ALWAYS continues. Returns response or null.
 * If `expect2xx` is true, it will mark failure when status not 2xx.
 */
async function step(label, fn, expect2xx = true) {
  try {
    const res = await fn();
    if (expect2xx) {
      if (!res || res.status < 200 || res.status >= 300) {
        logFail(label, res);
      } else {
        logOK(label, res);
      }
    } else {
      // no assertion: just log status
      if (res) console.log(`• ${label} -> ${res.status}`);
    }
    return res || null;
  } catch (err) {
    // network/throwing error
    logFail(label, null, err);
    return null;
  }
}

async function registerAndDevVerify(client, payload) {
  const reg = await step(`POST /auth/register (${payload.role})`, () =>
    client.post('/auth/register', payload)
  );
  if (!reg || reg.status < 200 || reg.status >= 300) return null;

  const dv = await step('GET /auth/dev-verify', () =>
    client.get('/auth/dev-verify', { params: { email: payload.email } })
  , false /* don't assert 2xx strictly — dev-only endpoint */);

  const login = await step('POST /auth/login', () =>
    client.post('/auth/login', { email: payload.email, password: payload.password })
  );
  if (!login || login.status < 200 || login.status >= 300) return null;

  const me = await step('GET /auth/me', () =>
    client.get('/auth/me')
  );
  return me?.data || null;
}

(async function run() {
  console.log(`Base URL: ${BASE_URL}`);

  // Basic liveness (ok if 404)
  let res = await step('GET / (API root)', () => anon.get('/'), false);
  if (res?.status === 404) logSkip('GET / (API root)', '404 is acceptable for some setups');

  // ===== Genres (public) =====
  const gCreate = await step('POST /genres', () =>
    anon.post('/genres', { name: `Electronics ${RUN_ID}`, description: 'Smoke genre' })
  );
  const genreId = gCreate?.data?._id;

  await step('GET /genres', () => anon.get('/genres'));
  if (genreId) await step('GET /genres/:id', () => anon.get(`/genres/${genreId}`));
  if (genreId) await step('PUT /genres/:id', () => anon.put(`/genres/${genreId}`, { description: 'Updated smoke genre' }));

  // ===== Auth flows =====
  const vendorMe = await registerAndDevVerify(asVendor, VENDOR);
  const customerMe = await registerAndDevVerify(asCustomer, CUSTOMER);

  // ===== Products (vendor-only write) =====
  // IMPORTANT: Keep name length in [10,20] due to validators
  const suffix = String(RUN_ID).slice(-3);
  const productName = `SmokeBoard${suffix}`; // 13 char
  const pCreate = await step('POST /products (vendor)', () =>
    asVendor.post('/products', {
      name: productName,
      price: 49.99,
      description: 'Smoke seeded keyboard',
      genreId,
      availableStock: 10,
    })
  );
  const productId =
    pCreate?.data?.data?._id ||
    pCreate?.data?._id ||
    pCreate?.data?.product?._id ||
    pCreate?.data?.created?._id ||
    pCreate?.data?.id;

  await step('GET /products', () => anon.get('/products'));
  if (productId) await step('GET /products/:id', () => anon.get(`/products/${productId}`));
  if (productId) await step('PUT /products/:id (vendor)', () => asVendor.put(`/products/${productId}`, { price: 59.99 }));

  // ===== Reviews =====
  const rCreate = await step('POST /reviews', () =>
    anon.post('/reviews', {
      productId,
      customerId: customerMe?._id, // some controllers may ignore this and use auth; your routes are open
      rating: 5,
      comment: 'Great product (smoke)!',
    })
  );
  const reviewId = rCreate?.data?._id;

  await step('GET /reviews', () => anon.get('/reviews'));
  if (reviewId) await step('GET /reviews/:id', () => anon.get(`/reviews/${reviewId}`));
  if (reviewId) await step('PUT /reviews/:id', () => anon.put(`/reviews/${reviewId}`, { rating: 4 }));

  // ===== Carts (customer-only) =====
  const cCreate = await step('POST /carts (customer)', () =>
    asCustomer.post('/carts', {
      customerId: customerMe?._id,
      items: productId ? [{ productId, quantity: 2 }] : [],
    })
  );
  const cartId = cCreate?.data?._id;

  await step('GET /carts (customer)', () => asCustomer.get('/carts'));
  if (cartId) await step('GET /carts/:id (customer)', () => asCustomer.get(`/carts/${cartId}`));
  if (cartId && productId) {
    await step('PUT /carts/:id (customer)', () =>
      asCustomer.put(`/carts/${cartId}`, { items: [{ productId, quantity: 1 }] })
    );
  }

  // ===== Orders (customer create) =====
  const oCreate = await step('POST /orders (customer)', () =>
    asCustomer.post('/orders', {
      customerId: customerMe?._id,
      status: 'active',
      totalPrice: 59.99,
      products: productId ? [{ productId, quantity: 1 }] : [],
    })
  );
  const orderId = oCreate?.data?._id;

  await step('GET /orders (customer)', () => asCustomer.get('/orders'));
  if (orderId) await step('GET /orders/:id (customer)', () => asCustomer.get(`/orders/${orderId}`));

  // ===== ChatLogs (open) =====
  const clCreate = await step('POST /chatlogs', () =>
    anon.post('/chatlogs', { userId: customerMe?._id, prompt: 'hi', response: 'hello', intent: 'test' })
  );
  const chatId = clCreate?.data?._id;

  await step('GET /chatlogs', () => anon.get('/chatlogs'));
  if (chatId) await step('GET /chatlogs/:id', () => anon.get(`/chatlogs/${chatId}`));
  if (chatId) await step('PUT /chatlogs/:id', () => anon.put(`/chatlogs/${chatId}`, { response: 'updated' }));

  // ===== Admin-only endpoints (no admin auth flow) =====
  logSkip('ALL /distributionhubs & /admins', 'admin-only; no admin auth flow exposed');

  // ===== Cleanup (best-effort) =====
  if (reviewId) await step('DELETE /reviews/:id', () => anon.delete(`/reviews/${reviewId}`), false);
  if (cartId) await step('DELETE /carts/:id', () => asCustomer.delete(`/carts/${cartId}`), false);
  if (orderId) await step('DELETE /orders/:id (customer cancel)', () => asCustomer.delete(`/orders/${orderId}`), false);
  if (productId) await step('DELETE /products/:id', () => asVendor.delete(`/products/${productId}`), false);
  if (genreId) await step('DELETE /genres/:id', () => anon.delete(`/genres/${genreId}`), false);

  // ===== Summary =====
  console.log('\n===== SMOKE SUMMARY =====');
  console.log(`Pass: ${RESULTS.pass}  Fail: ${RESULTS.fail}  Skips: ${RESULTS.skips}`);
  if (RESULTS.fail > 0) {
    console.log('\nFailures:');
    for (const f of RESULTS.details) {
      console.log(`- ${f.label} (${f.status ?? 'ERR'}): ${f.message}`);
      if (Array.isArray(f.errors)) {
        for (const e of f.errors) console.log(`   • ${e.msg} @ ${e.param}`);
      }
    }
  }
  process.exit(RESULTS.fail > 0 ? 1 : 0);
})().catch((e) => {
  // This should rarely run because we catch inside step()
  console.error('\n💥 Smoke test crashed:', e);
  process.exit(1);
});
