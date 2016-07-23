import $ from 'jquery'
import Backbone from 'backbone'

import router from '../router'

import LoginView from './loginView';
import SignupView from './signupView';

const HeaderView = Backbone.View.extend({
  tagName: 'header',
  template: function() {
    return `
      <h2 id="logo">PokeDex</h2>
      <div class="nav-buttons">

      </div>
    `
  },
  events: {
    'click #logout-btn'     : 'logout',
    'click #goto-login-btn' : 'gotoLogin',
    'click #goto-signup-btn': 'gotoSignup',
    'click #logo'           : 'gotoPokedex'
  },
  logout: function() {
    localStorage.removeItem(authtoken)
    this.render()
  },
  gotoLogin: function() {
    let loginView = new LoginView();
    if (this.$el.find('.login-form').length === 0) {
      this.$el.append(loginView.render().$el);
      this.$el.find('.signup-form').remove();
      let removeLoginTimeout = window.setTimeout(function() {
        $(document).on('click', e => {
          if ($(e.target).closest('.login-form').length < 1) {
            console.log('test');
            loginView.remove();
            $(document).off();
          }
        })
      }, 100);
    } else {
      this.$el.find('.login-form').slideToggle(100);
    }
  },
  gotoSignup: function() {
    let signupView = new SignupView();
    if (this.$el.find('.signup-form').length === 0) {
      this.$el.append(signupView.render().$el);
      this.$el.find('.login-form').remove();
      let removeSignupTimeout = window.setTimeout(function() {
        $(document).on('click', e => {
          if ($(e.target).closest('.signup-form').length < 1) {
            console.log('test');
            signupView.remove();
            $(document).off();
          }
        })
      }, 100);
    } else {
      this.$el.find('.signup-form').slideToggle(100);
    }
  },
  gotoPokedex: function() {
    router.navigate('', {trigger:true})
  },
  render: function() {
    this.$el.html(this.template())
    if (localStorage.authtoken) {
      let $logoutBtn = $(`<button id="logout-btn"><i class="fa fa-sign-out" aria-hidden="true"></i> Logout</button>`)
      this.$('.nav-buttons').append($logoutBtn)
    } else {
      let $loginBtn = $(`<button id="goto-login-btn"><i class="fa fa-sign-in" aria-hidden="true"></i> Login</button>`)
      let $signupBtn = $(`<button id="goto-signup-btn"><i class="fa fa-user-plus" aria-hidden="true"></i> Signup</button>`)
      this.$('.nav-buttons').append($loginBtn).append($signupBtn)
    }
    return this
  }
})

export default HeaderView
