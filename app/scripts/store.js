import Pokemons from './collections/Pokemons';
import Session from './models/Session';

let store = {
  pokemons: {
    fetching: false,
    data: new Pokemons()
  },
  session: new Session()
}

export default store;
