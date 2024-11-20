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
    } catch (error) {
        console.log(error);
        return Error('Erro ao buscar o pokemon na API');
    }
};
