const { agent, registerLogin } = require('./helpers/client');

describe('Auth', () => {
  const RUN = Date.now();
  it('registers / verifies / logs in customer', async () => {
    const a = agent();
    const user = await registerLogin(a, {
      email: `cust.${RUN}@test.com`,
      password: 'Abc12345!',
      role: 'customer',
      name: 'Smoke Customer',
      address: '123 Smoke St',
    });
    expect(user).toHaveProperty('_id');
  });

  it('registers / verifies / logs in vendor', async () => {
    const a = agent();
    const user = await registerLogin(a, {
      email: `vend.${RUN}@test.com`,
      password: 'Abc12345!',
      role: 'vendor',
      businessName: `Vendor-${RUN}`,
      businessAddress: `Addr-${RUN}`,
    });
    expect(user).toHaveProperty('_id');
  });
});
