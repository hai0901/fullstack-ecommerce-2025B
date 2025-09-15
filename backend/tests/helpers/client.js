require('dotenv').config();
const request = require('supertest');
const { suiteSuffix } = require('./ids');

const BASE_URL = process.env.BASE_URL || 'http://localhost:5000/api';
function agent() { return request.agent(BASE_URL); }

async function registerLogin(a, payload, label = 'user') {
  const reg = await a.post('/auth/register').send(payload);
  if (!(reg.status >= 200 && reg.status < 300)) {
    // surface validator errors clearly
    // eslint-disable-next-line no-console
    console.error(`[registerLogin:${label}] status=${reg.status}`, reg.body?.errors || reg.body);
    return null;
  }

  // best-effort dev verify (non-fatal)
  await a.get('/auth/dev-verify').query({ email: payload.email });

  const login = await a.post('/auth/login').send({ email: payload.email, password: payload.password });
  if (!(login.status >= 200 && login.status < 300)) {
    // eslint-disable-next-line no-console
    console.error(`[login:${label}] status=${login.status}`, login.body);
    return null;
  }

  const me = await a.get('/auth/me');
  if (me.status !== 200) {
    // eslint-disable-next-line no-console
    console.error(`[me:${label}] status=${me.status}`, me.body);
    return null;
  }
  return me.body;
}

module.exports = { BASE_URL, agent, registerLogin, suiteSuffix };
