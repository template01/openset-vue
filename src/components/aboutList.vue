<template>
<div class="aboutList">
  <div v-html="about">

  </div>
</div>
</template>

<script>
// import _ from 'lodash'

export default {
  name: 'aboutList',
  data() {
    return {
      about:'<h1>LOADING...</h1>'
    }
  },
  methods: {
    // addBlink: function(){
    //   alert('blink')
    // }
  },
  mounted(){
    this.$http.get('http://community.openset.nl/backend/wp-json/wp/v2/about').then(function(response) {
      this.about = response.body[0].content.rendered
      // alert(this.about )
      //
      // var vm = this
      // setTimeout(function() {
      //   vm.loaded = true
      // }, 500)
    })
  },

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style  lang="scss">
@import "../assets/scss/globalVars.scss";
@import "../../node_modules/include-media/dist/_include-media.scss";

.aboutList{
  width: 100%;
  display: inline-block !important;

  a{
    width: auto !important;
    text-decoration: underline !important;
    color: black !important;

  }
}

// $paddingWindowDesktop

</style>
