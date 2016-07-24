import Backbone from 'backbone';
import _ from 'underscore';
import $ from 'jquery';
import moment from 'moment';

import router from '../router';
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
    if (!this.model.get('profileImg')) {
      this.model.set("profileImg", "https\://rebekahlang.files.wordpress.com/2015/08/pokemon-egg-png.png");
    }
  },
  id: 'trainer-profile',
  events: {
    'click #goto-trainerView': 'goToTrainers',
    'click #edit-profile' : 'editProfile',
    'click #change-image' : 'editImage',
    'keyup #img-src'     : 'submitImage'
  },
  goToTrainers: function(e) {
    router.navigate('trainer', {trigger:true});
  },
  editProfile: function() {
    this.$('#trainer-image').append(`<button id="change-image">Change Image</button>`);
  },
  editImage: function() {
    this.$('#trainer-image').append(`<input type="text" name="img-src" id="img-src" />`);
  },
  submitImage: function(e) {
    if (e.which === 13) {
      this.model.save('profileImg', `${this.$('#img-src').val()}`);
      console.log(this.model.get('profileImg'));
    }
  },
  template: function() {
    console.log(this.model);
    return `
    <section id="trainer-wrapper">
      <button id="goto-trainerView"><i class="fa fa-arrow-left" aria-hidden="true"></i>Back</button>
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
    this.$('#trainer-image').css('background-image', `url("${this.model.get('profileImg')}")`)
    if (localStorage.username === this.model.get('username')) {
      this.$('#trainer-info').prepend(`<button id="edit-profile">Edit Profile</button`);
    }
    return this;
  }
});

export default TrainerProfileView;
