import $ from 'jquery'
import Backbone from 'backbone'

import router from '../router'

const MissingView = Backbone.View.extend({
  id: 'missing-container',
  events: {
    'click #goto-pokedex-btn': 'gotoPokedex'
  },
  gotoPokedex: function() {
    router.navigate('', {trigger:true})
  },
  template: function() {
    return `
    <img src="assets/images/404.png">
    <h3>Pokemon not found</h3>
    <button id="goto-pokedex-btn">BACK HOME</button>
    `
  },
  render: function() {
    window.onpopstate = function() {
      location.hash = '#pokedex';
    }
    this.$el.html(this.template())
    return this
  }
})

export default MissingView
