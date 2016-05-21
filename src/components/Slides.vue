<template>
  <div id="wrapper">
    <div id="slides"></div>
  </div>
</template>

<script>
import $ from 'jquery'
import Firebase from 'firebase'
require('vegas')
export default {
  ready () {
    var baseURL = 'https://wedwall.firebaseio.com/'
    var Slides = new Firebase(baseURL + 'slides')

    Slides.once('value', function (snapshot) {
      var data = snapshot.val()
      var slides = []
      for (var key in data) {
        var slide = data[key]
        slide.id = key
        slides.push(slide)
      }
      $('#slides').vegas({
        preload: true,
        delay: 10000,
        transitionDuration: 3000,
        slides: slides
      })
    })

    Slides.limitToLast(1).on('child_added', function (snapshot) {
      var photo = snapshot.val()
      photo.id = snapshot.key()
      var slides = $('#slides').vegas('options', 'slides')
      slides.push(photo)
      $('#slides').vegas('options', 'slides', slides)
    })

    Slides.on('child_removed', function (snapshot) {
      var id = snapshot.key()
      var slides = $('#slides').vegas('options', 'slides')
      for (var i = 0; i < slides.length; i++) {
        if (slides[i].id === id) {
          slides.splice(i, 1)
        }
      }
      $('#slides').vegas('options', 'slides', slides)
    })
  }
}
</script>

<style>
#slides {
  position: absolute;
  bottom: 0;
  top: 0;
  left: 0;
  right: 0;
}
</style>