<template>
  <div id="wrapper">
    <div class="postform-container">
      <div class="postform">
        <h1><i class="fa fa-thumbs-up" aria-hidden="true"></i> Thank you!</h1>
        <hr class="m-y-2">
        <h3> Your message will be on the screen later! </h3>
        <h3> 留言將在稍後顯示在投影幕上! </h3>
        <hr class="m-y-2">
        <button type="button" class="btn btn-info" v-on:click.prevent="goPost">I want to say something / 我還有話要說</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    goPost () {
      this.$route.router.go({ name: 'post' })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
h1 {
  font-family: 'Lobster', cursive;
}

.postform-container {
  width: 100vw;
  height: 100vh;
  background: url("https://firebasestorage.googleapis.com/v0/b/project-7921461511894217881.appspot.com/o/looking_for_love-wallpaper-1280x800.jpg?alt=media&token=a729a32d-e830-4ab7-8093-4d0418604606") 0 / cover fixed;
}

.postform::before {
    background: url("https://firebasestorage.googleapis.com/v0/b/project-7921461511894217881.appspot.com/o/looking_for_love-wallpaper-1280x800.jpg?alt=media&token=a729a32d-e830-4ab7-8093-4d0418604606") 0 / cover fixed;
}

.postform {
    position: relative;
    margin: 0 auto;
    padding: 1em;
    max-width: 40em;
    background: rgba(255, 240, 245, 0.85) border-box;
    overflow: hidden;
    border-radius: .3em;
    box-shadow: 0 0 0 1px hsla(0,0%,100%,.3) inset,
                0 .5em 1em rgba(0, 0, 0, 0.6);
    text-shadow: 0 1px 1px hsla(0,0%,100%,.3);
}

.postform::before {
    content: '';
    position: absolute;
    top: 0; right: 0; bottom: 0; left: 0;
    margin: -30px;
    z-index: -1;
    -webkit-filter: blur(20px);
    filter: blur(20px);
}

@media (max-width: 33.9em) {
    h1 {
      font-size: 2em;
    }
}
</style>
