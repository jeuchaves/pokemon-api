import { StatusCodes } from 'http-status-codes';
import { testServer } from '../jest.setup';

describe('Usuarios - Sign In', () => {
    beforeAll(async () => {
        await testServer.post('/cadastrar').send({
            username: 'joaocarlos',
            email: 'joao.carlos.signin@gmail.com',
            senha: '123456',
        });
    });
    it('Faz login', async () => {
        const res1 = await testServer.post('/entrar').send({
            email: 'joao.carlos.signin@gmail.com',
            senha: '123456',
        });
        expect(res1.statusCode).toEqual(StatusCodes.OK);
        expect(res1.body).toHaveProperty('accessToken');
    });

    it('Faz login com e-mail que não existe', async () => {
        const res1 = await testServer.post('/entrar').send({
            email: 'joao.carlos.inexistente@gmail.com',
            senha: '123456',
        });
        expect(res1.statusCode).toEqual(StatusCodes.UNAUTHORIZED);
        expect(res1.body).toHaveProperty('errors.default');
    });

    it('Faz login com e-mail inválido', async () => {
        const res1 = await testServer.post('/entrar').send({
            email: 'joao.carlos gmail.com',
            senha: '123456',
        });
        expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
        expect(res1.body).toHaveProperty('errors.body.email');
    });

    it('Faz login com senha errada', async () => {
        const resBuscado = await testServer.post('/entrar').send({
            email: 'joao.carlos.signin@gmail.com',
            senha: '12345678',
        });
        expect(resBuscado.statusCode).toEqual(StatusCodes.UNAUTHORIZED);
        expect(resBuscado.body).toHaveProperty('errors.default');
    });
});
