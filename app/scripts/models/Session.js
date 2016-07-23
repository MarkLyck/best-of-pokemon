import Backbone from 'backbone';

const Session = Backbone.Model.extend({
  urlRoot: 'https://pokekeemster.herokuapp.com/users',
  defaults: {
    username: '',
    favorite: ''
  },
  login: function() {
    localStorage.authtoken = 1234;
  },
  signup: function(username, password) {
    console.log('signing up with username: ', username);
    console.log('signing up with pw: ', password);
  }
})

export default Session;
