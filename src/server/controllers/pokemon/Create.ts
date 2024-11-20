import { validation } from '../../shared/middleware';
import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { string, object } from 'yup';
import { getPokemonByName } from '../../shared/services/pokeapi/endpoints';

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
    const data = await getPokemonByName(req.params.name);
    return res.status(StatusCodes.OK).json(data);
};
