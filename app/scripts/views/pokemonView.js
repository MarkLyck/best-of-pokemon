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
    'click #goto-pokedex-btn'   : 'gotoPokedex',
    'click #goto-previous-btn'  : 'gotoPrev',
    'click #goto-next-btn'      : 'gotoNext'
  },
  gotoPokedex: function() {
    router.navigate('', {trigger:true})
  },
  gotoNext: function() {
    console.log(this.model.get('id'));
    router.navigate('pokemon/' + (Number(this.model.get('id')) + 1), {trigger:true})
  },
  gotoPrev: function() {
    console.log(this.model.get('id'));
    router.navigate('pokemon/' + (Number(this.model.get('id')) - 1), {trigger:true})
  },
  template: function() {
    return `
      <nav>
        <button id="goto-previous-btn"><i class="fa fa-arrow-left" aria-hidden="true"></i> Previous</button>
        <button id="goto-next-btn">Next <i class="fa fa-arrow-right" aria-hidden="true"></i></button>
      </nav>
      <section id="pokemon-info">
        <div id="pokemon-image">
        </div>
        <div id="main-info">
          <h1 id="pokemon-name">#${this.model.get('id')} - ${this.model.get('name')} <button id="like-btn">0</button></h1>
          <h3 id="types">Type: </h3>
          <h4 id="pokemon-height">Height ${this.model.get('height')}</h4>
          <h4 id="pokemon-weight">Weight ${this.model.get('weight')}</h4>
          <h3>Description: ${this.model.get('description')}</h3>
        </div>
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

    if (this.model.get('id') <= 1) {
      this.$('#goto-previous-btn').remove()
    } else if (this.model.get('id') >= 720) {
      this.$('#goto-next-btn').remove()
    }

    return this;
  }
})

export default PokemonView;
