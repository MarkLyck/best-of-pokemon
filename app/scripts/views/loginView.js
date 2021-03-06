import $ from 'jquery'
import Backbone from 'backbone'

import store from '../store'

// Custom Jquery shake function
$.fn.shake = function(currRight) {
    this.each(function(i) {
        for (var x = 1; x <= 3; x++) {
            $(this).animate({ right: currRight-25 }, 10).animate({ right: currRight }, 50).animate({ right: currRight + 25 }, 10).animate({ right: currRight }, 50);
        }
    });
    return this;
}

const LoginView = Backbone.View.extend({
  initialize: function() {

  },
  tagName: 'form',
  className: 'login-form',
  template: function () {
    return `
    <div class="username">
      <i class="fa fa-user username-icon" aria-hidden="true"></i>
      <input type="text" name="username" placeholder="username" id="username" />
      <p>Username is invalid</p>
      <i class="fa fa-times error-icon error-username" aria-hidden="true"></i>
      <i class="fa fa-check validation-icon validation-username" aria-hidden="true"></i>
    </div>
    <div class="password">
      <i class="fa fa-unlock-alt password-icon" aria-hidden="true"></i>
      <input type="password" name="password" placeholder="password" id="password" />
      <p>Password is invalid</p>
      <i class="fa fa-times error-icon error-password" aria-hidden="true"></i>
      <i class="fa fa-check validation-icon validation-password" aria-hidden="true"></i>
    </div>
    <input type="submit" name="submit" value="Login"/>
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
    } else {
      this.$('.error-username').show();
    }
  },
  submit: function (e) {
    e.preventDefault();
    let username = $('#username').val();
    let password = $('#password').val();
    let checker = /[a-zA-Z0-9]/g;
    let characters = username.match(checker);
    if (characters) {
      if (characters.length < username.length) {
        this.$('.error-username').show();
        this.$('.username p').show();
        this.$el.shake(65);
      } else if (password.length < 6) {
        this.$('.error-password').show();
        this.$('.password p').show();
        this.$el.shake(65);
      } else {
        store.session.login(username, password)
      }
    } else {
      this.$('.error-username').show();
      this.$('.username p').show();
      this.$el.shake(65);
    }

  },
  render: function() {
    this.$el.hide()
    this.$el.html(this.template());
    this.$('.error-icon').hide();
    this.$('.validation-icon').hide();
    this.$('p').hide();
    return this;
  }
})

export default LoginView
