import { IPokemonAPI } from '../../types/pokeapi';
import pokeApiClient from './client';

export const getPokemonByName = async (
    name: string
): Promise<IPokemonAPI | Error> => {
    try {
        const response = await pokeApiClient.get<IPokemonAPI>(
            `pokemon/${name}`
        );
        return response.data;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
        console.log(error);
        if (error.response && error.response.status === 404) {
            return Error('Pokemon não encontrado');
        }
        return Error('Erro ao buscar o pokemon na API');
    }
};
