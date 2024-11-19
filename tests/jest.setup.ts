import supertest from 'supertest';
import 'dotenv/config';

import { Knex } from '../src/server/database/knex';
import { server } from '../src/server/Server';

beforeAll(async () => {
    await Knex.migrate.latest();
    await Knex.seed.run();
});
afterAll(async () => {
    await Knex.destroy();
});

export const testServer = supertest(server);
