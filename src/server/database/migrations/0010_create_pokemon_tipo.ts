import type { Knex } from 'knex';
import { ETableNames } from '../ETableNames';

export async function up(knex: Knex) {
    return knex.schema
        .createTable(ETableNames.pokemon_tipo, (table) => {
            table.bigInteger('tipo_id').notNullable();
            table.bigInteger('pokemon_id').notNullable();

            table.primary(['tipo_id', 'pokemon_id']);

            table.comment(
                'Tabela usada para armazenar a relação entre pokemon e tipo'
            );
        })
        .then(() => {
            console.log(`# Created table ${ETableNames.pokemon_tipo}`);
        });
}

export async function down(knex: Knex) {
    return knex.schema.dropTable(ETableNames.pokemon_tipo).then(() => {
        console.log(`# Dropped table ${ETableNames.pokemon_tipo}`);
    });
}
