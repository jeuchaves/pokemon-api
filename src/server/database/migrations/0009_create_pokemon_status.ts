import type { Knex } from 'knex';
import { ETableNames } from '../ETableNames';

export async function up(knex: Knex) {
    return knex.schema
        .createTable(ETableNames.pokemon_status, (table) => {
            table.bigInteger('status_id').notNullable();
            table.bigInteger('pokemon_id').notNullable();
            table.integer('valor').notNullable();

            table.primary(['status_id', 'pokemon_id']);

            table.comment(
                'Tabela usada para armazenar a relação entre pokemon e status'
            );
        })
        .then(() => {
            console.log(`# Created table ${ETableNames.pokemon_status}`);
        });
}

export async function down(knex: Knex) {
    return knex.schema.dropTable(ETableNames.pokemon_status).then(() => {
        console.log(`# Dropped table ${ETableNames.pokemon_status}`);
    });
}
