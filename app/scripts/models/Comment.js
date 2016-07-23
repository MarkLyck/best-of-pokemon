import Backbone from 'backbone';

const Comment = Backbone.Model.extend({
  urlRoot: 'https://pokekeemster.herokuapp.com/comments',
  defaults: {
    username: '',
    body: '',
    timestamp: new Date(),
    pokemonId: 1
  }
})

export default Comment
