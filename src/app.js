import express from 'express';
import 'dotenv/config';

import { connectDb } from './database.js';
import fetchAllPokemonDetails from './handlers/fetchAllPokemonDetails.js';
import PokemonModel from './models/pokemon.js';
import pokemonRoutes from './routes/pokemon.js';


const instances = new WeakMap();

/**
 * Starts the app instance. Note that this function has been created in such 
 * that several instance can run at the same time, and each instance will have
 * its own server and database connection.
 * 
 * @param {int} port - which port to start the server on
 * @param {boolean} isProcessed - whether to fetch all pokemon details and save to the database
 * @returns app - an express instance
 */
export const startAppInstance = async ({ port = 3000, isProcessed = true }) => {
  const app = express();
  app.use(express.json());

  try {
    const db = await connectDb();
    if (!isProcessed) {
      // Fetch all pokemon details and save to the database
      //
      // Since this is a one-time operation, and a sort of atypical pattern only
      // used in the context of this code challenge, i have locked it down with
      // this isProcessed flag
      const allPokemons = await fetchAllPokemonDetails();
      for (const pokemonDetail of allPokemons) {
        // Store a subset of all the data we fetched (only what seems most relevant)
        const pokemonToSave = {
          pokemonId: pokemonDetail.id,
          name: pokemonDetail.name,
          forms: pokemonDetail.forms.map(form => ({
            name: form.name,
          })),
          moves: pokemonDetail.moves.map(move => ({
            move: {
              name: move.move.name,
            }
          })),
          species: {
            name: pokemonDetail.species.name,
          },
          types: pokemonDetail.types.map(type => ({
            type: {
              name: type.type.name,
            }
          }))
        };
        const options = { upsert: true, new: true };
        await PokemonModel.findOneAndUpdate({ pokemonId: pokemonDetail.id }, pokemonToSave, options);
      }
    }

    // Connect all pokemon routes to the app
    pokemonRoutes(app);

    const server = app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });

    instances.set(app, { server, db });
  } catch (error) {
    console.error('Error starting app instance:', error);
  }

  return app;
};

/**
 * Stops the app instance. This function will close the server and disconnect
 * from the database.
 * 
 * @param {object} app - an express instance
 * @returns void
 */
export const stopAppInstance = async (app) => {
  await instances.get(app).server.close();
  await instances.get(app).db.disconnect();
  instances.delete(app);
}

