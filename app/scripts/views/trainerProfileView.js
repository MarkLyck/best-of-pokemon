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
    this.model.on('update', () => {
      this.render();
    });
    store.users.data.fetch();
    if (!this.model.get('profileImg')) {
      this.model.set("profileImg", "https\://rebekahlang.files.wordpress.com/2015/08/pokemon-egg-png.png");
    }
    if (!this.model.get('description')) {
      this.model.set('description', 'Gotta catch \'em all!');
    }
  },
  id: 'trainer-profile',
  events: {
    'click #goto-trainerView': 'goToTrainers',
    'click #edit-profile' : 'editProfile',
    'click #change-image' : 'editImage',
    'click #submit-img-src'     : 'submitImage',
    'click #change-description': 'editDescription',
    'click #submit-description': 'submitDescription'
  },
  goToTrainers: function(e) {
    router.navigate('trainer', {trigger:true});
  },
  editProfile: function() {
    this.$('#edit-profile').remove();
    this.$('#trainer-image').append(`<button id="change-image">Change Image</button>`);
    this.$('#trainer-info').append(`<button id="change-description">Edit</button>`)
  },
  editImage: function() {
    this.$('#trainer-image').append(`<div id="img-src-form"><input type="text" name="img-src" id="img-src" /><button type="submit" id="submit-img-src">Submit</button></div>`);
  },
  submitImage: function(e) {
      this.model.save('profileImg', `${this.$('#img-src').val()}`);
      console.log(this.model.get('profileImg'));
      this.render();
  },
  editDescription: function() {
    this.$('#trainer-info').append(`<input type="text" id="new-description" value="${this.$('#description').text()}" /><button type="submit" id="submit-description">Submit</button>`);
    this.$('#description').hide();
    this.$('#change-description').hide();
  },
  submitDescription: function() {
    this.model.save('description', `${this.$('#new-description').val()}`);
    console.log(this.model.get('description'));
    this.$('#description').show();
    this.render();
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
        <p id="description">${this.model.get('description')}</p>
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
