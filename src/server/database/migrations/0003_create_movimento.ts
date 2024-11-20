import type { Knex } from 'knex';
import { ETableNames } from '../ETableNames';

export async function up(knex: Knex) {
    return knex.schema
        .createTable(ETableNames.movimento, (table) => {
            table.bigIncrements('id').primary().index();
            table.string('nome').notNullable();

            table.comment(
                'Tabela usada para armazenar movimentos dos pokemons'
            );
        })
        .then(() => {
            console.log(`# Created table ${ETableNames.movimento}`);
        });
}

export async function down(knex: Knex) {
    return knex.schema.dropTable(ETableNames.movimento).then(() => {
        console.log(`# Dropped table ${ETableNames.movimento}`);
    });
}
