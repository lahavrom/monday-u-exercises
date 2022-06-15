import fetch from "node-fetch";
import { FailedFetchPokemonError } from './Errors.js';


export class PokemonClient {
    constructor() {
        this.API_BASE = "https://pokeapi.co/api/v2/pokemon/";
    }

    async getPokemon(pokemonIds) {
        if (pokemonIds.length === 1){
            try {
                const pokemon = await fetch(this.API_BASE + pokemonIds[0]);
                if (pokemon.status !== 200) {
                    throw new FailedFetchPokemonError(pokemonIds);
                }
                const pokemon_name = await pokemon.json();
                return [pokemon_name];
            } catch (error) {
                throw new FailedFetchPokemonError(pokemonIds);
            }
        }
        try {
            const response = await Promise.all(pokemonIds.map(pokemonId => {
                if (isNaN(pokemonId) || !pokemonId) {
                    throw new FailedFetchPokemonError(pokemonIds);
                }
                return fetch(this.API_BASE + pokemonId.trim());
            }));
            response.forEach(pokemon => {
                if (pokemon.status !== 200){
                    throw new FailedFetchPokemonError(pokemonIds);
                }
            });
            return response.map(pokemon => pokemon.json());
        } catch (error) {
            throw new FailedFetchPokemonError(error.message);
        }
    }
}
