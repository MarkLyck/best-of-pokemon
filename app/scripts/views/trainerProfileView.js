import Backbone from 'backbone';
import _ from 'underscore';
import $ from 'jquery';
import moment from 'moment';

import store from '../store';

const TrainerProfileView = Backbone.View.extend({
  initialize: function(id) {
    if (!store.users.data.get(id)) {
      store.users.data.add({id: id})
    }
    this.model = store.users.data.get(id);
    this.model.on('change', () => {
      this.render();
    });
    store.users.data.fetch();
  },
  id: 'trainer-profile',
  template: function() {
    console.log(this.model);
    return `
    <section id="trainer-wrapper">
      <div id="trainer-image">
      </div>
      <div id="trainer-info">
        <h1 id="trainer-username">${this.model.get('username')}</h1>
        <h3>Member since: ${moment(this.model.get('created_at')).format('MMM DD, YYYY')}</h3>
      </div>
    </section>
    `;
  },
  render: function() {
    this.$el.html(this.template());
    return this;
  }
});

export default TrainerProfileView;
