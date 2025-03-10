import request from 'supertest';
import server from '../../server';

describe('POST /api/products', () => {

    it('Debe mostrar los errores de validacion de datos de entrada', async () => {
        const response = await request(server).post('/api/products').send({});

        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty('errors');
    });

    it('Debe crear un producto nuevo', async () => {
        const response = await request(server).post('/api/products').send({
            name: "Tablet - test",
            price: 500
        });

        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty('data');

        expect(response.status).not.toBe(200);
        expect(response.status).not.toBe(400);
        expect(response.body).not.toHaveProperty('errors');
    });
});