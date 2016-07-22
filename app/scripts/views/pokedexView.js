import $ from 'jquery';
import Backbone from 'backbone';

import router from '../router';
import store from '../store';


const PokedexView = Backbone.View.extend({
  initialize: function() {
    console.log('FETCHING POKEMON 1');
  },
  tagName: 'ul',
  id: 'pokedex-list',
  events: {

  },
  render: function() {
    console.log('RENDEING POKEDEX');
    let counter = 1;
    while (counter <= 100) {
      let $pokemonLi = $(`
        <li>
          <div class="top">
            <p class="pokemon-number">${counter}</p>
          </div>
          <div class="bottom">
            <h3 class="pokemon-name">Name</h3>
            <button class="like-btn"><i class="fa fa-heart-o" aria-hidden="true"></i></button>
          </div>
        </li>
        `);
      // console.log(`https://pokeapi.co/api/v2/pokemon/${counter}`);
      // $.ajax({
      //   url: `https://pokeapi.co/api/v2/pokemon/${counter}`,
      //   success: (response) => {
      //     // console.log(respon se);
      //     // console.log(response.name);
      //     // console.log(response.types.type.name);
      //     // response.types.forEach(type => {
      //     //   console.log(type.type.name);
      //     //   $pokemonLi.find('.top').addClass(type.type.name)
      //     // })
      //     $pokemonLi.find('.pokemon-name').text(response.name);
      //   }
      // });
      let fixedNumber = counter

      if (counter < 10) {
        fixedNumber = '00' + String(fixedNumber)
      } else if (counter < 100) {
        fixedNumber = '0' + String(fixedNumber)
      }

      $pokemonLi.find('.top').css('background-image', `url('assets/images/pokemon/${fixedNumber}.png')`);
      this.$el.append($pokemonLi);
      $pokemonLi.on('click', function () {
        router.navigate(`pokemon/${$pokemonLi.find('.pokemon-number').text()}`, {trigger:true});
      });
      counter++
    }
    return this
  }
})

export default PokedexView
