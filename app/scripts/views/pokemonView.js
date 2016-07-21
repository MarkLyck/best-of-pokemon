import $ from 'jquery'
import Backbone from 'backbone'

import router from '../router'
import store from '../store'

import Pokemon from '../models/Pokemon'

const PokemonView = Backbone.View.extend({
  id: 'pokemonView',
  initialize: function(id) {
    console.log(id);
    if (!store.pokemons.data.get(id)) {
      store.pokemons.data.add({_id: id})
    }
    this.model = new Pokemon()
    this.model = store.pokemons.data.get(id)
    this.model.on('change', () => this.render())
    this.model.fetch()
  },
  events: {
    'click #goto-pokedex-btn' : 'gotoPokedex'
  },
  gotoPokedex: function() {
    router.navigate('', {trigger:true})
  },
  template: function() {
    return `
      <button id="goto-pokedex-btn">Back</button>
      <div class="wrapper">
        <section class="main">
          <div id="pokemon-image"></div>
          <div id="main-info">
            <h1>${this.model.get('name')}</h1>
            <h3>Type: ${this.model.get('type')}</h3>
            <h3>Description: ${this.model.get('description')}</h3>
          </div>
        </section>
      </div>
      <section id="traits">
        <h3 id="pokemon-height">Height ${this.model.get('height')}</h3>
        <h3 id="pokemon-weight">Weight ${this.model.get('weight')}</h3>
        <ul id="pokemon-moves">

        </ul>
      </section>
    `
  },
  render: function() {
    console.log('RENDER');
    this.$el.html(this.template());
    this.$('#pokemon-image').css(`background`, `url('assets/images/pokemon1.jpg')`)
    this.model.get('moves').forEach((move) => {
      let $moveLi = $(`
        <li>
          <h3>${move}</h3>
        </li>`);
        this.$('#pokemon-moves').append($moveLi);
    });
    return this;
  }
})

export default PokemonView;
