import $ from 'jquery'
import Backbone from 'backbone'

import router from '../router'
import store from '../store'

const TopPokemonView = Backbone.View.extend({
  initialize: function() {
    store.pokemons.data.on('update', () => {
      this.render()
    })
  },
  tagName: 'div',
  id: 'top-section',
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

    store.pokemons.topData.models = store.pokemons.data.models
    store.pokemons.topData.each(pokemon => {
      pokemon.set('likes', Math.round(Math.random()*100))
    })
    console.log(store.pokemons.topData);
    store.pokemons.topData.sortByField('id');
    store.pokemons.topData.models[24].set('likes', 998)
    store.pokemons.topData.models[6].set('likes', 932)
    store.pokemons.topData.models[3].set('likes', 874)
    store.pokemons.topData.models[243].set('likes', 812)
    store.pokemons.topData.models[248].set('likes', 797)
    store.pokemons.topData.models[150].set('likes', 793)
    store.pokemons.topData.models[0].set('likes', 623)
    store.pokemons.topData.models[38].set('likes', 524)
    store.pokemons.topData.models[149].set('likes', 321)
    store.pokemons.topData.models[242].set('likes', 179)


    store.pokemons.topData.sortByField('likes');
    store.pokemons.topData.models = store.pokemons.topData.models.reverse()


    while (counter <= 10) {
      let pokemon = store.pokemons.topData.models[counter-1]
      let $topLi = $(`
        <li class="pokemon-li">
          <div class="top">
              <p class="pokemon-fav">${pokemon.get('id')}</p>
          </div>
          <div class="bottom">
            <h3 class="pokemon-name">${pokemon.get('name').capitalizeFirstLetter()}</h3>
            <button class="like-btn"><span class="like-number">${pokemon.get('likes')}</span></button>
          </div>
        </li>
      `)
      let imageid = pokemon.get('id')
      if (imageid < 10) {
        imageid = '00' + String(imageid)
      } else if (imageid < 100) {
        imageid = '0' + String(imageid)
      }
      $topLi.find('.top').css('background-image', `url('assets/images/pokemon/${imageid}.png')`)

      $topLi.find('.like-btn').on('click',function() {
        if ($topLi.find('.like-btn').hasClass('liked')) {
          $topLi.find('.like-btn').text(Number($topLi.find('.like-btn').text()) - 1)
        } else {
          $topLi.find('.like-btn').text(Number($topLi.find('.like-btn').text()) + 1)
        }
        $topLi.find('.like-btn').toggleClass('liked')
      });

      $topLi.on('click', function (e) {
        console.log($(e.target));
        if (!$(e.target).hasClass('like-btn') && !$(e.target).hasClass('like-number')) {
          router.navigate(`pokemon/${pokemon.get('id')}`, {trigger:true});
        }
      });
      this.$('#top-list').append($topLi)
      counter++
    }

    return this
  }
})

export default TopPokemonView
