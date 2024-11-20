import { IPokemonAPI } from '../../types/pokeapi';
import pokeApiClient from './client';

export const getPokemonByName = async (name: string): Promise<IPokemonAPI> => {
    const response = await pokeApiClient.get<IPokemonAPI>(`pokemon/${name}`);
    return response.data;
};
