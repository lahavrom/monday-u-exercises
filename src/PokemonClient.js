
export class PokemonClient {
    constructor() {
        this.API_BASE = "https://pokeapi.co/api/v2/pokemon/";
    }

    async getPokemon(id) {
        try {
            const pokemon = await fetch(this.API_BASE + id);
            if (pokemon.status !== 200){
                throw "Failed to retrieve with this id";
            }
            const pokemon_name = await pokemon.json();
            console.log(pokemon_name);
            return [pokemon_name, true];
        } catch (err) {
            console.log(err);
            return ["Pokemon with ID " + id + " was not found", false];
        }
    };

    async getListPokemon(id_array) {
        try {
            const response = await Promise.all(id_array.map(elem => fetch(this.API_BASE + elem.replace(/\s/g, ''))));
            response.forEach(elem => {
                if (elem.status !== 200){
                    throw "Failed to retrieve with this ID";
                }
            });
            return [response.map(elem => elem.json()), true];
        } catch(err) {
            console.log(err);
            return ["Failed to fetch pokemons with this input: " + id_array, false];
        }
    }

}
