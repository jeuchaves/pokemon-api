import { ETableNames } from '../../ETableNames';
import { Knex } from '../../knex';

export const RelateToPokemon = async (
    pokemonId: number,
    statusId: number,
    valor: number
): Promise<void | Error> => {
    try {
        await Knex(ETableNames.pokemon_status).insert({
            pokemon_id: pokemonId,
            status_id: statusId,
            valor: valor,
        });
    } catch (error) {
        console.log(error);
        return Error('Erro ao cadastrar o registro');
    }
};
