import $ from 'jquery'
import Backbone from 'backbone'

import store from '../store'

const LoginView = Backbone.View.extend({
  initialize: function() {

  },
  tagName: 'form',
  className: 'login-form',
  template: function () {
    return `
    <h2>Login</h2>
    <input type="text" name="username" id="username" />
    <input type="password" name="password" id="password" />
    <input type="submit" name="submit" />
    <a href="#signup">Don't have an account? <span>Sign up!</span></a>
    `;
  },
  events: {
    'submit': 'submit'
  },
  submit: function (e) {
    e.preventDefault();
    let username = $('#username').val();
    let password = $('#password').val();
    // session.save({username: username, password: password}, {
    //   success: function (model, response) {
    //     window.localStorage.setItem('authtoken', response._kmd.authtoken);
    //     model.unset('password');
    //     router.navigate('pokedex', {trigger:true});
    //   },
    //   error: function () {
    //     console.log('error, you did not log in');
    //   }
    // });
    store.session.login()
  },
  render: function() {
    this.$el.html(this.template());
    return this;
  }
})

export default LoginView
