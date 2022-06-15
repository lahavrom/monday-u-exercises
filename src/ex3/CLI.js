#!/usr/bin/env node

import { ItemManager } from './ItemManager.js';
import { FailedFetchPokemonError, PokemonAlreadyInError} from './Errors.js';
import { Command } from "commander";
import inquirer from 'inquirer';
import chalk from 'chalk';
import figlet from 'figlet';
import gradient from 'gradient-string';
import chalkAnimation from 'chalk-animation';
import asciify from 'asciify-image';


const itemManager = new ItemManager();
const program = new Command();
const sleep = (ms = 1200) => new Promise((r) => setTimeout(r, ms));
const options = {
    fit: 'none',
    width: 30,
    height: 20
}


async function addTask(task) {
    if (task === '') {
        console.log("you forgot to type the task!");
        return;
    }
    const taskSplit = task.split(',');
    if (isNaN(taskSplit[0])) {
        itemManager.addRegTask(task);
        console.log(chalk.bgGreenBright("new task added successfully!"));
        return;
    }
    try {
        const pokemons = await itemManager.getPokemon(taskSplit);
        if (pokemons.length === 1) {
            const pokemon = await itemManager.addPokemon(pokemons[0]);
            console.log(chalk.bgGreenBright(`You added the task to catch ${pokemon}\n`));
            await asciify(`https://img.pokemondb.net/artwork/large/${pokemon}.jpg`, options, (err, ascii) => {
                if(err) {
                    return;
                }
                console.log(ascii);
            });
        } else{
            for (let p of pokemons) {
                const pokemon = await p;
                try {
                    await itemManager.addPokemon(pokemon);
                } catch(error){
                    if (error instanceof PokemonAlreadyInError){
                        console.log(chalk.bgRedBright("You already entered this task: " + error.message));
                    }
                }
            }
            console.log(chalk.bgGreenBright("new tasks added successfully!"));
        }
    } catch(error){
        if (error instanceof PokemonAlreadyInError) {
            console.log(chalk.bgRedBright("You already entered this task: " + error.message));
        }
        if (error instanceof FailedFetchPokemonError) {
            if (taskSplit.length === 1){
                console.log(chalk.bgRedBright(`Pokemon with ID ${task} was not found`));
            } else{
                console.log(chalk.bgRedBright("Failed to fetch pokemons with this input: " + error.message));
            }
        }
    }
};


program
  .name("cli-todo-app")
  .description("The best CLI todo app")
  .version("1.0.0");

// command for adding
program
  .command("add")
  .description("add a todo, if enterd number it will add a catch pokemon task")
  .argument("<string> or <int>", "todo task")
  .action( (task) => {
      addTask(task);
  });

// command for showing items
program
  .command("get")
  .description("get all tasks")
  .action(() => {
      itemManager.getItems();
  });

// command for deleting tasks
program
  .command("delete")
  .description("delete task with given input- task's row number")
  .argument("<int>", "the row number of the task to delete")
  .action((row) => {
      itemManager.removeTask(row);
  });

// command for deleting all tasks
program
  .command("delete-all")
  .description("delete all tasks")
  .action(() => { itemManager.clearAll() });


async function handleAdd() {
    const input = await inquirer.prompt({
        name: 'task',
        type: 'input',
        message: 'Enter task'
    });

    program.parse(process.argv.concat(['add', input.task]));
}

async function handleDelete() {
    const input = await inquirer.prompt({
        name: 'index',
        type: 'input',
        message: 'Enter number of the row to delete'
    });
    program.parse(process.argv.concat(['delete', input.index]));
}


async function getCommand() {
    const command = await inquirer.prompt({
        name: 'command',
        type: 'list',
        message: 'Select command',
        choices: [
            'add',
            'get',
            'delete',
            'delete-all',
            'exit'
        ]
    });

    switch(command.command) {
        case('add'):
            return handleAdd();
        case('delete'):
            return handleDelete();
        case('exit'):
            figlet("bye  bye!", (err, data) => {
                console.clear();
                if (err) {
                    console.log("Something went wrong!");
                    return;
                }
                console.log(gradient.pastel(data));
            });
            await sleep();
            process.exit(0);
        default:
            return program.parse(process.argv.concat(command.command));
    }
}

async function welcome() {
    const w = chalkAnimation.rainbow("Welcome to the best cli todo app!!!\n");
    w.start();
    await sleep(2000);
    w.stop();
}

if (process.argv.length > 2) { // run basic cli 
    program.parse();
} else { // run CLI with inquirer.js
    await welcome();
    while(true){
        await getCommand();
        await sleep();
    }
}
