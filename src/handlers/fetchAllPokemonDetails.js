import { getPokemons, getPokemonById } from '../services/pokemon.js';

/**
 * Fetch all pokemon details
 * 
 * First fetch basic information about all pokemons, and then fetch details for each pokemon.
 * 
 * @returns {Promise<Array>} - Array of pokemon details
 */
const fetchAllPokemonDetails = async () => {
  const pokemons = await getPokemons();
  const detailPromises = pokemons.results.map(pokemon => {
    const id = pokemon.url.split('/').filter(Boolean).pop();
    return getPokemonById(id);
  });
  
  return await Promise.all(detailPromises);
}

export default fetchAllPokemonDetails;