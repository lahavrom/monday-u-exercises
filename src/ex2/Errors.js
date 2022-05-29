
class FailedFetchPokemonError extends Error {
    constructor(message){
        super(message);
        this.message = message;
    }
}

class PokemonAlreadyInError extends Error {
    constructor(message){
        super(message);
        this.message = message;
    }
}