import Pokemons from './collections/Pokemons';
import Users from './collections/Users';
import Session from './models/Session';
import Comments from './collections/Comments'

let store = {
  pokemons: {
    fetching: false,
    data: new Pokemons(),
    filteredData: new Pokemons(),
    topData: new Pokemons()
  },
  session: new Session(),
  users: {
    data: new Users()
  },
  comments: {
    data: new Comments()
  }
}

export default store;
