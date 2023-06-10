const { createPokemon, getPokemonById, getAllPokemons, searchByName } = require("../controllers/pokeControllers")
const {Types, Pokemon} = require("../db")


const getPokemonsHandler = async (req, res) =>{
    const {name} = req.query
    const results = name ? await searchByName(name) : await getAllPokemons()
    res.status(200).json(results)
}

const getIdHandler = async (req, res) => {
  const { id } = req.params;
  const source = isNaN(id) ? "bdd" : "api";

  try {
    const pokemon = await getPokemonById(id, source);

    if (!pokemon) {
      res.status(404).json({ error: "No se encontró el Pokémon" });
    } else {
      let formattedPokemon = pokemon;

      if (source === "api") {
        formattedPokemon = {
          ...pokemon,
          types: pokemon.types.map((type) => {
            return {
              id: null, // Puedes asignar un ID nulo para los tipos provenientes de la API
              name: type
            };
          })
        };
      }

      res.status(200).json(formattedPokemon);
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

  const postPokemonHandler = async (req, res) => {
    try {
      const { name, image, hp, attack, defense, speed, height, weight, type } = req.body;
  
      // Crea el Pokémon
      const pokemonCreated = await Pokemon.create({ name, image, hp, attack, defense, speed, height, weight });
  
      // Asocia los tipos al Pokémon utilizando los IDs proporcionados
      if (Array.isArray(type) && type.length > 0) {
        const typeObjects = await Types.findAll({ where: { id: type } });
        await pokemonCreated.setTypes(typeObjects);
      }
  
      // Obtiene los tipos asociados al Pokémon creado
      const associatedTypes = await pokemonCreated.getTypes();
  
      // Formatea los tipos para devolver solo el ID y el nombre
      const formattedTypes = associatedTypes.map((type) => {
        return {
          id: type.id,
          name: type.name
        };
      });
  
      return res.status(200).json({ pokemon: pokemonCreated, types: formattedTypes });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

module.exports = {getPokemonsHandler, getIdHandler, postPokemonHandler}