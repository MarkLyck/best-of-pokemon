import $ from 'jquery'
import Backbone from 'backbone'

import router from '../router'
import store from '../store'

import LoginView from './loginView';
import SignupView from './signupView';

const HeaderView = Backbone.View.extend({
  initialize: function() {
    store.session.on('change', () => {
      this.render()
    })
  },
  tagName: 'header',
  template: function() {
    return `
      <h2 id="logo">PokeDex</h2>
      <div class="nav-buttons">
        <button id="goto-trainers-btn"><i class="fa fa-users" aria-hidden="true"></i> </button>
      </div>
    `
  },
  events: {
    'click #logout-btn'     : 'logout',
    'click #goto-login-btn' : 'gotoLogin',
    'click #goto-signup-btn': 'gotoSignup',
    'click #logo'           : 'gotoPokedex',
    'click #goto-trainers-btn' : 'gotoTrainers'
  },
  logout: function() {
    // localStorage.removeItem(authtoken)
    store.session.logout();
    this.render();
  },
  gotoLogin: function() {
    $(document).off();
    this.$el.find('.signup-form').hide();
    let loginView = new LoginView();
    let removeLoginTimeout = window.setTimeout(() => {
      $(document).on('click', e => {
        if ($(e.target).closest('.login-form').length < 1 && $(e.target).attr('id') !== 'goto-login-btn' && this.$el.find('.login-form').css('display') !== 'none') {
          this.$el.find('.login-form').slideToggle(100);
          $(document).off();
        } else if ($(e.target).attr('id') === 'goto-login-btn') {
          $(document).off();
        }
      })
    }, 100);
    this.$el.find('.login-form').slideToggle(100);
  },
  gotoSignup: function() {
    $(document).off();
    this.$el.find('.login-form').hide();
    let signupView = new SignupView();
    let removeSignupTimeout = window.setTimeout(() => {
      $(document).on('click', e => {
        if ($(e.target).closest('.signup-form').length < 1 && $(e.target).attr('id') !== 'goto-signup-btn' && this.$el.find('.signup-form').css('display') !== 'none') {
          this.$el.find('.signup-form').slideToggle(100);
          $(document).off();
        } else if ($(e.target).attr('id') === 'goto-signup-btn') {
          $(document).off();
        }
      })
    }, 100);
    this.$el.find('.signup-form').slideToggle(100);
  },
  gotoPokedex: function() {
    router.navigate('', {trigger:true})
  },
  gotoTrainers: function() {
    router.navigate('trainer', {trigger:true})
  },
  render: function() {
    this.$el.html(this.template())
    let loginView = new LoginView();
    let signupView = new SignupView();
    this.$el.append(loginView.render().$el);
    this.$el.append(signupView.render().$el);
    if (store.session.get('authtoken')) {
      let $logoutBtn = $(`<button id="logout-btn"><i class="fa fa-sign-out" aria-hidden="true"></i> </button>`)
      this.$('.nav-buttons').append($logoutBtn)
    } else {
      let $loginBtn = $(`<button id="goto-login-btn"><i class="fa fa-sign-in" aria-hidden="true"></i> </button>`)
      let $signupBtn = $(`<button id="goto-signup-btn"><i class="fa fa-user-plus" aria-hidden="true"></i> </button>`)
      this.$('.nav-buttons').append($loginBtn).append($signupBtn)
    }
    return this
  }
})

export default HeaderView
