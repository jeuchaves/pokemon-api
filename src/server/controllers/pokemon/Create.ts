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

const getErrors = (arr: (any | Error)[]): Error[] => {
    return arr.filter((item) => item instanceof Error) as Error[];
};

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
    const movimentosId = await Promise.all(
        data.moves.map(async (move) => {
            return await MovimentosProvider.create({ nome: move.move.name });
        })
    );

    // Salva as habilidades no banco de dados
    const habilidades = await Promise.all(
        data.abilities.map(async (ability) => {
            const habilidadeId = await HabilidadesProvider.create({
                nome: ability.ability.name,
            });
            return { id: habilidadeId, is_hidden: ability.is_hidden };
        })
    );

    // Salva os tipos no banco de dados
    const tiposId = await Promise.all(
        data.types.map(async (type) => {
            return await TiposProvider.create({ nome: type.type.name });
        })
    );

    // Salve os status no banco de dados
    const statuses = await Promise.all(
        data.stats.map(async (status) => {
            const statusId = await StatusProvider.create({
                nome: status.stat.name,
            });
            return { id: statusId, base: status.base_stat };
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

    if (
        getErrors(movimentosId).length > 0 ||
        getErrors(habilidades).length > 0 ||
        getErrors(tiposId).length > 0 ||
        getErrors(statuses).length > 0 ||
        getErrors([pokemonId]).length > 0
    ) {
        const errors: Record<string, string[]> = {};

        if (getErrors(movimentosId).length > 0) {
            errors.movimentos = getErrors(movimentosId).map(
                (err) => err.message
            );
        }

        if (getErrors(habilidades).length > 0) {
            errors.habilidades = getErrors(habilidades).map(
                (err) => err.message
            );
        }

        if (getErrors(tiposId).length > 0) {
            errors.tipos = getErrors(tiposId).map((err) => err.message);
        }

        if (getErrors(statuses).length > 0) {
            errors.status = getErrors(statuses).map((err) => err.message);
        }

        if (getErrors([pokemonId]).length > 0) {
            errors.pokemon = getErrors([pokemonId]).map((err) => err.message);
        }

        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            errors,
        });
    }

    // Relaciona os movimentos com o pokemon
    await Promise.all(
        movimentosId.map(async (movimentoId) => {
            return await MovimentosProvider.RelateToPokemon(
                pokemonId as number,
                movimentoId as number
            );
        })
    );

    // Relaciona os tipos com o pokemon
    await Promise.all(
        tiposId.map(async (tipoId) => {
            return await TiposProvider.RelateToPokemon(
                pokemonId as number,
                tipoId as number
            );
        })
    );

    // Relaciona os status com o pokemon
    await Promise.all(
        statuses.map(async (status) => {
            return await StatusProvider.RelateToPokemon(
                pokemonId as number,
                status.id as number,
                status.base
            );
        })
    );

    // Relaciona as habilidades com o pokemon
    await Promise.all(
        habilidades.map(async (habilidade) => {
            return await HabilidadesProvider.RelateToPokemon(
                pokemonId as number,
                habilidade.id as number,
                habilidade.is_hidden
            );
        })
    );

    return res.status(StatusCodes.OK).json({
        message: 'Pokemon salvo com sucesso.',
        pokemonId: pokemonId,
    });
};
