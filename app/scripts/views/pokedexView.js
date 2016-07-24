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
        <ul class="animate type-list">
          <li class="animate type">All</li>
          <li class="animate type">Bug</li>
          <li class="animate type">Dark</li>
          <li class="animate type">Dragon</li>
          <li class="animate type">Electric</li>
          <li class="animate type">Fairy</li>
          <li class="animate type">Fighting</li>
          <li class="animate type">Fire</li>
          <li class="animate type">Flying</li>
          <li class="animate type">Ghost</li>
          <li class="animate type">Grass</li>
          <li class="animate type">Ground</li>
          <li class="animate type">Ice</li>
          <li class="animate type">Normal</li>
          <li class="animate type">Poison</li>
          <li class="animate type">Psychic</li>
          <li class="animate type">Rock</li>
          <li class="animate type">Steel</li>
          <li class="animate type">Water</li>
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
    this.$('.type').on('click', (e) => {
      this.$('#filter-by-span').text($(e.target).text());
      // console.log($(e.target));
    })
    return this
  }
})

export default PokedexView
