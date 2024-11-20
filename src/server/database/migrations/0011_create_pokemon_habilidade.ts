import type { Knex } from 'knex';
import { ETableNames } from '../ETableNames';

export async function up(knex: Knex) {
    return knex.schema
        .createTable(ETableNames.pokemon_habilidade, (table) => {
            table.bigInteger('habilidade_id').notNullable();
            table.bigInteger('pokemon_id').notNullable();
            table.boolean('is_hidden').notNullable().defaultTo(false);

            table.primary(['habilidade_id', 'pokemon_id']);

            table
                .foreign('habilidade_id')
                .references('id')
                .inTable(ETableNames.habilidade)
                .onUpdate('CASCADE')
                .onDelete('RESTRICT');

            table
                .foreign('pokemon_id')
                .references('id')
                .inTable(ETableNames.pokemon)
                .onUpdate('CASCADE')
                .onDelete('RESTRICT');

            table.comment(
                'Tabela usada para armazenar a relação entre pokemon e habilidade'
            );
        })
        .then(() => {
            console.log(`# Created table ${ETableNames.pokemon_habilidade}`);
        });
}

export async function down(knex: Knex) {
    return knex.schema.dropTable(ETableNames.pokemon_habilidade).then(() => {
        console.log(`# Dropped table ${ETableNames.pokemon_habilidade}`);
    });
}
