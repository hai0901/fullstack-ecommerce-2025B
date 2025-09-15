const { agent, registerLogin, suiteSuffix } = require('./helpers/client');

describe('Products', () => {
  let av, genreId, productId;
  const suf = suiteSuffix('prod'); // unique across run

  beforeAll(async () => {
    av = agent();
    const vendor = await registerLogin(av, {
      email: `vend.${suf}@test.com`,
      password: 'Abc12345!',
      role: 'vendor',
      businessName: `Vendor-${suf}`,
      businessAddress: `Addr-${suf}`,
    }, 'vendor');
    expect(vendor).not.toBeNull();

    const g = await av.post('/genres').send({ name: `Electronics-${suf}`, description: '' });
    expect([200,201]).toContain(g.status);
    genreId = g.body._id;
  });

  it('vendor can create/list/get/update/delete', async () => {
    const name = `SmokeBrd-${suf}`.slice(0, 15); // ensure 10..20 chars
    const create = await av.post('/products').send({ name, price: 49.99, description: 'ok', genreId, availableStock: 5 });
    expect([200,201]).toContain(create.status);

    // robust id extraction
    productId = create.body?._id
      || create.body?.data?._id
      || create.body?.product?._id
      || create.body?.created?._id
      || create.body?.id;
    expect(productId).toBeTruthy();

    expect((await agent().get('/products')).status).toBe(200);
    expect((await agent().get(`/products/${productId}`)).status).toBe(200);
    expect((await av.put(`/products/${productId}`).send({ price: 59.99 })).status).toBe(200);
    expect((await av.delete(`/products/${productId}`)).status).toBe(200);
  });
});
