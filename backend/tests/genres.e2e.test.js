const { agent } = require('./helpers/client');

describe('Genres', () => {
  it('CRUD', async () => {
    const a = agent();
    const create = await a.post('/genres').send({ name: 'Electronics', description: 'desc' });
    expect([200,201]).toContain(create.status);
    const id = create.body._id;

    expect((await a.get('/genres')).status).toBe(200);
    expect((await a.get(`/genres/${id}`)).status).toBe(200);
    expect((await a.put(`/genres/${id}`).send({ description: 'updated' })).status).toBe(200);
    expect((await a.delete(`/genres/${id}`)).status).toBe(200);
  });
});
