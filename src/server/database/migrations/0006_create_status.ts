import type { Knex } from 'knex';
import { ETableNames } from '../ETableNames';

export async function up(knex: Knex) {
    return knex.schema
        .createTable(ETableNames.status, (table) => {
            table.bigIncrements('id').primary().index();
            table.string('nome').notNullable();

            table.comment('Tabela usada para armazenar os status dos pokemons');
        })
        .then(() => {
            console.log(`# Created table ${ETableNames.status}`);
        });
}

export async function down(knex: Knex) {
    return knex.schema.dropTable(ETableNames.status).then(() => {
        console.log(`# Dropped table ${ETableNames.status}`);
    });
}
