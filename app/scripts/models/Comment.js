import Backbone from 'backbone';

const Comment = Backbone.Model.extend({
  urlRoot: 'https://tiny-za-server.herokuapp.com/collections/unicorns',
  idAttribute: '_id',
  defaults: {
    username: '',
    body: '',
    timestamp: '',
    pokemonId: 1,
  }
})

export default Comment
