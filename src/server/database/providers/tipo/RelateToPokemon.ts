import { ETableNames } from '../../ETableNames';
import { Knex } from '../../knex';

export const RelateToPokemon = async (
    pokemonId: number,
    tipoId: number
): Promise<void | Error> => {
    try {
        await Knex(ETableNames.pokemon_tipo).insert({
            pokemon_id: pokemonId,
            tipo_id: tipoId,
        });
    } catch (error) {
        console.log(error);
        return Error('Erro ao cadastrar o registro');
    }
};
