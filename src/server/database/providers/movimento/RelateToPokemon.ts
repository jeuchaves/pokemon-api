import { ETableNames } from '../../ETableNames';
import { Knex } from '../../knex';

export const RelateToPokemon = async (
    pokemonId: number,
    movimentoId: number
): Promise<void | Error> => {
    try {
        await Knex(ETableNames.pokemon_movimento).insert({
            pokemon_id: pokemonId,
            movimento_id: movimentoId,
        });
    } catch (error) {
        console.log(error);
        return Error('Erro ao cadastrar o registro');
    }
};
