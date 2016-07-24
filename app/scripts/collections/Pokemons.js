import Backbone from 'backbone';

import Pokemon from '../models/Pokemon';

const Pokemons = Backbone.Collection.extend({
  url: 'https://pokekeemster.herokuapp.com/pokemons',
  model: Pokemon,
  comparator: function(item) {
    return item.get(this.sort_key);
  },
  sortByField: function(fieldName) {
    this.sort_key = fieldName;
    this.sort();
  }
})

export default Pokemons;
