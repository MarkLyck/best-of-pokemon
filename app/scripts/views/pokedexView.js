import $ from 'jquery';
import Backbone from 'backbone';

import router from '../router';
import store from '../store';

const PokedexView = Backbone.View.extend({
  initialize: function() {
    this.$el.append($(`<div class="loader"></div>`));
    store.pokemons.data.fetch({success: () => {
      this.render()
      store.pokemons.fetching = false;
      this.$('.loader').hide();
      }
    })
  },
  id: 'pokedex-container',
  events: {

  },
  template: function() {
    return `
    <div class="filter-options">
      <dropdown>
        <input id="toggle1" type="checkbox">
        <label for="toggle1" class="animate">Filter by: <span id="filter-by-span">All</span><i class="fa fa-list float-right"></i></label>
        <ul class="animate">
          <li class="animate">All</li>
          <li class="animate">Bug</li>
          <li class="animate">Dark</li>
          <li class="animate">Dragon</li>
          <li class="animate">Electric</li>
          <li class="animate">Fairy</li>
          <li class="animate">Fighting</li>
          <li class="animate">Fire</li>
          <li class="animate">Flying</li>
          <li class="animate">Ghost</li>
          <li class="animate">Grass</li>
          <li class="animate">Ground</li>
          <li class="animate">Ice</li>
          <li class="animate">Normal</li>
          <li class="animate">Poison</li>
          <li class="animate">Psychic</li>
          <li class="animate">Rock</li>
          <li class="animate">Steel</li>
          <li class="animate">Water</li>
        </ul>
      </dropdown>
      <div id="search-container">
        <input id="pokemon-search-bar" type="text" placeholder="Search..."/>
        <button id="search-btn"><i class="fa fa-search" aria-hidden="true"></i></button>
      </div>
    </div>
    <ul id="pokedex-list">
    </ul>
    <button id="load-more-btn">Load more Pokemon</button>
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
              <h3 class="pokemon-name">${pokemon.get('name').capitalizeFirstLetter()}</h3>
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

      $pokemonLi.find('.like-btn').on('click',function() {
        $pokemonLi.find('.like-btn').toggleClass('liked')
      });

      $pokemonLi.on('click', function (e) {
        if (!$(e.target).hasClass('like-btn')) {
          router.navigate(`pokemon/${$pokemonLi.find('.pokemon-number').text()}`, {trigger:true});
        }
      });
    })
    return this
  }
})

export default PokedexView
