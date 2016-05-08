<template>
  <div id="wrapper">
    <div class="grid">
      <div class="grid-sizer col-xs-6 col-md-4"></div>
      <div class="grid-item col-xs-6 col-md-4" v-for="feed in feeds">
        <div class="panel panel-default">
          <div class="panel-body">
            <img class="img-responsive img-rounded" v-bind:src="feed.photo">
            <span>{{ feed.msg }}</span>
          </div>
          <div class="panel-footer">
            <span>from {{ feed.user }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Firebase from 'firebase'
import Masonry from 'masonry-layout'
import ImagesLoaded from 'imagesloaded'
var grid = null
var msnry = null
export default {
  data () {
    return {
      feeds: []
    }
  },
  created () {
    var baseURL = 'https://wedwall.firebaseio.com/'
    var Feeds = new Firebase(baseURL + 'feeds')
    var feedApp = this
    Feeds.on('child_added', function (snapshot) {
      var feed = snapshot.val()
      feed.id = snapshot.key()
      feedApp.feeds.push(feed)
      feedApp.$nextTick(feedApp.relayout())
    })

    Feeds.on('child_changed', function (snapshot) {
      var newFeed = snapshot.val()
      var id = snapshot.key()
      feedApp.feeds.some(function (feed) {
        if (feed.id === id) {
          feedApp.feeds.$remove(feed)
          feedApp.feeds.push(newFeed)
          feedApp.$nextTick(feedApp.relayout())
          return true
        }
      })
    })

    Feeds.on('child_removed', function (snapshot) {
      var id = snapshot.key()
      feedApp.feeds.some(function (feed) {
        if (feed.id === id) {
          feedApp.feeds.$remove(feed)
          feedApp.$nextTick(feedApp.relayout())
          return true
        }
      })
    })
  },
  ready () {
    grid = document.querySelector('.grid')
    msnry = new Masonry(grid, {
      itemSelector: '.grid-item',
      columnWidth: '.grid-sizer',
      percentPosition: true
    })
    var imgLoaded = new ImagesLoaded(grid)
    imgLoaded.on('progress', function () {
      msnry.reloadItems()
    })
  },
  methods: {
    relayout: function () {
      msnry.reloadItems()
    }
  }
}
</script>

<style>
.grid {
  margin: 0 auto;
}
</style>
