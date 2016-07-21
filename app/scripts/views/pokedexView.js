import $ from 'jquery'
import Backbone from 'backbone'
import router from '../router';

const PokedexView = Backbone.View.extend({
  initialize: function() {

  },
  tagName: 'ul',
  id: 'pokedex-list',
  events: {

  },
  render: function() {
    let counter = 1;
    while (counter <= 720) {
      let $pokemonLi = $(`
        <li>
          <p class="pokemon-number">${counter}</p>
          <div class="wrapper">
            <h3 class="pokemon-name">Name</h3>
            <button class="like-btn"><i class="fa fa-heart-o" aria-hidden="true"></i></button>
          </div>
        </li>
        `);
      let fixedNumber = counter

      if (counter < 10) {
        fixedNumber = '00' + String(fixedNumber)
      } else if (counter < 100) {
        fixedNumber = '0' + String(fixedNumber)
      }

      $pokemonLi.css('background-image', `url('assets/images/pokemon/${fixedNumber}.png')`);
      this.$el.append($pokemonLi);
      counter++
      $pokemonLi.on('click', function () {
        console.log('you clicked on a pokemon!');
        router.navigate(`pokemon/${counter}`, {trigger:true});
      });
    }
    return this
  }
})

export default PokedexView
