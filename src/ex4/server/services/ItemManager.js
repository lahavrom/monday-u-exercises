// const { PokemonAlreadyInError, FailedFetchPokemonError } = require('');
const fs = require('fs').promises;
const PokemonClient = require('../clients/PokemonClient');
const tasksFile = 'tasks.json';

module.exports = class ItemManager {
    constructor() {
        this.taskId = 1;
        this.pokemonClient = new PokemonClient();
        this.FailedFetchPokemonError = new Error();
        this.FailedFetchPokemonError.statusCode = 400;
        this.PokemonAlreadyInError = new Error();
        this.PokemonAlreadyInError.statusCode = 400;
    }

    async getTasks(){
        try {
            const data = await fs.readFile(tasksFile);
            return JSON.parse(data.toString());
        } catch(err) {
            console.log(`Got an error trying to read the file: ${error.message}`);
        }
    }

    async getPokemon(pokemonIds) {
        try {
            const pokemons = await this.pokemonClient.getPokemon(pokemonIds);
            return pokemons;
        } catch (error) {
            throw FailedFetchPokemonError;
        }
    }

    async addRegTask(task) {
        let data = await this.getTasks();
        if (!data) {
            data = [];
        }
        data.push(task);
        try {
            await fs.writeFile(tasksFile, JSON.stringify(data));
        } catch (error) {
            console.error(`Failed to write to file ${error.message}`);
        }
    }

    async addPokemon(pokemon, date) {
        let data = await this.getTasks();
        if (!data){
            data = [];
        }
        const task = `Catch ${pokemon.name}, the ${pokemon.types[0].type.name} type pokemon`;
        if (data.find(value => value.task === task)) {
            this.PokemonAlreadyInError.message = `The task: ${task} was already entered`;
            throw this.PokemonAlreadyInError;
        }
        data.push({"task": task, "date": date});
        try {
            await fs.writeFile(tasksFile, JSON.stringify(data));
        } catch (error) {
            console.error(`Failed to write to file ${error.message}`);
        }
    }

   async addTask(taskObj){
        let taskSplit = taskObj.task.split(',');
        if (isNaN(taskSplit[0])) {
            await this.addRegTask(taskObj);
            return taskObj;
        }
        const pokemons = await this.getPokemon(taskSplit);
        for (let pokemon of pokemons){
            await this.addPokemon(pokemon, taskObj.date);
        }
    }

    // remove from array
    async deleteTask(taskObj) {
        let data = await this.getTasks();
        if (!data){
            return;
        }
        data = data.filter((value) => {
            return value.task !== taskObj.task || value.date !== taskObj.date;
        });
        try {
            await fs.writeFile(tasksFile, JSON.stringify(data));
        } catch (error) {
            console.error(`Failed to write to file ${error.message}`);
        }
    };

}

