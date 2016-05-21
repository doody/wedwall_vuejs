<template>
  <div id="wrapper">
    <div class="container-fluid">
      <h1>Controller</h1>
      <button type="button" class="btn btn-primary btn-lg btn-block" v-on:click.prevent="moveToFeeds">留言牆</button>
      <button type="button" class="btn btn-primary btn-lg btn-block" v-on:click.prevent="moveToSlides">婚紗Show</button>
    </div>
  </div>
</template>

<script>
import Firebase from 'firebase'
export default {
  methods: {
    moveToFeeds () {
      var baseURL = 'https://wedwall.firebaseio.com/'
      var RemoteControl = new Firebase(baseURL + 'controller')
      RemoteControl.update({
        'control': {
          'state': 'FEEDS',
          'game': ''
        }
      })
    },
    moveToSlides () {
      var baseURL = 'https://wedwall.firebaseio.com/'
      var RemoteControl = new Firebase(baseURL + 'controller')
      RemoteControl.update({
        'control': {
          'state': 'SLIDES',
          'game': ''
        }
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
