<template>
  <div id="wrapper">
    <div class="card-columns">
      <div class="card" v-for="feed in feeds" transition>
        <img v-if="feed.photo" class="card-img-top img-fluid" v-bind:src="feed.photo" alt="Card image cap">
        <div class="card-block">
          <p class="card-text">{{ feed.msg }}</p>
        </div>
        <div class="card-footer text-xs-right">
          <small class="text-muted">
            <cite title="Source Title">from</cite> {{ feed.user }}
          </small>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Firebase from 'firebase'
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
  }
}
</script>

<style>
</style>
