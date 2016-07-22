import Backbone from 'backbone';

const Pokemon = Backbone.Model.extend({
  urlRoot: 'http://pokeapi.co/api/v2/pokemon/',
  // urlRoot: 'https://tiny-za-server.herokuapp.com/collections/unicorns',
  // idAttribute: '_id',
  idAttribute: 'id',
  defaults: {
    name: '',
    type: '',
    height: 0,
    weight: 0,
    types: []
  }
})

export default Pokemon
