const {Types} = require("../db")
const axios = require ("axios");

const getAllTypes = async () => {
  try {
    const response = await axios.get('https://pokeapi.co/api/v2/type');
    const typesData = response.data.results;

    const types = typesData.map((typeData) => ({
      id: extractTypeId(typeData.url),
      name: typeData.name,
    }));

    // Guardar los tipos en la base de datos
    //await Types.bulkCreate(types.map((type) => ({ id: type.id, name: type.name })));

    return types;
  } catch (error) {
    throw new Error('Failed to fetch Pokemon types');
  }
};

// Function to extract the type ID from the type URL
const extractTypeId = (typeUrl) => {
  const typeUrlParts = typeUrl.split('/');
  return typeUrlParts[typeUrlParts.length - 2];
};

module.exports = { getAllTypes };