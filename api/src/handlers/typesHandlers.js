const { getAllTypes } = require("../controllers/typesControllers");

const getTypesHandler = async (req, res) => {
    try {
      const results = await getAllTypes();
      res.status(200).json(results);
    } catch (error) {
      console.error('Error:', error.message);
      res.status(500).json({ error: 'Failed to fetch Pokemon types' });
    }
  };

module.exports = {getTypesHandler}