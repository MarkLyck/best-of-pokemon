import Backbone from 'backbone';

const Like = Backbone.Model.extend({
  urlRoot: 'https://tiny-za-server.herokuapp.com/collections/unicorns',
  idAttribute: '_id',
  defaults: {
    likes: 0
  }
})

export default Like
