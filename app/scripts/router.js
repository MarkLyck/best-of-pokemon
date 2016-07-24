import $ from 'jquery'
import Backbone from 'backbone'

import store from './store'

import HeaderView from './views/headerView'
import LoginView from './views/loginView'
import SignupView from './views/signupView'
import PokedexView from './views/pokedexView'
import PokemonView from './views/pokemonView'
import TopPokemonView from './views/topPokemonView'
import TrainerView from './views/trainerView';
import TrainerProfileView from './views/trainerProfileView';
import MissingView from './views/404View'

const Router = Backbone.Router.extend({
  routes: {
    pokedex       : 'pokedex',
    'pokemon/:id' : 'pokemon',
    'trainer'     : 'trainer',
    'trainer/:id' : 'trainerProfile',
    '/*'          : 'pokedex',
    '404'         : 'missing'
  },
  pokedex: function() {
    let headerView = new HeaderView();
    let pokedexView = new PokedexView();
    let topPokemonView = new TopPokemonView()
    store.pokemons.fetching = true;
    $('#container').empty().append(headerView.render().$el).append(topPokemonView.$el).append(pokedexView.$el);
  },
  pokemon: function(id) {
    if (id < 721 && id > 0) {
      let headerView = new HeaderView();
      let pokemonView = new PokemonView(id);
      $('#container').empty().append(headerView.render().$el).append(pokemonView.render().$el);
    } else {
      router.navigate('404', {trigger:true})
    }
  },
  trainer: function() {
    let headerView = new HeaderView();
    let trainerView = new TrainerView();
    $('#container').empty().append(headerView.render().$el).append(trainerView.render().$el);
  },
  trainerProfile: function(id) {
    let headerView = new HeaderView();
    let trainerProfileView = new TrainerProfileView(id);
    $('#container').empty().append(headerView.render().$el).append(trainerProfileView.render().$el);
  },
  missing: function() {
    let missingView = new MissingView()
    $('#container').empty().append(missingView.render().$el);
  }
});

let router = new Router()

export default router
