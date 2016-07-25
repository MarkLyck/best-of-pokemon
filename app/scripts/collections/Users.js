import Backbone from 'backbone';

import User from '../models/User';

const Users = Backbone.Collection.extend({
  url: 'https://pokekeemster.herokuapp.com/users',
  model: User,
  comparator: function(item) {
    return item.get(this.sort_key);
  },
  sortByField: function(fieldName) {
    this.sort_key = fieldName;
    this.sort();
  }
})

export default Users;
