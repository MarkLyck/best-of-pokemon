import Backbone from 'backbone';

const Comment = Backbone.Model.extend({
  urlRoot: 'http://pokeapi.co/api/v2/pokemon/',
  // urlRoot: 'https://tiny-za-server.herokuapp.com/collections/unicorns',
  // idAttribute: '_id',
  idAttribute: 'id',
  defaults: {
    username: '',
    body: '',
    timestamp: ''
  }
})

export default Comment
