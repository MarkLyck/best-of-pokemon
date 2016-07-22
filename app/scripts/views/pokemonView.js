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
    this.model.set('id', id)
    // this.model = store.pokemons.data.get(id)
    // this.model.on('change', () => this.render())
    // this.model.fetch()
  },
  events: {
    'click #goto-pokedex-btn' : 'gotoPokedex'
  },
  gotoPokedex: function() {
    router.navigate('', {trigger:true})
  },
  template: function() {
    return `
      <button id="goto-pokedex-btn"><i class="fa fa-arrow-left" aria-hidden="true"></i> Back</button>
      <section id="pokemon-info">
        <div id="pokemon-image"></div>
        <div id="main-info">
          <h1>${this.model.get('name')}</h1>
          <h3>Type: ${this.model.get('type')}</h3>
          <h3>Description: ${this.model.get('description')}</h3>
          <h4 id="pokemon-likes">0 <i class="fa fa-heart-o" aria-hidden="true"></i></h4>
        </div>
      </section>
      <section id="traits">
        <h4 id="pokemon-height">Height ${this.model.get('height')}</h4>
        <h4 id="pokemon-weight">Weight ${this.model.get('weight')}</h4>
        <ul id="pokemon-moves">

        </ul>
      </section>
      <section id="comment-section">
        <ul id="comments"></ul>
      </section>
    `
  },
  render: function() {
    console.log('RENDER');
    this.$el.html(this.template());
    let imageid = this.model.get('id')
    if (imageid < 10) {
      imageid = '00' + String(imageid)
    } else if (imageid < 100) {
      imageid = '0' + String(imageid)
    }

    this.$('#pokemon-image').css(`background-image`, `url('assets/images/pokemon/${imageid}.png')`)
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
