import _ from 'underscore';
import Backbone from 'backbone';

const Pokemon = Backbone.Model.extend({
  urlRoot: 'https://pokekeemster.herokuapp.com/pokemons',
  idAttribute: 'id',
  defaults: {
    name: '',
    height: 0,
    weight: 0,
    types: []
  },
  toJSON: function() {
    return { pokemon: _.clone( this.attributes ) }
  },
})

export default Pokemon
