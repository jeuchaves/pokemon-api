import { ETableNames } from '../../ETableNames';
import { Knex } from '../../knex';

export const RelateToPokemon = async (
    pokemonId: number,
    habilidadeId: number,
    isHidden: boolean
): Promise<void | Error> => {
    try {
        await Knex(ETableNames.pokemon_habilidade).insert({
            pokemon_id: pokemonId,
            habilidade_id: habilidadeId,
            is_hidden: isHidden,
        });
    } catch (error) {
        console.log(error);
        return Error('Erro ao cadastrar o registro');
    }
};
