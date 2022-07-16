const storage = require("./storage_service");
const PokemonClient = require("../clients/PokemonClient");
const {
  FailedFetchPokemonError,
  PokemonAlreadyInError,
  SystemFail,
} = require("../Errors");

module.exports = class ItemManager {
  constructor() {
    this.pokemonClient = new PokemonClient();
  }

  async getTasks() {
    try {
      const data = await storage.getItems();
      if (data.length === 0) {
        return [];
      }
      return data;
    } catch (err) {
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
    try {
      const newTask = await storage.createItem({ ItemName: task, date: date });
      return newTask;
    } catch (error) {
      throw SystemFail;
    }
  }

  async addPokemon(pokemon, date) {
    const data = await this.getTasks();
    const task = `Catch ${pokemon.name}, the ${pokemon.types[0].type.name} type pokemon`;
    if (data.find((value) => value.ItemName === task)) {
      PokemonAlreadyInError.message = `The task: ${task} was already entered`;
      throw PokemonAlreadyInError;
    }
    try {
      const newTask = await storage.createItem({ ItemName: task, date: date });
      return newTask;
    } catch (error) {
      throw SystemFail;
    }
  }

  async addTask(task, date) {
    let taskSplit = task.split(",");
    if (isNaN(taskSplit[0])) {
      const newTask = await this.addRegTask(task, date);
      return newTask;
    } else {
      const pokemons = await this.getPokemon(taskSplit);
      let newTasks = [];
      for (let pokemon of pokemons) {
        const newTask = await this.addPokemon(pokemon, date);
        newTasks.push(newTask);
      }
      return newTasks;
    }
  }

  async deleteTask(taskId) {
    try {
      await storage.deleteItem(taskId);
    } catch (error) {
      throw SystemFail;
    }
  }

  async deleteAll() {
    try {
      await storage.deleteAll();
    } catch (error) {
      throw SystemFail;
    }
  }

  async changeTaskStatus(taskId, status) {
    try {
      await storage.changeItemStatus(taskId, status);
    } catch (error) {
      throw SystemFail;
    }
  }
};
