const fs = require('fs').promises;
const PokemonClient = require('../clients/PokemonClient');
const { FailedFetchPokemonError, PokemonAlreadyInError, SystemFail } = require('../Errors');
const tasksFile = 'tasks.json';

module.exports = class ItemManager {
    constructor() {
        this.taskId = 1;
        this.pokemonClient = new PokemonClient();
    }

    async getTasks(){
        try {
            const data = await fs.readFile(tasksFile);
            return JSON.parse(data.toString());
        } catch(err) {
            throw SystemFail;
        }
    }

    async getPokemon(pokemonIds) {
        try {
            const pokemons = await this.pokemonClient.getPokemon(pokemonIds);
            return pokemons;
        } catch (error) {
            FailedFetchPokemonError.message = `Failed to fetch pokemons with this input ${pokemonIds}`;
            throw FailedFetchPokemonError;
        }
    }

    async addRegTask(task, date) {
        let data = await this.getTasks();
        if (!data) {
            data = [];
        }
        data.push({"task":task, "date":date, "taskId": this.taskId});
        this.taskId++;
        try {
            await fs.writeFile(tasksFile, JSON.stringify(data));
        } catch (error) {
            throw SystemFail;
        }
    }

    async addPokemon(pokemon, date) {
        let data = await this.getTasks();
        if (!data){
            data = [];
        }
        const task = `Catch ${pokemon.name}, the ${pokemon.types[0].type.name} type pokemon`;
        if (data.find(value => value.task === task)) {
            PokemonAlreadyInError.message = `The task: ${task} was already entered`;
            throw PokemonAlreadyInError;
        }
        data.push({"task": task, "date": date, "taskId": this.taskId});
        this.taskId++;
        try {
            await fs.writeFile(tasksFile, JSON.stringify(data));
        } catch (error) {
            throw SystemFail;
        }
    }

   async addTask(task, date){
        let taskSplit = task.split(',');
        if (isNaN(taskSplit[0])) {
            await this.addRegTask(task, date);
            return {"task":task, "date":date, "taskId":this.taskId-1};
        }
        const pokemons = await this.getPokemon(taskSplit);
        for (let pokemon of pokemons){
            await this.addPokemon(pokemon, date);
        }
    }

    async deleteTask(taskId) {
        let data = await this.getTasks();
        if (!data){
            return;
        }
        data = data.filter((value) => {
            return value.taskId !== parseInt(taskId);
        });
        try {
            await fs.writeFile(tasksFile, JSON.stringify(data));
        } catch (error) {
            throw SystemFail;
        }
    };

}
