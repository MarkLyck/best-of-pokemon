import $ from 'jquery'
import Backbone from 'backbone'

import router from '../router'

import LoginView from './loginView';

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
    this.$el.append(loginView.render().$el);
    // router.navigate('login', {trigger:true})
  },
  gotoSignup: function() {
    router.navigate('signup', {trigger:true})
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
