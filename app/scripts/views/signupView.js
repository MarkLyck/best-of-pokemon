import $ from 'jquery'
import Backbone from 'backbone'

const SignupView = Backbone.View.extend({
  initialize: function() {

  },
  tagName: 'form',
  className: 'signup-form',
  template: function () {
    return `
    <h2>Sign Up</h2>
    <input type="text" name="username" id="username" />
    <input type="password" name="password" id="password" />
    <input type="submit" name="submit" />
    <a href="#login">Already have an account? <span>Login!</span></a>
    `;
  },
  events: {
    'submit': 'submit'
  },
  submit: function (e) {
    e.preventDefault();
    let username = $('#username').val();
    let password = $('#password').val();
    // let newUser = new UserMod();
    // userCollection.create({username:username, password: password, fullname: fullname}, {
    //   success: function () {
    //     console.log('success, you created a new user');
    //     router.navigate('pokedex', {trigger:true});
    //   }
    // });
    localStorage.authtoken = 1234;
  },
  render: function() {
    this.$el.html(this.template());
    return this;
  }
})

export default SignupView
