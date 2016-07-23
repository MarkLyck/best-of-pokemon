import $ from 'jquery'
import Backbone from 'backbone'

import router from '../router'
import store from '../store'

import Pokemon from '../models/Pokemon'

const PokemonView = Backbone.View.extend({
  id: 'pokemonView',
  initialize: function(id) {
    if (!store.pokemons.data.get(id)) {
      store.pokemons.data.add({id: id})
    }
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
      <button id="goto-pokedex-btn"><i class="fa fa-arrow-left" aria-hidden="true"></i> Back</button>
      <section id="pokemon-info">
        <div id="pokemon-image"></div>
        <div id="main-info">
          <h1>${this.model.get('name')}</h1>
          <h3 id="types">Type: </h3>
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
        <h2>Comments</h2>
        <ul id="comments">
          <li class="comment">
            <p class="comment-body">This is a test comment<p>
          </li>
        </ul>
        <div id="input-wrapper">
          <textarea placeholder="Comment"></textarea>
          <input type="submit" value="Comment">
        </div>
      </section>
    `
  },
  render: function() {
    this.$el.html(this.template());
    let imageid = this.model.get('id')
    if (imageid < 10) {
      imageid = '00' + String(imageid)
    } else if (imageid < 100) {
      imageid = '0' + String(imageid)
    }

    this.$('#pokemon-image').css(`background-image`, `url('assets/images/pokemon/${imageid}.png')`)

    let typesArr = this.model.get('types').split(' ')
    typesArr.forEach(type => {
      let $typeSpan = $(`<span class="${type}">${type} </span>`)
      this.$('#types').append($typeSpan)
    })
    return this;
  }
})

export default PokemonView;
