// Classe para coletar informações do pokémon em um objeto
export class Pokemon {
    constructor(name, number, type, types, photo, height, weight, abilities, stats) {
        this.name = name;
        this.number = number;
        this.type = type;
        this.types = types;
        this.photo = photo;
        this.height = height;
        this.weight = weight;
        this.abilities = abilities;
        this.stats = stats;
    }
}

// Converte os dados brutos de um Pokémon retornados pela API para uma estrutura mais simples e customizada.
export function convertPokeApiToDetailPokemon(pokeDetail) {
    const pokemon = new Pokemon();
    pokemon.number = pokeDetail.id;
    pokemon.name = pokeDetail.name;
    pokemon.types = pokeDetail.types.map((typeSlot) => typeSlot.type.name);
    pokemon.type = pokemon.types[0];
    pokemon.photo = pokeDetail.sprites.other.showdown.front_default;
    pokemon.height = pokeDetail.height; // Altura
    pokemon.weight = pokeDetail.weight; // Peso
    pokemon.abilities = pokeDetail.abilities.map((a) => a.ability.name); // Habilidades
    pokemon.stats = pokeDetail.stats.map((stat) => ({
        name: stat.stat.name,
        value: stat.base_stat,
    }));

    return pokemon
}