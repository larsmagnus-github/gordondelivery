import PokemonModel from '../models/pokemon.js';

/**
 * Abstracts the pokemon routes
 * 
 * @param {express instance} app 
 */
const pokemonRoutes = (app) => {
  app.get('/pokemon/all', async (req, res) => {
    let { page, count } = req.query;

    page = parseInt(page, 10);
    count = parseInt(count, 10) || 20;
    try {
      if (Number.isInteger(page) && page > 0) {
        const allPokemons = await PokemonModel.find({}).skip((page - 1) * count).limit(count);
        res.json(allPokemons);
      }

      const allPokemons = await PokemonModel.find({})
      res.json(allPokemons);
    } catch (e) {
      console.error(e);
      res.status(500).send('Internal Server Error');
    }
  });

  app.get('/pokemon/:pokemonId', async (req, res) => {
    let { pokemonId } = req.params;

    pokemonId = parseInt(pokemonId, 10)
  
    try {
      const pokemon = await PokemonModel.findOne({ pokemonId });
      if (!pokemon) {
        return res.status(404).send('Pokemon not found');
      }
      res.json(pokemon);
    } catch (e) {
      console.error(e);
      res.status(500).send('Internal Server Error');
    }
  });

  app.post('/pokemon', async (req, res) => {
    try {
      const newPokemon = new PokemonModel(req.body);
      await newPokemon.save();
  
      res.status(201).json(newPokemon);
    } catch (error) {
      console.error('Error creating new Pokemon:', error);
  
      if (error.name === 'ValidationError') {
        return res.status(400).json({ error: error.message });
      }
  
      res.status(500).send('Error creating new Pokemon');
    }
  });

  app.put('/pokemon/:pokemonId', async (req, res) => {
    const { pokemonId } = req.params;
  
    try {
      const updatedPokemon = await PokemonModel.findOneAndUpdate(
        { pokemonId: parseInt(pokemonId, 10) },
        { $set: req.body },
        { new: true, runValidators: true }
      );
  
      if (!updatedPokemon) {
        return res.status(404).send('Pokemon not found');
      }
  
      res.json(updatedPokemon);
    } catch (error) {
      console.error('Error updating Pokemon:', error);
      res.status(500).send('Error updating Pokemon');
    }
  });
}

export default pokemonRoutes;
