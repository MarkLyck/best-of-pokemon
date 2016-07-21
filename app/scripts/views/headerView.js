import $ from 'jquery'
import Backbone from 'backbone'

import router from '../router'

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
    'click #logout-btn': 'logout',
    'click #goto-login-btn': 'gotoLogin',
    'click #goto-signup-btn': 'gotoSignup',
    'click #logo'           : 'gotoPokedex'
  },
  logout: function() {
    localStorage.removeItem(authtoken)
    this.render()
  },
  gotoLogin: function() {
    router.navigate('login', {trigger:true})
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
      let $logoutBtn = $(`<button id="logout-btn">Logout</button>`)
      this.$('.nav-buttons').append($logoutBtn)
    } else {
      let $loginBtn = $(`<button id="goto-login-btn">Login</button>`)
      let $signupBtn = $(`<button id="goto-signup-btn">Signup</button>`)
      this.$('.nav-buttons').append($loginBtn).append($signupBtn)
    }
    return this
  }
})

export default HeaderView
