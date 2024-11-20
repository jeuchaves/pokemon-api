import type { Knex } from 'knex';
import { ETableNames } from '../ETableNames';

export async function up(knex: Knex) {
    return knex.schema
        .createTable(ETableNames.pokemon, (table) => {
            table.bigIncrements('id').primary().index();
            table.string('nome').notNullable();
            table.integer('experiencia_base').notNullable();
            table.integer('altura').notNullable();
            table.integer('peso').notNullable();
            table.boolean('is_default').defaultTo(true).notNullable();
            table.string('area_de_encontro').notNullable();

            table.comment('Tabela usada para armazenar os pokemons');
        })
        .then(() => {
            console.log(`# Created table ${ETableNames.pokemon}`);
        });
}

export async function down(knex: Knex) {
    return knex.schema.dropTable(ETableNames.pokemon).then(() => {
        console.log(`# Dropped table ${ETableNames.pokemon}`);
    });
}
