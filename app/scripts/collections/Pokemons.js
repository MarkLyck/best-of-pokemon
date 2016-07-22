import Backbone from 'backbone';

import Pokemon from '../models/Pokemon';

const Pokemons = Backbone.Collection.extend({
  url: 'http://pokeapi.co/api/v2/pokemon/',
  model: Pokemon
})

export default Pokemons;
