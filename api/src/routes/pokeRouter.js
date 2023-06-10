const { Router } = require('express');
const {getPokemonsHandler, getIdHandler, postPokemonHandler} = require("../handlers/pokeHandlers")
const pokeRouter = Router()

pokeRouter.get("/", getPokemonsHandler)

pokeRouter.get("/:id", getIdHandler)

pokeRouter.post("/", postPokemonHandler)

module.exports = pokeRouter