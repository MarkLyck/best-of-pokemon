import Backbone from 'backbone';

const User = Backbone.Model.extend({
  urlRoot: 'https://pokekeemster.herokuapp.com/users',
  defaults: {
    username: ''
  }
})

export default User;
