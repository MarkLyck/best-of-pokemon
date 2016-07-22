import $ from 'jquery'
import Backbone from 'backbone'

import store from './store'

import HeaderView from './views/headerView'
import LoginView from './views/loginView'
import SignupView from './views/signupView'
import PokedexView from './views/pokedexView'
import PokemonView from './views/pokemonView'
import TopPokemonView from './views/TopPokemonView'

const Router = Backbone.Router.extend({
  routes: {
    pokedex       : 'pokedex',
    'pokemon/:id' : 'pokemon',
    '/*'          : 'pokedex'
  },
  pokedex: function() {
    let headerView = new HeaderView();
    let pokedexView = new PokedexView();
    let topPokemonView = new TopPokemonView()
    $('#container').empty().append(headerView.render().$el).append(topPokemonView.render().$el).append(pokedexView.$el);
  },
  pokemon: function(id) {
    let headerView = new HeaderView();
    let pokemonView = new PokemonView(id);
    $('#container').empty().append(headerView.render().$el).append(pokemonView.render().$el);
  }
});

let router = new Router()

export default router
