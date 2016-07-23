import Backbone from 'backbone';

const Session = Backbone.Model.extend({
  urlRoot: 'https://pokekeemster.herokuapp.com/login',
  defaults: {
    username: '',
  },
  toJSON: function() {
    return { user: _.clone( this.attributes ) }
  },
  login: function(username, password) {
    this.save({
      username: username,
      password: password
    }, {
      success: function(response) {
        console.log('SUCCESSFUL LOGIN: ', response);
      },
      error: function(response) {
        console.log('LOGIN ERROR: ', response);
      }
    })
  },
  signup: function(username, password) {
    console.log('signing up with username: ', username);
    console.log('signing up with pw: ', password);
    this.save({
      username: username,
      password: password
    }, {
      url: 'https://pokekeemster.herokuapp.com/users',
      type: 'POST',
      success: function(response) {
        console.log('SUCCESSFUL SIGNUP: ', response);
      }
    })
  }
})

export default Session;
