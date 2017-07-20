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

<style src="../src/assets/fonts/Lyon/stylesheet.css"/>
<style src="../src/assets/fonts/Calibre/stylesheet.css"/>

<style lang="scss">





body,html{
  margin: 0;
  background: lime;
}

*{
  box-sizing: border-box;
}
#app {
  /*font-family: 'Avenir', Helvetica, Arial, sans-serif;

  text-align: center;
  color: #2c3e50;
  margin-top: 60px;*/


  font-family: Calibre;

  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
