import Backbone from 'backbone';
import $ from 'jquery';
import _ from 'underscore';

import router from '../router';
import store from '../store';

const TrainerView = Backbone.View.extend({
  initialize: function() {
    store.users.data.on('update', () => {
      this.render();
    });
    store.users.data.on('remove', () => {
      this.render();
    });
    store.users.data.fetch();
  },
  id: 'trainerView',
  template: function() {
    return `
    <h1>Trainers</h1>
    <ul id="trainer-list">
    </ul>
    `;
  },
  render: function() {
    console.log('rendering');
    this.$el.html(this.template());
    store.users.data.sortByField('id');
    store.users.data.each((user) => {
      if (!user.get('profileImg')) {
        user.set("profileImg", "https\://rebekahlang.files.wordpress.com/2015/08/pokemon-egg-png.png");
      }
      let $userLi = $(`
        <li class="user-thumbnail">
          <div class="user-image" id="${user.get('id')}">
          </div>
          <h3>${user.get('username')}</h3>
        </li>
        `);
      this.$('#trainer-list').append($userLi);
      this.$(`#${user.get('id')}`).css('background-image', `url("${user.get('profileImg')}")`);
      $userLi.on('click', function(e) {
        router.navigate(`trainer/${user.get('id')}`, {trigger:true});
      });
    });
    return this;
  }
});

export default TrainerView;
