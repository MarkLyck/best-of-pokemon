import Backbone from 'backbone';

const Pokemon = Backbone.Model.extend({
  urlRoot: 'https://tiny-za-server.herokuapp.com/collections/unicorns',
  idAttribute: '_id',
  defaults: {
    name: '',
    type: '',
    description: '',
    height: 0,
    weight: 0,
    moves: []
  }
})

export default Pokemon
