import _ from 'underscore';
import Backbone from 'backbone';
import store from '../store'


const Session = Backbone.Model.extend({
  urlRoot: 'https://pokekeemster.herokuapp.com/login',
  defaults: {
    username: '',
  },
  login: function(username, password) {
    this.save({
      username: username,
      password: password
    }, {
      success: (response) => {
        console.log(response);
        console.log('SUCCESSFUL LOGIN: ');
        this.unset('password')
        localStorage.authtoken = this.get('authtoken')
        localStorage.username = this.get('username')
        localStorage.id = this.get('id')
        // console.log(store.session);
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
      success: (response) => {
        console.log('SUCCESSFUL SIGNUP: ', response);
        localStorage.authtoken = this.get('authtoken')
        localStorage.username = this.get('username')
      },
      error: function(response) {
        console.log('LOGIN ERROR: ', response);
      }
    })
  },
  logout: function() {
    store.session.clear()
    localStorage.removeItem('authtoken')
    localStorage.removeItem('username')
  }
})

export default Session;
