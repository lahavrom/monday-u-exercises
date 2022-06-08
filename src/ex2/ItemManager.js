
class ItemManager {
    constructor() {
        this.tasks = [];
        this.pokemonClient = new PokemonClient();
    }

    addRegTask(task, taskId, date) {
        this.tasks.push({"task": task, "taskId": taskId, "date": date});
    };

    addPokemon(pokemon, taskId, date) {        
        const task = `Catch ${pokemon.name}, the ${pokemon.types[0].type.name} type pokemon`;
        if (this.tasks.find(value => value.task === task)) {
            throw new PokemonAlreadyInError(task);
        }
        this.tasks.push({"task": task, "taskId": taskId, "date": date});
    };

    async getPokemon(pokemonIds) {
        try {
            const pokemons = await this.pokemonClient.getPokemon(pokemonIds);
            return pokemons;
        } catch (error) {
            throw new FailedFetchPokemonError(pokemonIds);
        }
    }

    // remove from array
    removeTask(taskId) {
        this.tasks = this.tasks.filter((elem) => {
            return (elem.task + elem.taskId) !== taskId;
        });
    };

}
