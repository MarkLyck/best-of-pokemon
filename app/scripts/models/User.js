import Backbone from 'backbone';

const User = Backbone.Model.extend({
  defaults: {
    username: ''
  },
})

export default User;
