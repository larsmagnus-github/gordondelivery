import mongoose from 'mongoose';

/**
 * A Mongoose Schema for Pokemon
 */
const pokemonSchema = new mongoose.Schema({
  pokemonId: { type: Number, unique: true, index: true },
  name: { type: String, unique: true, index: true },
  forms: [{
    name: String,
  }],
  moves: [{
    move: {
      name: String,
    }
  }],
  species: {
    name: String,
  },
  types: [{
    type: {
      name: String,
    }
  }]
});

const Pokemon = mongoose.model('Pokemon', pokemonSchema);

export default Pokemon;
