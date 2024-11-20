import type { Knex } from 'knex';
import { ETableNames } from '../ETableNames';

export async function up(knex: Knex) {
    return knex.schema
        .createTable(ETableNames.habilidade, (table) => {
            table.bigIncrements('id').primary().index();
            table.string('nome').notNullable();

            table.comment(
                'Tabela usada para armazenar habilidades dos pokemons'
            );
        })
        .then(() => {
            console.log(`# Created table ${ETableNames.habilidade}`);
        });
}

export async function down(knex: Knex) {
    return knex.schema.dropTable(ETableNames.habilidade).then(() => {
        console.log(`# Dropped table ${ETableNames.habilidade}`);
    });
}
