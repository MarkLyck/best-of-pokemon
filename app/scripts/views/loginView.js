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
    <div class="username">
      <input type="text" name="username" placeholder="username" id="username" />
      <p>Username is invalid</p>
      <i class="fa fa-times error-icon error-username" aria-hidden="true"></i>
      <i class="fa fa-check validation-icon validation-username" aria-hidden="true"></i>
    </div>
    <div class="password">
      <input type="password" name="password" placeholder="password" id="password" />
      <p>Password is invalid</p>
      <i class="fa fa-times error-icon error-password" aria-hidden="true"></i>
      <i class="fa fa-check validation-icon validation-password" aria-hidden="true"></i>
    </div>
    <input type="submit" name="submit" />
    <a href="#signup">Don't have an account? <span>Sign up!</span></a>
    `;
  },
  events: {
    'submit': 'submit',
    'keyup #username': 'validateUsername',
    'keyup #password': 'validatePassword'
  },
  validateUsername: function() {
    this.$('.validation-icon').hide();
    this.$('.error-icon').hide();
    this.$('p').hide();
  },
  validatePassword: function() {
    this.$('.validation-icon').hide();
    this.$('.error-icon').hide();
    this.$('p').hide();
    let username = $('#username').val();
    let password = $('#password').val();
    let checker = /[a-zA-Z0-9]/g;
    let characters = username.match(checker);
    if (password.length >= 6) {
      this.$('.validation-password').show();
    } else {
      this.$('.validation-password').hide();
    }
    if (username.length > 0 && characters.length === username.length) {
      this.$('.validation-username').show();
    }
  },
  submit: function (e) {
    e.preventDefault();
    let username = $('#username').val();
    let password = $('#password').val();
    let checker = /[a-zA-Z0-9]/g;
    let characters = username.match(checker);
    if (characters.length < username.length) {
      this.$('.error-username').show();
      this.$('.username p').show();
    } else if (password.length < 6) {
      this.$('.error-password').show();
      this.$('.password p').show();
    } else {
      store.session.login()
    }
    // session.save({username: username, password: password}, {
    //   success: function (model, response) {
    //     window.localStorage.setItem('authtoken', response._kmd.authtoken);
    //     model.unset('password');
    //     router.navigate('pokedex', {trigger:true});
    //   },
    //   error: function () {
    //     $('.login-form').shake();
    //     console.log('error, you did not log in');
    //   }
    // });
  },
  render: function() {
    let $loginDropdown = $(`
      <button id="login-btn">Login</button>
      `);
    $loginDropdown.on('click', function(e) {
      $('.login-form').slideToggle(100);
    });
    $('#container').append($loginDropdown);
    this.$el.html(this.template());
    this.$('.error-icon').hide();
    this.$('.validation-icon').hide();
    this.$('p').hide();
    return this;
  }
})

export default LoginView
