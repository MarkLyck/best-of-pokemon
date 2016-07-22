import Backbone from 'backbone';

import Comment from '../models/Comment';

const Comments = Backbone.Collection.extend({
  url: 'https://tiny-za-server.herokuapp.com/collections/unicorns',
  model: Comment
})

export default Comments;
