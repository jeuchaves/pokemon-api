import { ETableNames } from '../../ETableNames';
import { Knex } from '../../knex';
import { Tipo } from '../../models/Tipo';

interface IBuscaResult {
    id: number;
}

export const create = async (
    tipo: Omit<Tipo, 'id'>
): Promise<number | Error> => {
    try {
        // Se houver um movimento com o mesmo nome já cadastrado retorna o id
        const busca: IBuscaResult[] = await Knex(ETableNames.tipo)
            .where('nome', '=', tipo.nome)
            .select('id');
        if (busca.length > 0) {
            return busca[0].id;
        }

        const [result] = await Knex(ETableNames.tipo)
            .insert(tipo)
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
