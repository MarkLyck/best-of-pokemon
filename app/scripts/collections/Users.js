import Backbone from 'backbone';

import User from '../models/User';

const Users = Backbone.Collection.extend({
  url: 'https://pokekeemster.herokuapp.com/users',
  model: User
})

export default Users;
