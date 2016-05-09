<template>
<div id="wrapper">
  <nav class="navbar navbar-light navbar-fixed-top bg-faded">
    <!-- Brand and toggle get grouped for better mobile display -->
    <div class="navbar-header">
      <a class="navbar-brand" href="#">Kent and Jill's Wedding</a>
      <ul class="nav navbar-nav pull-xs-right">
        <li class="nav-item"><a class="nav-link" v-link="{ name: 'post' }"><i class="fa fa-microphone" aria-hidden="true"></i> 留言給新人</a></li>
      </ul>
    </div>
  </nav>
  <div class="container-fluid">
    <router-view
      keep-alive
      transition
      transition-mode="out-in"
    ></router-view>
  </div>
</div>
</template>

<script>
</script>

<style>
body { padding-top: 70px; }
</style>
