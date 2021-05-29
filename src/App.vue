<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'App',
}
</script>

<style>
@import "assets/css/normalize.css";

#app{
  width: 100%;
  height: 100%;
  position: absolute;
}
</style>
