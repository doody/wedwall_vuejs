<template>
<div id="wrapper">
  <div class="logo">Kent and Jill's Wedding</div>
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
.logo {
    position: fixed;
    bottom: 10px;
    left: 10px;
    width: 100%;
    background: rgba(0, 0, 0, 0);
    font-family: 'Lobster', cursive;
    font-size: 1.5em;
    text-shadow: 0 1px 1px #000;
    color: rgb(255, 192, 203);
    z-index: 9999;
}
</style>
