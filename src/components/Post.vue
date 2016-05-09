<template>
  <div id="wrapper">
      <div class="jumbotron col-xs-12 col-sm-6 col-md-8 col-md-offset-2">
        <h1 class="display-4"><i class="fa fa-bullhorn" aria-hidden="true"></i> Leave a message</h1>
        <hr class="m-y-2">
          <form id="form" v-on:submit.prevent="addMsg">
            <div class="form-group row">
              <label for="inputUser" class="col-sm-4 form-control-label"><i class="fa fa-user" aria-hidden="true"></i> Your Name</label>
              <div class="col-sm-8">
                <input class="form-control" id="inputUser" v-model="newMessage.user" placeholder="Your name here">
              </div>
            </div>
            <div class="form-group row" v-bind:class="{ 'has-danger': !isValid }">
              <label for="inputMsg" class="col-sm-4 form-control-label"><i class="fa fa-comments" aria-hidden="true"></i> Message</label>
              <div class="col-sm-8">
                <textarea id="inputMsg" class="form-control" v-model="newMessage.msg" placeholder="You can leave a message here"></textarea>
              </div>
            </div>
            <div class="form-group row" v-bind:class="{ 'has-danger': !isValid }">
              <label for="inputPhoto" class="col-sm-4 form-control-label"><i class="fa fa-camera" aria-hidden="true"></i> Choose a photo</label>
              <div class="col-sm-8">
                <button type="button" id="inputPhoto" class="btn btn-info" v-on:click.prevent="uploadPhoto"><i class="fa fa-camera" aria-hidden="true"></i> Upload</button>
                <button :disabled="!newMessage.photo" type="button" id="inputPhoto" class="btn btn-danger" v-on:click.prevent="removePhoto"><i class="fa fa-trash" aria-hidden="true"></i> Remove</button>
                <img v-if="newMessage.photo" class="img-thumbnail img-fluid" v-bind:src="newMessage.photo" alt="">
              </div>
            </div>
            <hr class="m-y-2">
            <div class="form-group row">
              <div class="col-sm-offset-4 col-sm-10">
                <button :disabled="!isValid" type="submit" class="btn btn-lg btn-primary" value="Add Message">Submit</button>
              </div>
            </div>
          </form>
      </div>
  </div>
</template>

<script>
import Firebase from 'firebase'
import Filepicker from 'filepicker-js'
export default {
  data () {
    return {
      newMessage: {
        user: '',
        msg: '',
        photo: '',
        photoBlob: null
      }
    }
  },
  ready () {
    this.newMessage.user = this.getCookie()
  },
  computed: {
    isValid () {
      return !!this.newMessage.msg.trim() || !!this.newMessage.photo.trim()
    }
  },
  methods: {
    addMsg () {
      if (this.isValid) {
        var baseURL = 'https://wedwall.firebaseio.com/'
        var Feeds = new Firebase(baseURL + 'feeds')
        Feeds.push({
          'msg': this.newMessage.msg,
          'user': this.newMessage.user,
          'photo': this.newMessage.photo,
          'photoBlob': this.newMessage.photoBlob
        })
        this.newMessage.msg = ''
        this.newMessage.photo = ''
        this.setCookie()
        this.$route.router.go('feeds')
      }
    },
    uploadPhoto () {
      var app = this
      Filepicker.setKey('AMT1I6PlsS7y4f6oyA7Rpz')
      app.removePhoto()
      Filepicker.pick({
        mimetype: 'image/*',
        container: 'modal',
        services: [
          'COMPUTER',
          'FACEBOOK',
          'INSTAGRAM'],
        imageQuality: 80
      },
      function (Blob) {
        console.log(JSON.stringify(Blob))
        app.newMessage.photo = Blob.url
        app.newMessage.photoBlob = Blob
      },
      function (FPError) {
        console.log(FPError.toString())
      })
    },
    setCookie () {
      var expDate = Date.parse('June 01, 2016')
      var d = new Date(expDate)
      var expires = 'expires=' + d.toUTCString()
      document.cookie = 'name=' + this.newMessage.user + '; ' + expires
    },
    getCookie () {
      var name = 'name='
      var ca = document.cookie.split(';')
      for (var i = 0; i < ca.length; i++) {
        var c = ca[i]
        while (c.charAt(0) === ' ') {
          c = c.substring(1)
        }
        if (c.indexOf(name) === 0) {
          return c.substring(name.length, c.length)
        }
      }
    },
    removePhoto () {
      if (this.newMessage.photoBlob != null) {
        console.log('Remove uploaded file')
        var app = this
        // remove photo if already upload one
        Filepicker.remove(
          this.newMessage.photoBlob,
          function (Blob) {
            console.log('Remove success!')
            app.newMessage.photo = ''
            app.newMessage.photoBlob = null
          },
          function (FPError) {
            console.log(FPError)
          })
      }
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
