<template>
<div class="loading">
  <H1>
      loading
    </H1>
</div>
</template>

<script>
export default {
  name: 'loading',
  data() {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  mounted() {

    setTimeout(function() {
      window.scrollTo(0, 0)

    }, 0)
    setTimeout(function() {
      window.scrollTo(0, 0)

    }, 10)
    setTimeout(function() {
      window.scrollTo(0, 0)

    }, 100)
    setTimeout(function() {
      window.scrollTo(0, 0)

    }, 150)
    setTimeout(function() {
      window.scrollTo(0, 0)

    }, 250)
    document.body.style.overflow = "hidden";
  },
  beforeDestroy() {
    document.body.style.overflow = "auto";

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import "../assets/scss/globalVars.scss";
@import "../../node_modules/include-media/dist/_include-media.scss";

h1,
h2 {
    font-weight: normal;
    text-transform: uppercase;
    color: lime;
    align-self: center;
    text-align: center;
    width: 100%;
    font-size: $fontSizeWindowLarge;
    @include media("<phone") {
        font-size: $fontSizeWindowXLarge;
    }
    -webkit-animation: spin 4s linear infinite;
    -moz-animation: spin 4s linear infinite;
    animation: spin 4s linear infinite;
}
@-moz-keyframes spin {
    100% {
        -moz-transform: rotate(360deg);
    }
}
@-webkit-keyframes spin {
    100% {
        -webkit-transform: rotate(360deg);
    }
}
@keyframes spin {
    100% {
        -webkit-transform: rotate(360deg);
        transform: rotate(360deg);
    }
}

.loading {
    position: fixed;
    background: black;
    top: $paddingWindowLarge;
    @include media("<desktop") {
        top: $paddingWindowLarge*2;
    }
    @include media("<phone") {
        top: $paddingWindowLarge*4;
    }
    display: flex;
    align-content: center;
    height: 100%;
    width: 100%;
    z-index: 9;
}
</style>
