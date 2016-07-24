import Backbone from 'backbone';

import Comment from '../models/Comment';

const Comments = Backbone.Collection.extend({
  url: 'https://pokekeemster.herokuapp.com/comments',
  model: Comment
})

export default Comments;
