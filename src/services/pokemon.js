const POKEMON_API_BASE_URL = process.env.POKEMON_API_BASE_URL || '';

/**
 * Get pokemon service connected to the pokemon API.
 * Fetch a list of pokemons from the API.
 * 
 * @param {int} offset 
 * @param {int} limit 
 * 
 * @returns {Promise<Array>} - Array of pokemons (objects)
 */
export const getPokemons = async (offset = 0, limit = 1500) => {
  const response = await fetch(`${POKEMON_API_BASE_URL}?offset=${offset}&limit=${limit}`);
  if (!response.ok) throw new Error(`Network response was not ok => ${response.statusText} (${response.status})`);
  return response.json();
}

/**
 * Get pokemon service connected to the pokemon API.
 * Fetch a pokemon by its id.
 * 
 * @param {int} id
 * @returns {Promise<Object>} - Pokemon object
 */
export const getPokemonById = async (id) => {
  const response = await fetch(`${POKEMON_API_BASE_URL}/${id}`);
  if (!response.ok) throw new Error(`Network response was not ok => ${response.statusText} (${response.status})`);
  return response.json();
}
