import $ from 'jquery'
import Backbone from 'backbone'
import moment from 'moment'

import router from '../router'
import store from '../store'

import Pokemon from '../models/Pokemon'
import Comments from '../collections/Comments'

const PokemonView = Backbone.View.extend({
  id: 'pokemonView',
  initialize: function(id) {
    if (!store.pokemons.data.get(id)) {
      store.pokemons.data.add({id: id})
    }
    this.model = store.pokemons.data.get(id)
    if (!this.model.get('likes')) {
      this.model.set('likes', Math.round(Math.random() * 100))
    }
    this.model.on('change', () => this.render())
    this.model.fetch()

    store.comments.data.reset()

    // This needs to fetch comments, but backend is not ready.
    store.comments.data.add({
      id: 1234,
      username: 'Rob',
      body: 'This is a test comment',
      timestamp: new Date(),
    })
    store.comments.data.on('change', () => {
      this.render()
    })
    store.comments.data.on('update', () => {
      this.render()
    })
  },
  events: {
    'click #goto-pokedex-btn'   : 'gotoPokedex',
    'click #goto-previous-btn'  : 'gotoPrev',
    'click #goto-next-btn'      : 'gotoNext',
    'click .like-btn'           : 'likePokemon',
    'click .pokemon-favorite'   : 'favoritePokemon',
    'click #new-comment'        : 'postComment'
  },
  gotoPokedex: function() {
    router.navigate('', {trigger:true})
  },
  gotoNext: function() {
    console.log(this.model.get('id'));
    router.navigate('pokemon/' + (Number(this.model.get('id')) + 1), {trigger:true})
  },
  gotoPrev: function() {
    console.log(this.model.get('id'));
    router.navigate('pokemon/' + (Number(this.model.get('id')) - 1), {trigger:true})
  },
  likePokemon: function() {
    if (this.$('.like-btn').hasClass('liked')) {
      this.$('.like-btn').text(Number(this.$('.like-btn').text()) - 1)
    } else {
      this.$('.like-btn').text(Number(this.$('.like-btn').text()) + 1)
    }
    this.$('.like-btn').toggleClass('liked')
  },
  favoritePokemon: function() {
    store.session.save({
      favorite: this.model.get('id')
    })
    localStorage.favorite = this.model.get('id')
    this.$('.pokemon-favorite').addClass('favorited')
  },
  postComment: function() {
    console.log('TEST');
    store.comments.data.add({
      id: Math.round(Math.random() * 10000),
      username: store.session.get('username'),
      body: this.$('#comment-area').val(),
      timestamp: new Date(),
    })
  },
  template: function() {
    return `
      <nav>
        <button id="goto-previous-btn"><i class="fa fa-arrow-left" aria-hidden="true"></i> Previous</button>
        <button id="goto-next-btn">Next <i class="fa fa-arrow-right" aria-hidden="true"></i></button>
      </nav>
      <section id="pokemon-info">
        <div id="pokemon-image">
        </div>
        <div id="main-info">
          <h1 id="pokemon-name">#${this.model.get('id')} - ${this.model.get('name')} <button class="like-btn">${this.model.get('likes')}</button></h1>
          <button class="pokemon-favorite">Favorite</button>
          <h3 id="types">Type: </h3>
          <h4 id="pokemon-height">Height: ${this.model.get('height')}</h4>
          <h4 id="pokemon-weight">Weight: ${this.model.get('weight')}</h4>
        </div>
      </section>
      <section id="comment-section">
        <h2>Comments</h2>
        <ul id="comments">

        </ul>
        <div id="input-wrapper">
          <textarea id="comment-area" placeholder="Comment"></textarea>
          <input id="new-comment" type="submit" value="Comment">
        </div>
      </section>
    `
  },
  render: function() {
    this.$el.html(this.template());
    let imageid = this.model.get('id')
    if (imageid < 10) {
      imageid = '00' + String(imageid)
    } else if (imageid < 100) {
      imageid = '0' + String(imageid)
    }
    this.$('#pokemon-image').css(`background-image`, `url('assets/images/pokemon/${imageid}.png')`)

    let typesArr = this.model.get('types').split(' ')
    typesArr.forEach(type => {
      let $typeSpan = $(`<span class="${type}">${type} </span>`)
      this.$('#types').append($typeSpan)
    })

    if (store.session.get('favorite') === String(this.model.get('id'))) {
      this.$('.pokemon-favorite').addClass('favorited')
    }

    if (this.model.get('id') <= 1) {
      this.$('#goto-previous-btn').remove()
    } else if (this.model.get('id') >= 720) {
      this.$('#goto-next-btn').remove()
    }

    store.comments.data.each(comment => {
      let $commentLi = $(`
        <li class="comment">
          <div class="wrapper">
            <h4 class="comment-user">${comment.get('username')}</h4>
            <p class="comment-timestamp">${moment(comment.get('timestamp')).format('MMM DD YYYY')}</p>
          </div>
          <p class="comment-body">${comment.get('body')}<p>
          <div class="manage-comment">

          </div>
        </li>
      `)
      if (store.session.get('username') === comment.get('username')) {
        let $editBtn = $(`<button class="edit-comment-btn"><i class="fa fa-pencil-square-o" aria-hidden="true"></i></button.`)
        let $delBtn = $(`<button class="del-comment-btn"><i class="fa fa-trash-o" aria-hidden="true"></i></button.`)
        $commentLi.find('.manage-comment').append($editBtn).append($delBtn)
      }

      $commentLi.find('.del-comment-btn').on('click', function() {
        console.log('DESTROY!');
        let commentEditing = store.comments.data.get(comment.get('id'))
        commentEditing.destroy()
        $commentLi.remove()
      })
      $commentLi.find('.edit-comment-btn').on('click', function() {
        let $editComment = $(`
          <div id="input-wrapper">
            <textarea class="edit-comment-textarea" value="${comment.get('body')}"></textarea>
            <button class="edit-comment-submit"><i class="fa fa-pencil" aria-hidden="true"></i> Edit</button>
          </div>
        `)
        $commentLi.after($editComment)
        $commentLi.remove()
        $editComment.find('.edit-comment-submit').on('click', function() {
          console.log('clicked edit');
          let commentEditing = store.comments.data.get(comment.get('id'))
          commentEditing.set({
            body: $editComment.find('.edit-comment-textarea').val(),
            timestamp: new Date()
          })
          // commentEditing.save({
          //   body: $editComment.find('.edit-comment-textarea').val(),
          //   timestamp: new Date()
          // })
        })
      })
      this.$('#comments').append($commentLi)
    })

    return this;
  }
})

export default PokemonView;
