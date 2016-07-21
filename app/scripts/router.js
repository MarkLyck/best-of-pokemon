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
    let headerView = new HeaderView()
    $('#container').empty().append(headerView.render().$el).append(loginView.render().$el);
  },
  signup: function() {
    let signupView = new SignupView();
    let headerView = new HeaderView()
    $('#container').empty().append(headerView.render().$el).append(signupView.render().$el);
  },
  pokedex: function() {
    let headerView = new HeaderView()
    $('#container').empty().append(headerView.render().$el)
  },
  pokemon: function(id) {
    let headerView = new HeaderView()
    $('#container').empty().append(headerView.render().$el)
  }
});

let router = new Router()

export default router
