import Backbone from 'backbone';

const Session = Backbone.Model.extend({
  defaults: {
    username: ''
  },
  login: function() {
    localStorage.authtoken = 1234;
  }
})

export default Session;
