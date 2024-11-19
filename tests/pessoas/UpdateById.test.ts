import { StatusCodes } from 'http-status-codes';
import { testServer } from '../jest.setup';

describe('Pessoas - UpdateById', () => {
    let accessToken = '';
    beforeAll(async () => {
        const email = 'updatebyid-pessoas@gmail.com';
        const senha = '123456';
        await testServer
            .post('/cadastrar')
            .send({ username: 'Teste', email, senha });
        const signInRes = await testServer
            .post('/entrar')
            .send({ email, senha });
        accessToken = signInRes.body.accessToken;
    });

    let cidadeId: number | undefined = undefined;
    beforeAll(async () => {
        const resCidade = await testServer
            .post('/cidades')
            .set({ Authorization: `Bearer ${accessToken}` })
            .send({ nome: 'Cidade Teste' });
        cidadeId = resCidade.body;
    });

    it('Atualiza registro', async () => {
        const res1 = await testServer
            .post('/pessoas')
            .set({ Authorization: `Bearer ${accessToken}` })
            .send({
                nomeCompleto: 'João Carlos',
                email: 'joao.carlos.updateById@gmail.com',
                cidadeId,
            });
        expect(res1.statusCode).toEqual(StatusCodes.CREATED);

        const resAtualizada = await testServer
            .put(`/pessoas/${res1.body}`)
            .set({ Authorization: `Bearer ${accessToken}` })
            .send({
                nomeCompleto: 'João Carlos Updated',
                email: 'joao.carlos.updateById@gmail.com',
                cidadeId,
            });
        expect(resAtualizada.statusCode).toEqual(StatusCodes.NO_CONTENT);
    });

    it('Tenta atualizar registro que não existe', async () => {
        const res1 = await testServer
            .put('/pessoas/99999')
            .set({ Authorization: `Bearer ${accessToken}` })
            .send({
                nomeCompleto: 'Caxias',
                cidadeId,
                email: 'joao.carlos@gmail.com',
            });
        expect(res1.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
        expect(res1.body).toHaveProperty('errors.default');
    });

    it('Tenta atualizar registro não estando autenticado', async () => {
        const res1 = await testServer
            .post('/pessoas')
            .set({ Authorization: `Bearer ${accessToken}` })
            .send({
                nomeCompleto: 'João Carlos',
                email: 'joao.carlos.updateByIdNotAuthenticated@gmail.com',
                cidadeId,
            });
        expect(res1.statusCode).toEqual(StatusCodes.CREATED);

        const resAtualizada = await testServer
            .put(`/pessoas/${res1.body}`)
            .send({
                nomeCompleto: 'João Carlos Updated',
                email: 'joao.carlos.updateByIdNotAuthenticated@gmail.com',
                cidadeId,
            });
        expect(resAtualizada.statusCode).toEqual(StatusCodes.UNAUTHORIZED);
        expect(resAtualizada.body).toHaveProperty('errors.default');
    });
});
