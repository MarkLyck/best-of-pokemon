import $ from 'jquery';
import Backbone from 'backbone';

import router from '../router';
import store from '../store';


const PokedexView = Backbone.View.extend({
  initialize: function() {
    store.pokemons.data.fetch({success: () => this.render()})
  },
  id: 'pokedex-container',
  events: {

  },
  template: function() {
    return `
    <h3 id="pokedex-title">All Pokemon</h3>
    <ul id="pokedex-list">
    </ul>
    `
  },
  render: function() {
    this.$el.html(this.template())
    store.pokemons.data.each((pokemon) => {
      let $pokemonLi = $(`
          <li class="pokemon-li">
            <div class="top">
              <p class="pokemon-number">${pokemon.get('id')}</p>
            </div>
            <div class="bottom">
              <h3 class="pokemon-name">${pokemon.get('name')}</h3>
              <button class="like-btn"><span class="like-number">${Math.round(Math.random()*100)}</span></button>
            </div>
          </li>
        `);
      let fixedNumber = pokemon.id

      if (fixedNumber < 10) {
        fixedNumber = '00' + String(fixedNumber)
      } else if (fixedNumber < 100) {
        fixedNumber = '0' + String(fixedNumber)
      }

      $pokemonLi.find('.top').css('background-image', `url('assets/images/pokemon/${fixedNumber}.png')`);
      this.$('#pokedex-list').append($pokemonLi);
      $pokemonLi.on('click', function () {
        router.navigate(`pokemon/${$pokemonLi.find('.pokemon-number').text()}`, {trigger:true});
      });
    })
    return this
  }
})

export default PokedexView
