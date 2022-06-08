
export class FailedFetchPokemonError extends Error {
    constructor(message){
        super(message);
        this.message = message;
    }
}

export class PokemonAlreadyInError extends Error {
    constructor(message){
        super(message);
        this.message = message;
    }
}