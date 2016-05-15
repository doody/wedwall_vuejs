<template>
  <div id="wrapper">
    <div id="gallery">
      <div v-for="feed in feeds">
        <div v-show="feed.show" transition="fade">
          <img class="img-fluid" v-if="feed.photo" v-bind:src="feed.photo">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Firebase from 'firebase'
require('vue-animate/dist/vue-animate.css')
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
      console.log('test')
      var feed = snapshot.val()
      feed.id = snapshot.key()
      feed.show = false
      feedApp.feeds.push(feed)
    })

    Feeds.on('child_changed', function (snapshot) {
      var newFeed = snapshot.val()
      var id = snapshot.key()
      feedApp.feeds.some(function (feed) {
        if (feed.id === id) {
          feedApp.feeds.$remove(feed)
          feedApp.feeds.push(newFeed)
          return true
        }
      })
    })

    Feeds.on('child_removed', function (snapshot) {
      var id = snapshot.key()
      feedApp.feeds.some(function (feed) {
        if (feed.id === id) {
          feedApp.feeds.$remove(feed)
          return true
        }
      })
    })
  },
  ready () {
    setInterval(this.randomShow, 13000)
  },
  methods: {
    randomShow () {
      var randomIndex = Math.floor(Math.random() * this.feeds.length)
      var feed = this.feeds[randomIndex]
      this.turnOn(feed)
      setTimeout(this.turnOff, 10000, feed)
      console.log(feed.photo)
      console.log('RandomIndex: ' + randomIndex)
    },
    turnOn (feed) {
      feed.show = true
    },
    turnOff (feed) {
      feed.show = false
    }
  },
  computed: {
    backgroundStyle: function () {
      return {
        'background-image': 'url("' + this.bgimage + '")',
        'width': '500px',
        'height': '500px'
      }
    }
  }
}
</script>

<style>
</style>
