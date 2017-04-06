<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style>

body,html{
  margin: 0;
}

*{
  box-sizing: border-box;
}
#app {
  /*font-family: 'Avenir', Helvetica, Arial, sans-serif;

  text-align: center;
  color: #2c3e50;
  margin-top: 60px;*/


  font-family: Arial;

  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
