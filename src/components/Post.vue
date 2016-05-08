<template>
  <div class="post">
    <form id="form" v-on:submit.prevent="addMsg">
        <input v-model="newMessage.msg">
        <input v-model="newMessage.user">
        <button v-on:click.prevent="uploadPhoto"></button>
        <input type="submit" value="Add Message">
    </form>
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
        photo: ''
      }
    }
  },
  methods: {
    addMsg () {
      var baseURL = 'https://wedwall.firebaseio.com/'
      var Feeds = new Firebase(baseURL + 'feeds')
      Feeds.push({
        'msg': this.newMessage.msg,
        'user': this.newMessage.user,
        'photo': this.newMessage.photo
      })
      this.newMessage.msg = ''
      this.newMessage.photo = ''
      this.$route.router.go('feeds')
    },
    uploadPhoto () {
      var app = this
      Filepicker.setKey('AMT1I6PlsS7y4f6oyA7Rpz')
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
        console.log(Blob.url)
        app.newMessage.photo = Blob.url
      },
      function (FPError) {
        console.log(FPError.toString())
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
