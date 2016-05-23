<template>
  <div id="wrapper">
    <div class="wrapper">
      <div v-for="feed in feeds" v-show="feed.show" transition="fade">
        <div class="item" :class="[feed.itemStyle , {'resizeH': feed.photo.orientation.horizontal, 'resizeV': feed.photo.orientation.vertical}]">
          <div class="polaroid">
            <img class="bg" v-if="feed.photo.src" v-bind:src="feed.photo.src">
            <div class="caption">
              <p>&nbsp;</p>
            </div>
          </div>
        </div>
        <div class="note-wrap" :class="[feed.noteColor]">
          <p>{{ feed.msg }}</p>
          <div class="footer">
            <p> - {{ feed.user }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import $ from 'jquery'
import Firebase from 'firebase'
import Vue from 'vue'
Vue.transition('fade', {
  css: false,
  enter: function (el, done) {
    $(el)
      .css('opacity', 0)
      .animate({ opacity: 1 }, 1000, done)
  },
  enterCancelled: function (el) {
    $(el).stop()
  },
  leave: function (el, done) {
    $(el).animate({ opacity: 0 }, 1000, done)
  },
  leaveCancelled: function (el) {
    $(el).stop()
  }
})
export default {
  data () {
    return {
      feeds: [],
      newFeeds: [],
      noteColor: ['note-yellow', 'note-blue', 'note-green', 'note-pink'],
      itemStyle: ['itemStyle1', 'itemStyle2', 'itemStyle3', 'itemStyle4']
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
      feedApp.randomStyle(feed)
      feedApp.feeds.push(feed)
    })
    // For rest of the feeds after page loaded
    Feeds.limitToLast(1).on('child_added', function (snapshot) {
      var id = snapshot.key()
      console.log('Push to newFeeds')
      feedApp.feeds.some(function (feed) {
        if (feed.id === id) {
          feedApp.randomStyle(feed)
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
    },
    randomStyle (feed) {
      var rColor = Math.floor(Math.random() * this.noteColor.length)
      var rItem = Math.floor(Math.random() * this.itemStyle.length)
      feed.noteColor = this.noteColor[rColor]
      feed.itemStyle = this.itemStyle[rItem]
    }
  }
}
</script>

<style>
@import url('https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.5.1/animate.min.css');
* {
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
}
.wrapper {
  width: 100%;
  height: 100vh;
  padding: 0 2rem;
  text-align: center;
  line-height: 1.618em;
  background-color: #e4d4bb;
  background-image: repeating-radial-gradient(circle,
    #E4D4BB, #E7DAC6 50%, #E7DAC6 100%
  );
  background-size: 10px 10px;
}
.polaroid {
  background: #fff;
  padding: 1rem;
  box-shadow: 0 0.25rem 1rem rgba(0,0,0,0.2);
}
.caption {
  font-size: 1.125rem;
  text-align: center;
  line-height: 2em;
}
.resizeH img {
  max-width: 500px;
  height: auto;
}
.resizeV img {
  max-height: 500px;
  width: auto;
}
.item {
  display: inline-block;
  margin-top: 2rem;
}
.item .polaroid:before {
  content: '';
  position: absolute;
  z-index: -1;
  transition: all 0.35s;
}
.itemStyle1 {
  transform: scale(0.8, 0.8) rotate(5deg);
  transition: all 0.35s;
}
.itemStyle1 .polaroid:before {
  transform: rotate(6deg);
  height: 20%;
  width: 47%;
  bottom: 30px;
  right: 12px;
  box-shadow: 0 2.1rem 2rem rgba(0,0,0,0.4);
}
.itemStyle2 {
  transform: scale(0.8, 0.8) rotate(-5deg);
  transition: all 0.35s;
}
.itemStyle2 .polaroid:before {
  transform: rotate(-6deg);
  height: 20%;
  width: 47%;
  bottom: 30px;
  left: 12px;
  box-shadow: 0 2.1rem 2rem rgba(0,0,0,0.4);
}
.itemStyle3 {
  transform: scale(0.8, 0.8) rotate(3deg);
  transition: all 0.35s;
}
.itemStyle3 .polaroid:before {
  transform: rotate(4deg);
  height: 20%;
  width: 47%;
  bottom: 30px;
  right: 12px;
  box-shadow: 0 2.1rem 2rem rgba(0,0,0,0.3);
}
.itemStyle4 {
  transform: scale(0.8, 0.8) rotate(-3deg);
  transition: all 0.35s;
}
.itemStyle4 .polaroid:before {
  transform: rotate(-4deg);
  height: 20%;
  width: 47%;
  bottom: 30px;
  left: 12px;
  box-shadow: 0 2.1rem 2rem rgba(0,0,0,0.3);
}

/* Note styles */
.note-wrap {
  width: 350px;
  min-height: 235px;
  padding: 35px;
  margin: 0 22px 44px 22px;
  position: relative;
  font-size: 24px;
  vertical-align: top;
  display: inline-block;
  font-family: Englebert, Arial;
  color: #4b453c;
  background: #F7E999;
  line-height: 34px;
  text-align: center;
  box-shadow: 0 4px 5px rgba(0, 0, 0, 0.2);
  top: 5em;
}
.note-wrap:before {
  display: block;
  content: "";
  background: rgba(227, 200, 114, 0.4);
  width: 130px;
  height: 28px;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.2);
  border-radius: 6px/18px 0;
  position: absolute;
  top: -13px;
  left: 50px;
  -webkit-transform: rotate(-2deg);
  -moz-transform: rotate(-2deg);
  -o-transform: rotate(-2deg);
  -ms-transform: rotate(-2deg);
  transform: rotate(-2deg);
}

.note-yellow {
  background: #F7E999;
  -webkit-transform: rotate(2deg);
  -moz-transform: rotate(2deg);
  -o-transform: rotate(2deg);
  -ms-transform: rotate(2deg);
  transform: rotate(2deg);
}

.note-blue {
  background: #b9dcf4;
  -webkit-transform: rotate(-2deg);
  -moz-transform: rotate(-2deg);
  -o-transform: rotate(-2deg);
  -ms-transform: rotate(-2deg);
  transform: rotate(-2deg);
}

.note-pink {
  background: #FFBDA3;
  -webkit-transform: rotate(1deg);
  -moz-transform: rotate(1deg);
  -o-transform: rotate(1deg);
  -ms-transform: rotate(1deg);
  transform: rotate(1deg);
}

.note-green {
  background: #CAF4B9;
  -webkit-transform: rotate(-1deg);
  -moz-transform: rotate(-1deg);
  -o-transform: rotate(-1deg);
  -ms-transform: rotate(-1deg);
  transform: rotate(-1deg);
}

.footer {
  position: absolute;
  right: 30px;
  bottom: 0;
}
</style>
