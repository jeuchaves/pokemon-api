import type { Knex } from 'knex';
import { ETableNames } from '../ETableNames';

export async function up(knex: Knex) {
    return knex.schema
        .createTable(ETableNames.tipo, (table) => {
            table.bigIncrements('id').primary().index();
            table.string('nome').notNullable();

            table.comment('Tabela usada para armazenar tipos de pokemons');
        })
        .then(() => {
            console.log(`# Created table ${ETableNames.tipo}`);
        });
}

export async function down(knex: Knex) {
    return knex.schema.dropTable(ETableNames.tipo).then(() => {
        console.log(`# Dropped table ${ETableNames.tipo}`);
    });
}
