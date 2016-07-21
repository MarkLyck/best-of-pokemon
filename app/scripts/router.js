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
    console.log('RENDER LOGIN');
    let loginView = new LoginView();
    let headerView = new HeaderView();
    $('#container').empty().append(headerView.render().$el).append(loginView.render().$el);
  },
  signup: function() {
    console.log('RENDER SIGNUP');
    let signupView = new SignupView();
    let headerView = new HeaderView();
    $('#container').empty().append(headerView.render().$el).append(signupView.render().$el);
  },
  pokedex: function() {
    let headerView = new HeaderView();
    let pokedexView = new PokedexView();
    $('#container').empty().append(headerView.render().$el).append(pokedexView.render().$el);
  },
  pokemon: function(id) {
    let headerView = new HeaderView();
    let pokemonView = new PokemonView(id);
    $('#container').empty().append(headerView.render().$el).append(pokemonView.render().$el);
  }
});

let router = new Router()

export default router
