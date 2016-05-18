<template>
<div id="wrapper">
  <nav class="navbar pink navbar-light navbar-fixed-top bg-faded">
    <!-- Brand and toggle get grouped for better mobile display -->
    <div class="navbar-header">
      <a class="navbar-brand" href="#">Kent and Jill's Wedding</a>
    </div>
  </nav>
  <router-view
    keep-alive
    transition
    transition-mode="out-in"
  ></router-view>
</div>
</template>

<script>
require('bootstrap')
</script>

<style>
body {
  padding-top: 70px;
  background: #DCEDC8;
}
.navbar-brand {
  font-family: 'Lobster', cursive;
}
.navbar.pink.navbar-light {
  background: rgb(255, 192, 203);
}
</style>
