<template>
<div class="aboutList">
<p>
  Open Set is an independent education platform that promotes the social relevance of design and visual culture. Our organisation began as a Dutch Design summer school in 2012 and has grown to include a broad spectrum of year-round activities.
</p>
<p>
  Design and visual culture. Our organisation began as a Dutch Design summer school in 2012 and has grown to include a broad spectrum of year-round activities.
</p>
</div>
</template>

<script>
// import _ from 'lodash'

export default {
  name: 'aboutList',
  data() {
    return {
    }
  },
  methods: {
    // addBlink: function(){
    //   alert('blink')
    // }
  },
  // mounted(){
  //   if(this.$route.hash === '#about'){
  //     this.addBlink()
  //   }
  // },
  // watch: {
  //
  //   '$route':function(to,from){
  //     // alert('change')
  //   }
  //
  // }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import "../assets/scss/globalVars.scss";
@import "../../node_modules/include-media/dist/_include-media.scss";

.aboutList{
  width: 100%;
  display: inline-block !important;
}

// $paddingWindowDesktop

</style>
