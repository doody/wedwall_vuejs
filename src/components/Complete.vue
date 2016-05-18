<template>
  <div id="wrapper">
    <div class="container-fluid">
      <div class="jumbotron col-xs-12 col-sm-6 col-md-8 col-md-offset-2">
        <h1 class="display-4"><i class="fa fa-thumbs-up" aria-hidden="true"></i> Thank you!</h1>
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
</style>
