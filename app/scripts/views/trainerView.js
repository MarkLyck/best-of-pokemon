import Backbone from 'backbone';
import $ from 'jquery';

import store from '../store';

const TrainerView = Backbone.View.extend({
  initialize: function() {
    store.users.data.on('add', this.render);
    store.users.data.fetch();
  },
  id: 'trainerView',
  template: function() {
    return `
    <ul id="trainer-list"></ul>
    `;
  },
  render: function() {
    store.users.data.each((user) => {
      let $userLi = $(`
        <li class="user-thumbnail">
          <h3>${user.get('username')}</h3>
        </li>
        `);
      this.$el.append($userLi);
    });
    this.$el.html(this.template());
    this.$('.user-thumbnail').on('click', function(e) {
      let username = $('e.target').children('h3').val();
      router.navigate(`trainer/${username}`, {trigger:true});
    });
    return this;
  }
});

export default TrainerView;
