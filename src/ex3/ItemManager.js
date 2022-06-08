import { PokemonClient } from './PokemonClient.js';
import { Console } from 'console';
import { createWriteStream, createReadStream, readFile, writeFile, read } from 'fs';
import readline from 'readline';
import { FailedFetchPokemonError, PokemonAlreadyInError} from './Errors.js';
import chalk from 'chalk';
import gradient from 'gradient-string';


export class ItemManager {
    constructor() {
        this.pokemonClient = new PokemonClient();
        this.typesColors = {
            "normal": "white",
            "fighting": "red",
            "flying": "yellow",
            "poison": "magenta",
            "bug": "magenta",
            "ghost": "magentaBright",
            "steel": "whiteBright",
            "fire": "redBright",
            "water": "blue",
            "grass": "greenBright",
            "electric": "yellowBright",
            "ice": "cyanBright"};
    }

    addRegTask(task) {
        myLogger.log(task);
    };

    colorType(type) {
        if (this.typesColors[type] !== undefined){
            return chalk[this.typesColors[type]](type);
        }
        switch(type) {
            case('rock' || 'ground'):
                return chalk.rgb(205, 127, 50)(type);
            case('psychic'):
                return gradient('magenta', 'pink', 'white', 'magenta')(type);
            case('dragon'):
                return gradient.pastel(type);
            case('fairy'):
                return chalk.rgb(255,192,203)(type);
        }
    }

    async addPokemon(pokemon) {
        const type = this.colorType(pokemon.types[0].type.name);
        const task = `Catch ${chalk.bold(pokemon.name)}, the ${type} type pokemon`;
        const items = createReadStream("itemManager.txt", 'utf-8');
        const rl = readline.createInterface({
            input: items,
            crlfDelay: Infinity
        });
        for await (const line of rl){
            if (line === task) {
                throw new PokemonAlreadyInError(task);
            }
        }
        myLogger.log(task);
        return pokemon.name;
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
    removeTask(rowToDelete) {
        readFile("itemManager.txt", 'utf-8', function(err, data) {
            if (err){
                console.log(chalk.bgRedBright("Something went wrong, try again later"));
                return;
            }
            const newFile = data.split('\n');
            if (rowToDelete < 0 || rowToDelete >= newFile.length){
                console.log(chalk.bgRedBright("input out of range!"));
                return;
            }
            newFile.splice(rowToDelete, 1)
            writeFile("itemManager.txt", newFile.join('\n'), (err) => {
                if(err){
                    console.log(chalk.bgRedBright("Something went wrong, try again later")); 
                    return;
                }
            });
            console.log(chalk.bgGreenBright("task deleted successfully!"));
        });
    }

    // delete all
    clearAll(){
        writeFile("itemManager.txt", '', (err) => {
            if(err){
                console.log(chalk.bgRedBright("Something went wrong, try again later"));
            }
        });
        console.log(chalk.bgGreenBright("deleted all tasks!"));
    }

    getItems(){
        readFile('itemManager.txt', 'utf-8', (err, data) => {
            console.log(data);
            if (data.length === 0) {
                console.log(chalk.bgCyanBright("Your todo list is empty!"));
                return;
            }
        });
    }

}


const myLogger = new Console({
    stdout: createWriteStream("itemManager.txt", {flags: 'a'})
});


