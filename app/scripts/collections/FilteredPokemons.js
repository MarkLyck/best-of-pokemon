import Backbone from 'backbone';

import FilteredPokemons from '../models/Pokemon';

const Pokemons = Backbone.Collection.extend({
  url: 'https://pokekeemster.herokuapp.com/pokemons',
  model: Pokemon
})

export default FilteredPokemons;
