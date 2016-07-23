import Pokemons from './collections/Pokemons';
import Users from './collections/Users';
import Session from './models/Session';

let store = {
  pokemons: {
    fetching: false,
    data: new Pokemons()
  },
  session: new Session(),
  users: {
    data: new Users()
  }
}

export default store;
