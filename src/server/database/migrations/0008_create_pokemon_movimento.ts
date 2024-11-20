import type { Knex } from 'knex';
import { ETableNames } from '../ETableNames';

export async function up(knex: Knex) {
    return knex.schema
        .createTable(ETableNames.pokemon_movimento, (table) => {
            table.bigInteger('movimento_id').notNullable();
            table.bigInteger('pokemon_id').notNullable();

            table.primary(['movimento_id', 'pokemon_id']);

            table
                .foreign('movimento_id')
                .references('id')
                .inTable(ETableNames.movimento)
                .onUpdate('CASCADE')
                .onDelete('RESTRICT');

            table
                .foreign('pokemon_id')
                .references('id')
                .inTable(ETableNames.pokemon)
                .onUpdate('CASCADE')
                .onDelete('RESTRICT');

            table.comment(
                'Tabela usada para armazenar a relação entre pokemon e movimento'
            );
        })
        .then(() => {
            console.log(`# Created table ${ETableNames.pokemon_movimento}`);
        });
}

export async function down(knex: Knex) {
    return knex.schema.dropTable(ETableNames.pokemon_movimento).then(() => {
        console.log(`# Dropped table ${ETableNames.pokemon_movimento}`);
    });
}
