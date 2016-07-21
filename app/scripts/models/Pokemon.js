import Backbone from 'backbone';

const Pokemon = Backbone.Model.extend({
  urlRoot: '',
  idAttribute: '_id',
  defaults: {
    name: '',
    type: '',
    description: '',
    height: 0,
    weight: 0,
    abilities: []
  }
})

export default Pokemon
