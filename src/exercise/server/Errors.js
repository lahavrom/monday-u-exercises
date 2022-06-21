const FailedFetchPokemonError = new Error();
const PokemonAlreadyInError = new Error();
const SystemFail = new Error("Something went wrong, try again later");
SystemFail.statusCode = 500;

module.exports = { 
    FailedFetchPokemonError, 
    PokemonAlreadyInError 
};