import $ from 'jquery'
import Backbone from 'backbone'

import router from './router'
import store from './store'

import Pokemons from './collections/Pokemons'

Backbone.history.start()

function CreatePokemonData(counter, max) {
  console.log('test');
  while (counter <= max) {
    $.ajax(`http://pokeapi.co/api/v2/pokemon/${counter}`).then(function(response) {
      console.log(response);
      let typesArr = []

      response.types.forEach(type => {
        typesArr.push(type.type.name)
      })
      // console.log('TypesArr: ', typesArr);
      let newPokemon = {
        _id: response.id,
        name: response.name,
        height: response.height,
        weight: response.weight,
        types:typesArr
      }
      console.log('PM: ', newPokemon);
      // Pokemons.create({})
    })
    counter++
  }
}

CreatePokemonData(1, 1)
