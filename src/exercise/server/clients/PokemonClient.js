const axios = require('axios').default;
const { FailedFetchPokemonError } = require('../Errors');

module.exports = class PokemonClient {
    constructor() {
        this.API_BASE = "https://pokeapi.co/api/v2/pokemon/";
    }

    async getPokemon(pokemonIds) {
        FailedFetchPokemonError.message = `Failed to fetch pokemons with this input: ${pokemonIds}`;
        FailedFetchPokemonError.statusCode = 400;
        try {
            const response = await Promise.all(pokemonIds.map(pokemonId => {
                if (isNaN(pokemonId) || !pokemonId) {
                    throw FailedFetchPokemonError;
                }
                return axios.get(this.API_BASE + pokemonId.trim());
            }));
            response.forEach(pokemon => {
                if (pokemon.status !== 200){
                    throw FailedFetchPokemonError;
                }
            });
            return response.map(pokemon => pokemon.data);
        } catch (error) {
            throw FailedFetchPokemonError;
        }
    }
}
