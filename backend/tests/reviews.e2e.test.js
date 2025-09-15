const { agent, registerLogin, suiteSuffix } = require('./helpers/client');

describe('Reviews', () => {
  const suf = suiteSuffix('rev');
  let productId, customerId, av;

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

    const g = await agent().post('/genres').send({ name: `G-${suf}`, description: '' });
    expect([200,201]).toContain(g.status);

    const p = await av.post('/products').send({ name:`SmokeBrd-${suf}`.slice(0,15), price:10, genreId:g.body._id });
    expect([200,201]).toContain(p.status);
    productId = p.body?._id || p.body?.data?._id || p.body?.product?._id || p.body?.created?._id || p.body?.id;
    expect(productId).toBeTruthy();

    const ac = agent();
    const customer = await registerLogin(ac, {
      email: `cust.${suf}@test.com`,
      password: 'Abc12345!',
      role: 'customer',
      name:'Customer Name', address:'Addr',
    }, 'customer');
    expect(customer).not.toBeNull();
    customerId = customer._id;
  });

  it('CRUD review (open routes)', async () => {
    const a = agent();
    const create = await a.post('/reviews').send({ productId, customerId, rating:5, comment:'great' });
    expect([200,201]).toContain(create.status);
    const id = create.body?._id;
    expect(id).toBeTruthy();

    expect((await a.get('/reviews')).status).toBe(200);
    expect((await a.get(`/reviews/${id}`)).status).toBe(200);
    expect((await a.put(`/reviews/${id}`).send({ rating:4 })).status).toBe(200);
    expect((await a.delete(`/reviews/${id}`)).status).toBe(200);
  });
});
