import Backbone from 'backbone';
import _ from 'underscore';
import $ from 'jquery';

const TrainerProfileView = Backbone.View.extend({
  id: 'trainer-profile',
  template: function() {
    let username = location.hash.slice(9);
    let model = _.find(store.users.data, function(user) {
      return user.username === username;
    });
    return `
    <section id="trainer-wrapper">
      <div id="trainer-image">
      </div>
      <div id="trainer-info">
        <h1 id="trainer-username">${model.get('username')}</h1>
      </div>
    </section>
    `;
  },
  render: function() {
    this.$el.html(this.template());
    return this;
  }
});
