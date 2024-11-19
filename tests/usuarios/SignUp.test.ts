import { StatusCodes } from 'http-status-codes';
import { testServer } from '../jest.setup';

describe('Usuarios - Sign Up', () => {
    it('Cadastra usuário 1', async () => {
        const res1 = await testServer.post('/cadastrar').send({
            username: 'joaocadastra',
            email: 'joaocadastra@teste.com',
            senha: '123456',
        });
        expect(res1.statusCode).toEqual(StatusCodes.CREATED);
        expect(typeof res1.body).toEqual('number');
    });

    it('Cadastra usuário 2', async () => {
        const res1 = await testServer.post('/cadastrar').send({
            username: 'joaocadastra2',
            email: 'joaocadastra2@teste.com',
            senha: '123456',
        });
        expect(res1.statusCode).toEqual(StatusCodes.CREATED);
        expect(typeof res1.body).toEqual('number');
    });

    it('Tenta cadastrar usuário com e-mail já existente', async () => {
        const res1 = await testServer.post('/cadastrar').send({
            username: 'joaoduplicado',
            email: 'joaoduplicado@teste.com',
            senha: '123456',
        });
        expect(res1.statusCode).toEqual(StatusCodes.CREATED);
        expect(typeof res1.body).toEqual('number');

        const res2 = await testServer.post('/cadastrar').send({
            username: 'joaoduplicado2',
            email: 'joaoduplicado@teste.com',
            senha: '1234567',
        });
        expect(res2.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
        expect(res2.body).toHaveProperty('errors.default');
    });

    it('Tenta cadastrar usuário com e-mail inválido', async () => {
        const res1 = await testServer.post('/cadastrar').send({
            username: 'joaoinvalido',
            email: 'joao invalido@teste.com',
            senha: '123456',
        });
        expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
        expect(res1.body).toHaveProperty('errors.body.email');
    });

    it('Tenta cadastrar usuário com senha inválida', async () => {
        const res1 = await testServer.post('/cadastrar').send({
            username: 'joaoinvalido',
            email: 'joao invalido@teste.com',
            senha: '12345',
        });
        expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
        expect(res1.body).toHaveProperty('errors.body.senha');
    });

    it('Tenta criar um registro com username muito curto', async () => {
        const res1 = await testServer
            .post('/cadastrar')
            .send({ username: 'ca' });

        expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
        expect(res1.body).toHaveProperty('errors.body.username');
    });
});
