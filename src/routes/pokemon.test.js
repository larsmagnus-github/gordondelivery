import request from 'supertest';
import { startAppInstance, stopAppInstance } from '../app.js';


let app;
const newPokemonId = Math.random() * 10000000 + 2000;
const newPokemonName = `JestTestPokemon - ${Math.random() * 10000000 + 2000}`; 
beforeAll(async () => {
  // connect to the database and server with port that is other than default
  app = await startAppInstance(3030);
});

afterAll(async () => {
  await stopAppInstance(app);
})

describe('Pokemon API', () => {
  it('GET /pokemon/:pokemonId - get a pokemon', async () => {
    const response = await request(app)
      .get('/pokemon/1')
      .expect(200);

    expect(response.body.name).toBe('bulbasaur');
  });


  it('POST /pokemon - create a new pokemon', async () => {
    const newPokemon = {
      pokemonId: newPokemonId,
      name: newPokemonName,
    };

    const createResponse = await request(app)
      .post('/pokemon')
      .send(newPokemon)
      .expect(201);

    expect(createResponse.body.name).toBe(newPokemon.name);
  });

  it('PUT /pokemon/:pokemonId - update a pokemon', async () => {
    const getResponse = await request(app)
      .get('/pokemon/1')
      .expect(200);

    const { pokemonId, name } = getResponse.body;

    const updatedData = {
      name,
    };

    const response = await request(app)
      .put(`/pokemon/${pokemonId}`)
      .send(updatedData)
      .expect(200);

    expect(response.body.name).toBe(updatedData.name);
  });
});
