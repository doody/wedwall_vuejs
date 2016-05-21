import Vue from 'vue'
import Router from 'vue-router'
import App from './App.vue'
import FeedsView from './components/Feeds.vue'
import PostView from './components/Post.vue'
import CompleteView from './components/Complete.vue'
import AdminSlideUploadView from './components/AdminSlidesUpload.vue'
import SlidesView from './components/Slides.vue'

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
  },
  '/complete/': {
    name: 'complete',
    component: CompleteView
  },
  '/admin/slides/upload': {
    component: AdminSlideUploadView
  },
  '/slides/': {
    component: SlidesView
  }
})

router.beforeEach(function () {
  window.scrollTo(0, 0)
})

router.redirect({
  '*': '/post/'
})

router.start(App, '#app')
