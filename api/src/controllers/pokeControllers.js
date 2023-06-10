const {Pokemon, Types} = require("../db")
const axios = require("axios")

const createPokemon = async (name, image, hp, attack, defense, speed, height, weight, types) => {
  try {
    const newPokemon = await Pokemon.create({ name, image, hp, attack, defense, speed, height, weight });

    if (Array.isArray(types) && types.length > 0) {
      const typePromises = types.map(async (typeId) => {
        const type = await Types.findByPk(typeId);
        if (type) {
          await newPokemon.setTypes([type]);
        }
      });

      await Promise.all(typePromises);
    }

    return newPokemon;
  } catch (error) {
    // Manejar cualquier error que ocurra durante la creación del Pokemon
    throw new Error('Error al crear el Pokémon');
  }
};


const getPokemonById = async (id, source) => {
  if (source === "api") {
    const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
    const { name, sprites, stats, height, weight } = response.data;
    const hp = stats.find((stat) => stat.stat.name === "hp").base_stat;
    const attack = stats.find((stat) => stat.stat.name === "attack").base_stat;
    const defense = stats.find((stat) => stat.stat.name === "defense").base_stat;
    const speed = stats.find((stat) => stat.stat.name === "speed").base_stat;
    const types = response.data.types.map((type) => type.type.name);
    return { id, name, image: sprites.front_default, hp, attack, defense, speed, height, weight, types };
  } else {
    const pokemon = await Pokemon.findByPk(id);
    if (pokemon) {
      const types = await pokemon.getTypes();
      return { ...pokemon.toJSON(), types };
    }
    return null;
  }
};


const getAllPokemons = async () => {
  const dbPokemons = await Pokemon.findAll();

  const apiPokemonsResponse = await axios.get(`https://pokeapi.co/api/v2/pokemon`);
  const apiPokemons = apiPokemonsResponse.data.results;

  const pokemonDetailsPromises = apiPokemons.map(async (pokemon) => {
    const response = await axios.get(pokemon.url);
    const { id, name, sprites, stats, height, weight } = response.data;
    const hp = stats.find((stat) => stat.stat.name === "hp").base_stat;
    const attack = stats.find((stat) => stat.stat.name === "attack").base_stat;
    const defense = stats.find((stat) => stat.stat.name === "defense").base_stat;
    const speed = stats.find((stat) => stat.stat.name === "speed").base_stat;
    const types = response.data.types.map((type) => type.type.name);
    return {
      id,
      name,
      image: sprites.front_default,
      hp,
      attack,
      defense,
      speed,
      height,
      weight,
      types,
    };
  });

  const pokemonDetails = await Promise.all(pokemonDetailsPromises);

  // Mapea los Pokémon de la base de datos y agrega el apartado de tipos
  const dbPokemonsWithTypes = await Promise.all(
    dbPokemons.map(async (pokemon) => {
      const types = await pokemon.getTypes();
      return {
        ...pokemon.toJSON(),
        types: types.map((type) => ({ id: type.id, name: type.name })),
      };
    })
  );

  return [...dbPokemonsWithTypes, ...pokemonDetails];
};


const searchByName = async (name) => {
  const lowerCaseName = name.toLowerCase();

  const dbPokemons = await Pokemon.findAll({ where: { name: lowerCaseName }, include: Types });

  const apiPokemonsResponse = await axios.get("https://pokeapi.co/api/v2/pokemon");
  const apiPokemons = apiPokemonsResponse.data.results
    .filter((pokemon) => pokemon.name.toLowerCase() === lowerCaseName)
    .map(async (pokemon) => {
      const pokemonDetailsResponse = await axios.get(pokemon.url);
      const { id, name, stats, height, weight } = pokemonDetailsResponse.data;
      const image = pokemonDetailsResponse.data.sprites.front_default;

      const hp = stats.find((stat) => stat.stat.name === "hp").base_stat;
      const attack = stats.find((stat) => stat.stat.name === "attack").base_stat;
      const defense = stats.find((stat) => stat.stat.name === "defense").base_stat;
      const speed = stats.find((stat) => stat.stat.name === "speed").base_stat;
      const types = pokemonDetailsResponse.data.types.map((type) => type.type.name);

      return {
        id,
        name,
        hp,
        attack,
        defense,
        speed,
        height,
        weight,
        image,
        types,
      };
    });

  const results = [...dbPokemons];

  for (const pokemon of apiPokemons) {
    results.push(await pokemon);
  }

  for (const pokemon of results) {
    if (!pokemon.types) {
      const dbPokemon = await Pokemon.findByPk(pokemon.id, { include: Types });
      if (dbPokemon) {
        const types = dbPokemon.Types.map((type) => ({
          id: type.id,
          name: type.name,
        }));
        pokemon.types = types;
      }
    }
  }

  return results;
};


    module.exports = {createPokemon, getPokemonById,getAllPokemons, searchByName }