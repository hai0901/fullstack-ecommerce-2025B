const { agent, registerLogin, suiteSuffix } = require('./helpers/client');

describe('Carts, Orders, ChatLogs', () => {
  const suf = suiteSuffix('coc');
  let asVendor, asCustomer, productId, cartId, orderId;

  beforeAll(async () => {
    asVendor = agent();
    const vendor = await registerLogin(asVendor, {
      email: `vend.${suf}@test.com`, password:'Abc12345!', role:'vendor',
      businessName:`Vendor-${suf}`, businessAddress:`Addr-${suf}`,
    }, 'vendor');
    expect(vendor).not.toBeNull();

    const g = await agent().post('/genres').send({ name:`G-${suf}`, description:'' });
    expect([200,201]).toContain(g.status);

    const p = await asVendor.post('/products').send({ name:`SmokeBrd-${suf}`.slice(0,15), price:49.99, genreId:g.body._id });
    expect([200,201]).toContain(p.status);
    productId = p.body?._id || p.body?.data?._id || p.body?.product?._id || p.body?.created?._id || p.body?.id;
    expect(productId).toBeTruthy();

    asCustomer = agent();
    const customer = await registerLogin(asCustomer, {
      email: `cust.${suf}@test.com`, password:'Abc12345!', role:'customer',
      name:'Customer Name', address:'Addr'
    }, 'customer');
    expect(customer).not.toBeNull();
  });

  it('Cart & Order & ChatLog flows', async () => {
    const c = await asCustomer.post('/carts').send({ items:[{ productId, quantity:2 }] });
    expect([200,201]).toContain(c.status);
    cartId = c.body?._id; expect(cartId).toBeTruthy();

    expect((await asCustomer.get('/carts')).status).toBe(200);
    expect((await asCustomer.get(`/carts/${cartId}`)).status).toBe(200);
    expect((await asCustomer.put(`/carts/${cartId}`).send({ items:[{ productId, quantity:1 }] })).status).toBe(200);

    const o = await asCustomer.post('/orders').send({
      status:'active', totalPrice:59.99, products:[{ productId, quantity:1 }]
    });
    expect([200,201]).toContain(o.status);
    orderId = o.body?._id; expect(orderId).toBeTruthy();

    expect((await asCustomer.get('/orders')).status).toBe(200);
    expect((await asCustomer.get(`/orders/${orderId}`)).status).toBe(200);

    const cl = await agent().post('/chatlogs').send({ prompt:'hi', response:'hello', intent:'test' });
    expect([200,201]).toContain(cl.status);
    const chatId = cl.body?._id; expect(chatId).toBeTruthy();
    expect((await agent().get(`/chatlogs/${chatId}`)).status).toBe(200);
    expect((await agent().put(`/chatlogs/${chatId}`).send({ response:'updated' })).status).toBe(200);

    // cleanup
    expect((await asCustomer.delete(`/orders/${orderId}`)).status).toBe(200);
    expect((await asCustomer.delete(`/carts/${cartId}`)).status).toBe(200);
  });
});
