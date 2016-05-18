<template>
  <div id="wrapper">
    <div v-for="feed in feeds" v-show="feed.show" transition="fade">
      <div class="widget bottom">
        <div class="text bottom">
          <h1>{{ feed.user }} 說:</h1>
          <p>{{ feed.msg }}</p>
        </div>
        <div class="blur">
          <img class="bg" v-if="feed.photo" v-bind:src="feed.photo" v-bind:class="{ 'rotate90': feed.photoRotation.rotate90, 'rotate180': feed.photoRotation.rotate180, 'rotate270': feed.photoRotation.rotate270 }">
        </div>
        <img class="bg" v-if="feed.photo" v-bind:src="feed.photo" v-bind:src="feed.photo" v-bind:class="{ 'rotate90': feed.photoRotation.rotate90, 'rotate180': feed.photoRotation.rotate180, 'rotate270': feed.photoRotation.rotate270 }">
      </div>
    </div>
    <svg version="1.1" xmlns="http://www.w3.org/2000/svg">
      <filter id="blur">
        <feGaussianBlur stdDeviation="10" />
      </filter>
    </svg>
  </div>
</template>

<script>
import Firebase from 'firebase'
require('vue-animate/dist/vue-animate.css')
export default {
  data () {
    return {
      feeds: [],
      newFeeds: []
    }
  },
  created () {
    var baseURL = 'https://wedwall.firebaseio.com/'
    var Feeds = new Firebase(baseURL + 'feeds')
    var feedApp = this
    // For first fetch only, no need to push to newFeeds
    Feeds.on('child_added', function (snapshot) {
      var feed = snapshot.val()
      feed.id = snapshot.key()
      feed.show = false
      console.log('Push to feeds')
      feedApp.feeds.push(feed)
    })
    // For rest of the feeds after page loaded
    Feeds.limitToLast(1).on('child_added', function (snapshot) {
      var id = snapshot.key()
      console.log('Push to newFeeds')
      feedApp.feeds.some(function (feed) {
        if (feed.id === id) {
          feedApp.newFeeds.push(feed)
          return true
        }
      })
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
      console.log('RandomIndex: ' + randomIndex)
      var feed = this.feeds[randomIndex]
      if (this.newFeeds.length !== 0) {
        console.log('NewFeeds')
        feed = this.newFeeds.shift()
      }
      this.turnOn(feed)
      setTimeout(this.turnOff, 10000, feed)
      console.log(feed.photo)
    },
    turnOn (feed) {
      feed.show = true
    },
    turnOff (feed) {
      feed.show = false
    }
  }
}
</script>

<style>
img.bg {
  position: fixed;
  top: 54px;
  left: 0;
  z-index: -2;
  image-orientation: 0deg;
  max-width: 100%;
  max-height: 100%;
}

.blur {
  height: 200px;
  width: 100%;
  margin: -20px auto;
  z-index: -1;
  position: relative;
  filter: blur(10px);
  -webkit-filter: blur(10px);
  -moz-filter: blur(10px);
  -o-filter: blur(10px);
  -ms-filter: blur(10px);
  filter: url(#blur);
  filter: progid: DXImageTransform.Microsoft.Blur(PixelRadius='10');
  overflow: hidden;
}

.blur:after {
  content: '';
  height: 150%;
  width: 100%;
  background: rgba(255, 255, 255, .2);
  position: absolute;
}

.widget {
  border-top: 2px solid white;
  border-bottom: 2px solid white;
  height: 150px;
  width: 100%;
  overflow: hidden;
}

.bottom {
  position: absolute;
  margin: auto auto 80px auto;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
}

.text {
  height: 150px;
  width: 70%;
}

.text.bottom {
  position: absolute;
  margin: auto;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
}

.text h1 {
  text-align: left;
  text-shadow: 1px 1px rgba(0, 0, 0, .1);
  color: #ffffff;
  margin-top: 2.5%;
  font-family: 'cwTeXHei', sans-serif;
  font-weight: 700;
  font-size: 1.5em;
}

.text p {
  text-align: center;
  color: #ffffff;
  text-shadow: 1px 1px rgba(0, 0, 0, .1);
  margin-top: 0px;
  font-family: 'cwTeXHei', sans-serif;
  font-weight: 500;
  font-size: 2.5em;
}

.rotate90 {
    -webkit-transform: rotate(90deg);
    -moz-transform: rotate(90deg);
    -o-transform: rotate(90deg);
    -ms-transform: rotate(90deg);
    transform: rotate(90deg);
}

.rotate180 {
    -webkit-transform: rotate(180deg);
    -moz-transform: rotate(180deg);
    -o-transform: rotate(180deg);
    -ms-transform: rotate(180deg);
    transform: rotate(180deg);
}

.rotate270 {
    -webkit-transform: rotate(270deg);
    -moz-transform: rotate(270deg);
    -o-transform: rotate(270deg);
    -ms-transform: rotate(270deg);
    transform: rotate(270deg);
}

@media (max-width: 33.9em) {
    .blur {
      height: 150px;
    }

    .widget {
      height: 100px;
    }

    .text {
      height: 100px;
      width: 100%;
    }

    .text h1 {
      font-size: 1em;
    }

    .text p {
      font-size: 2em;
    }
}
</style>
