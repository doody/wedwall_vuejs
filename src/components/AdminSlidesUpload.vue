<template>
  <div id="wrapper">
    <div class="container-fluid">
      <div class="row">
        <button type="button" class="btn btn-primary btn-lg btn-block" v-on:click.prevent="uploadPhoto">Upload slides</button>
      </div>
      <hr class="m-y-2">
      <div class="card" v-for="(index, photo) in photos">
        <img class="card-img-top img-fluid" v-bind:src="photo.photo.src">
        <div class="card-block">
          <button type="button" v-on:click.prevent="removePhoto(photo)">Remove</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Firebase from 'firebase'
import Filepicker from 'filepicker-js'
export default {
  data () {
    return {
      photos: []
    }
  },
  ready () {
    var baseURL = 'https://wedwall.firebaseio.com/'
    var Slides = new Firebase(baseURL + 'slides')
    var slideApp = this
    Slides.on('child_added', function (snapshot) {
      var photo = snapshot.val()
      photo.id = snapshot.key()
      slideApp.photos.push(photo)
    })

    Slides.on('child_removed', function (snapshot) {
      var id = snapshot.key()
      slideApp.photos.some(function (photo) {
        if (photo.id === id) {
          slideApp.photos.$remove(photo)
          return true
        }
      })
    })
  },
  computed: {
  },
  methods: {
    uploadPhoto () {
      var slideApp = this
      Filepicker.setKey('AMT1I6PlsS7y4f6oyA7Rpz')
      Filepicker.pickMultiple({
        mimetype: 'image/*',
        services: [
          'COMPUTER',
          'GOOGLE_DRIVE',
          'FACEBOOK',
          'INSTAGRAM'
        ],
        imageQuality: 80
      },
      function (Blobs) {
        console.log(JSON.stringify(Blobs))
        for (var i = 0; i < Blobs.length; i++) {
          var blob = Blobs[i]
          var photo = {
            src: blob.url,
            blob: blob
          }
          slideApp.pushToFirebase(photo)
        }
      },
      function (FPError) {
        console.log(FPError.toString())
      })
    },
    pushToFirebase (photo) {
      var baseURL = 'https://wedwall.firebaseio.com/'
      var Slides = new Firebase(baseURL + 'slides')
      Slides.push({
        'photo': photo
      })
    },
    removePhoto (photo) {
      console.log(photo.id)
      var baseURL = 'https://wedwall.firebaseio.com/'
      var Slides = new Firebase(baseURL + 'slides/' + photo.id)
      Filepicker.setKey('AMT1I6PlsS7y4f6oyA7Rpz')
      Filepicker.remove(
        photo.photo.blob,
        function (Blob) {
          console.log('Remove from firebase')
          Slides.remove()
        },
        function (FPError) {
          console.log(FPError.toString())
        })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
h1 {
  font-family: 'Lobster', cursive;
}
</style>
