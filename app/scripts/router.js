import $ from 'jquery'
import Backbone from 'backbone'

import store from './store'

import HeaderView from './views/headerView'
import LoginView from './views/loginView'
import SignupView from './views/signupView'
import PokedexView from './views/pokedexView'
import PokemonView from './views/pokemonView'
import TopPokemonView from './views/topPokemonView'
import MissingView from './views/404View'

const Router = Backbone.Router.extend({
  routes: {
    pokedex       : 'pokedex',
    'pokemon/:id' : 'pokemon',
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
  missing: function() {
    let missingView = new MissingView()
    $('#container').empty().append(missingView.render().$el);
  }
});

let router = new Router()

export default router
