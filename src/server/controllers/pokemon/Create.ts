import { validation } from '../../shared/middleware';
import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { string, object } from 'yup';
import { getPokemonByName } from '../../shared/services/pokeapi/endpoints';
import {
    HabilidadesProvider,
    MovimentosProvider,
    PokemonProvider,
    StatusProvider,
    TiposProvider,
} from '../../database/providers';

interface IParamProps {
    name?: string;
}

export const createValidation = validation((getSchema) => ({
    params: getSchema<IParamProps>(
        object({
            name: string().required(),
        })
    ),
}));

export const create = async (req: Request<IParamProps>, res: Response) => {
    if (!req.params.name) {
        return res.status(StatusCodes.BAD_REQUEST).json({
            errors: {
                default: 'O parâmetro "name" precisa ser informado.',
            },
        });
    }

    // Busca os dados da API
    const data = await getPokemonByName(req.params.name);

    // Salva os movimentos no banco de dados
    const movimentos = await Promise.all(
        data.moves.map(async (move) => {
            return await MovimentosProvider.create({ nome: move.move.name });
        })
    );

    // Salva as habilidades no banco de dados
    const habilidades = await Promise.all(
        data.abilities.map(async (ability) => {
            return await HabilidadesProvider.create({
                nome: ability.ability.name,
            });
        })
    );

    // Salva os tipos no banco de dados
    const tiposId = await Promise.all(
        data.types.map(async (type) => {
            return await TiposProvider.create({ nome: type.type.name });
        })
    );

    // Salve os status no banco de dados
    const statusesId = await Promise.all(
        data.stats.map(async (status) => {
            return await StatusProvider.create({ nome: status.stat.name });
        })
    );

    // Salvar o pokemon no banco de dados
    const pokemonId = await PokemonProvider.create({
        nome: data.name,
        experiencia_base: data.base_experience,
        altura: data.height,
        area_de_encontro: data.location_area_encounters,
        id: data.id,
        is_default: data.is_default,
        peso: data.weight,
    });

    return res.status(StatusCodes.OK).json('Funcionou');
};
