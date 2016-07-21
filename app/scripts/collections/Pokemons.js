import Backbone from 'backbone';

import Pokemon from '../models/Pokemon';

const Pokemons = Backbone.Collection.extend({
  url: '',
  model: Pokemon
})

export default Pokemons;
