<template>
  <div id="wrapper">
    <div class="container-fluid">
      <div class="jumbotron col-xs-12 col-sm-6 col-md-8 col-md-offset-2">
        <h1 class="display-4"><i class="fa fa-bullhorn" aria-hidden="true"></i> Leave a message</h1>
        <hr class="m-y-2">
          <form id="form" v-on:submit.prevent="addMsg">
            <div class="form-group row" v-bind:class="{ 'has-danger': !validation.user }">
              <label for="inputUser" class="col-sm-4 form-control-label"><i class="fa fa-user" aria-hidden="true"></i> Name/名字</label>
              <div class="col-sm-8">
                <input class="form-control" id="inputUser" v-model="newMessage.user" placeholder="Your name here">
              </div>
            </div>
            <div class="form-group row" v-bind:class="{ 'has-danger': !validation.message }">
              <label for="inputMsg" class="col-sm-4 form-control-label"><i class="fa fa-comments" aria-hidden="true"></i> Message/留言</label>
              <div class="col-sm-8">
                <textarea id="inputMsg" class="form-control" v-model="newMessage.msg" placeholder="You can leave a message here"></textarea>
              </div>
            </div>
            <div class="form-group row" v-bind:class="{ 'has-danger': !validation.message }">
              <label for="inputPhoto" class="col-sm-4 form-control-label"><i class="fa fa-camera" aria-hidden="true"></i> Choose a photo/照片</label>
              <div class="col-sm-8">
                <button type="button" id="inputPhoto" class="btn btn-info" v-on:click.prevent="uploadPhoto"><i class="fa fa-camera" aria-hidden="true"></i> Upload/上傳</button>
                <img id="uploadedImg" v-if="newMessage.photo" class="img-thumbnail img-fluid" v-bind:src="newMessage.photo" alt="">
              </div>
            </div>
            <hr class="m-y-2">
            <div class="form-group row">
              <div class="col-sm-offset-4 col-sm-10">
                <button :disabled="!isValid" type="submit" class="btn btn-lg btn-primary" value="Add Message">Submit/送出</button>
              </div>
            </div>
          </form>
        </div>
    </div>
  </div>
</template>

<script>
import Firebase from 'firebase'
import Filepicker from 'filepicker-js'
import EXIF from 'exif-js'
export default {
  data () {
    return {
      newMessage: {
        user: '',
        msg: '',
        photo: '',
        photoBlob: null,
        photoRotation: {
          rotate90: false,
          rotate180: false,
          rotate270: false
        }
      }
    }
  },
  ready () {
    this.newMessage.user = this.getCookie()
  },
  computed: {
    validation () {
      return {
        message: !!this.newMessage.msg.trim() || !!this.newMessage.photo.trim(),
        user: !!this.newMessage.user.trim()
      }
    },
    isValid () {
      return this.validation.message && this.validation.user
    }
  },
  methods: {
    cleanData () {
      this.newMessage.msg = ''
      this.newMessage.photo = ''
      this.newMessage.photoBlob = null
      this.newMessage.photoRotation = {
        rotate90: false,
        rotate180: false,
        rotate270: false
      }
    },
    addMsg () {
      if (this.isValid) {
        var app = this
        if (this.newMessage.photo !== '') {
          EXIF.getData(document.getElementById('uploadedImg'), function () {
            var rotateId = EXIF.getTag(this, 'Orientation')
            console.log(rotateId)
            if (rotateId !== undefined) {
              console.log('I have rotation id: ' + rotateId)
              switch (rotateId) {
                case 3:
                case 4:
                  app.newMessage.photoRotation.rotate180 = true
                  break
                case 5:
                case 6:
                  app.newMessage.photoRotation.rotate90 = true
                  break
                case 7:
                case 8:
                  app.newMessage.photoRotation.rotate270 = true
                  break
              }
            }
            app.saveToFirebase()
          })
        } else {
          app.saveToFirebase()
        }
        this.setCookie()
      }
    },
    saveToFirebase () {
      var baseURL = 'https://wedwall.firebaseio.com/'
      var Feeds = new Firebase(baseURL + 'feeds')
      Feeds.push({
        'msg': this.newMessage.msg,
        'user': this.newMessage.user,
        'photo': this.newMessage.photo,
        'photoBlob': this.newMessage.photoBlob,
        'photoRotation': this.newMessage.photoRotation
      })
      this.cleanData()
      this.$route.router.go({ name: 'complete' })
    },
    uploadPhoto () {
      var app = this
      Filepicker.setKey('AMT1I6PlsS7y4f6oyA7Rpz')
      app.removePhoto()
      Filepicker.pick({
        mimetype: 'image/*',
        services: [
          'COMPUTER',
          'GOOGLE_DRIVE',
          'FACEBOOK',
          'INSTAGRAM'
        ],
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
