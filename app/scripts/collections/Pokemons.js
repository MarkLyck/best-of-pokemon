import Backbone from 'backbone';

import Pokemon from '../models/Pokemon';

const Pokemons = Backbone.Collection.extend({
  url: 'https://pokekeemster.herokuapp.com/pokemons',
  model: Pokemon
})

export default Pokemons;
