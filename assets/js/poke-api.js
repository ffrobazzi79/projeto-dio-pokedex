import { Pokemon, convertPokeApiToDetailPokemon } from './pokemon-model.js';

export const pokeApi = {};
// Obtém detalhes de um Pokémon usando o link fornecido na resposta inicial da API.
pokeApi.getPokemonDetail = async (pokemon) => {
    return fetch(pokemon.url)
            .then((response) => response.json())
            .then(convertPokeApiToDetailPokemon)
}

// A lista final contém objetos customizados com os detalhes
pokeApi.getPokemons = async (offset = 0, limit = 12) => {
    const url = `https://pokeapi.co/api/v2/pokemon/?offset=${offset}&limit=${limit}`;

    return fetch(url)
        .then((response) => response.json())
        .then((jsonBody) => jsonBody.results)
        .then((pokemons) => pokemons.map(pokeApi.getPokemonDetail))
        .then((detailRequests) => Promise.all(detailRequests))
        .then((pokemonDetails) => (pokemonDetails))
};