import $ from 'jquery'
import Backbone from 'backbone'

import store from '../store'

const TopPokemonView = Backbone.View.extend({
  initialize: function() {
    store.pokemons.data.fetch({success: () => this.render()})
    },
  // tagName: 'ul',
  tagName: 'div',
  id: 'top-section',
  events: {

  },
  template: function() {
    return `
    <h3 id="top-pokemon-title">Top 10 Pokemon</h3>
    <ul id="top-list">

    </ul>
    `
  },
  render: function() {
    this.$el.html(this.template())
    let counter = 1
    console.log('STARTING LOOP');
    console.log(store.pokemons.data);
    while (counter <= 10) {
      let pokemon = store.pokemons.data.models[counter-1]
      let $topLi = $(`
        <li class="pokemon-li">
          <div class="top">
              <p class="pokemon-fav">${pokemon.get('id')}</p>
          </div>
          <div class="bottom">
            <h3 class="pokemon-name">${pokemon.get('name')}</h3>
            <button class="like-btn"><span class="like-number">0</span></button>
          </div>
        </li>
      `)
      let imageid = counter
      if (imageid < 10) {
        imageid = '00' + String(imageid)
      } else if (imageid < 100) {
        imageid = '0' + String(imageid)
      }
      $topLi.find('.top').css('background-image', `url('assets/images/pokemon/${imageid}.png')`)
      this.$('#top-list').append($topLi)
      counter++
    }

    return this
  }
})

export default TopPokemonView
