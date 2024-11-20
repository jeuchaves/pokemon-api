export interface IPokemonAPI {
    abilities: IAbilityAPI[];
    base_experience: number;
    height: number;
    id: number;
    is_default: boolean;
    location_area_encounters: string;
    moves: IMoveAPI[];
    name: string;
    stats: IStatAPI[];
    types: IType[];
    weight: number;
}

export interface IAbilityAPI {
    ability: {
        name: string;
        url: string;
    };
    is_hidden: boolean;
    slot: number;
}

export interface IMoveAPI {
    move: {
        name: string;
        url: string;
    };
}

export interface IStatAPI {
    base_stat: number;
    effort: number;
    stat: {
        name: string;
        url: string;
    };
}
