<template>
  <div class="singleHeader">
    <h1>{{titleProp}}</h1>
    <div class="metaInfo">
      <p>
        <span v-for="(name,index) in nameProp">{{name}}<span v-if="index < nameProp.length - 1 ">, </span></span>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'singleHeader',
  props:['titleProp','nameProp','dateProp'],
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import "../assets/scss/globalVars.scss";
@import "../../node_modules/include-media/dist/_include-media.scss";

.singleHeader{
  h1{
    font-size: $fontSizeWindowLarge;
    font-weight: normal;
    text-transform: uppercase;
    margin: 0;
  }

  .metaInfo{
    margin-top:  $paddingWindowDesktop;
    margin-bottom:  $paddingWindowDesktop;
    padding-top:  $paddingWindowDesktop;
    padding-bottom:  $paddingWindowDesktop;
    border-top: 2vw solid;
    border-bottom: 2vw solid;
    border-color: inherit;
    p{
      margin: 0;
    }
  }
}
</style>
