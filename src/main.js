import Vue from 'vue'
import Router from 'vue-router'
import App from './App.vue'
import FeedsView from './components/Feeds.vue'
import PostView from './components/Post.vue'

Vue.use(Router)

var router = new Router()

router.map({
  '/feeds/': {
    name: 'feed',
    component: FeedsView
  },
  '/post/': {
    name: 'post',
    component: PostView
  }
})

router.beforeEach(function () {
  window.scrollTo(0, 0)
})

router.redirect({
  '*': '/feeds/'
})

router.start(App, '#app')
