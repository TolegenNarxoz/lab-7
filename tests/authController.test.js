const request = require('supertest');
const app = require('../server');


describe('Authentication API', () => {
    beforeAll(async () => {
        await new Promise(resolve => {
            app.listen(8080, resolve);
        });
    });

    afterAll(async () => {
        await new Promise(resolve => {
            app.close(resolve);
        });
    });

    describe('POST /api/auth/register', () => {
        it('should register a new user and return a token', async () => {
            const res = await request(app)
                .post('/api/auth/register')
                .send({ username: 'tolegen', email: 'tolegen.amangeldi@narxoz.kz', password: 'qweqwe' });

            expect(res.statusCode).toEqual(200);
            expect(res.body).toHaveProperty('token');
        });
    });
});
