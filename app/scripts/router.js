import $ from 'jquery'
import Backbone from 'backbone'

import store from './store'

import HeaderView from './views/headerView'
import LoginView from './views/loginView'
import SignupView from './views/signupView'
import PokedexView from './views/pokedexView'
import PokemonView from './views/pokemonView'

const Router = Backbone.Router.extend({
  routes: {
    login         : 'login',
    signup        : 'signup',
    pokedex       : 'pokedex',
    'pokemon/:id' : 'pokemon',
    '/*'          : 'pokedex'
  },
  login: function() {
    let loginView = new LoginView();
    $('#container').empty().append(loginView.render().$el);
  },
  signup: function() {
    let signupView = new SignupView();
    $('#container').empty().append(signupView.render().$el);
  },
  pokedex: function() {},
  pokemon: function(id) {}
});

let router = new Router()

export default router
