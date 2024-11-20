import { ETableNames } from '../../ETableNames';
import { Knex } from '../../knex';
import { Pokemon } from '../../models/Pokemon';

export const create = async (pokemon: Pokemon): Promise<number | Error> => {
    try {
        const [result] = await Knex(ETableNames.pokemon)
            .insert(pokemon)
            .returning('id');
        if (typeof result === 'object') {
            return result.id;
        } else if (typeof result === 'number') {
            return result;
        }
        return new Error('Erro ao cadastrar o registro');
    } catch (error) {
        console.log(error);
        return Error('Erro ao cadastrar o registro');
    }
};