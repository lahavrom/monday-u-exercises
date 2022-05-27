
class ItemManager {
    constructor() {
        this.tasks = [];
        this.pokemonClient = new PokemonClient();
    }

    async handleTask(task) {
        let taskSplit = task.split(",");
        if (isNaN(taskSplit[0])) {
            return [[task], false];
        }
        if (taskSplit.length === 1){
            // fetch 1 pokemon
            const [pokemon, success] = await this.pokemonClient.getPokemon(taskSplit[0]);
            if (!success){
                return [[pokemon], true];
            }
            const taskName = `Catch ${pokemon.name}, the ${pokemon.types[0].type.name} type pokemon`;
            return [[taskName], true];
        }
        // handle list of pokemons
        const result = await this.pokemonClient.getListPokemon(taskSplit);
        if (!result[1]) {
            return [[result[0]], true]
        }
        let pokemons = [];
        for (let p of result[0]) {
            const pokemon = await p;
            const taskName = `Catch ${await pokemon.name}, the ${pokemon.types[0].type.name} type pokemon`;
            pokemons.push(taskName);
        }
        return [pokemons, true];
    };

    // add to array
    addTask(task, taskId, pokemon) {
        if (this.tasks.filter(e => (pokemon && e.task === task)).length > 0){
            return false;
        }
        this.tasks.push({"task": task, "taskId": taskId});
        return true;
    };

    // remove from array
    removeTask(taskId) {
        this.tasks = this.tasks.filter((elem) => {
            return (elem.task + elem.taskId) !== taskId;
        });
    };

}
