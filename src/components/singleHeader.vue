<template>
  <div class="singleHeader">
    <h1 v-html="titleProp"></h1>
    <div class="metaInfo">
      <p>
        <span class="type" v-html="typeProp"></span>
        <br />
        <span>By: </span><span v-for="(name,index) in nameProp" v-html="name"><span v-if="index < nameProp.length - 1 ">, </span></span>
        <br />
        <span>Date: </span><span v-html="dateStamp(dateProp)"></span></span>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'singleHeader',
  props:['titleProp','nameProp','dateProp','typeProp'],
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      days: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      mL: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
      mS: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'],
    }
  },
  methods:{


        dateStamp: function(input) {


          var day = this.days[new Date(input).getDay()]
          var dayNumber = ("0" + new Date(input).getDate()).slice(-2)

          var year = new Date(input).getFullYear()
          var monthL = this.mL[new Date(input).getMonth()]
          var month = ("0" + (new Date(input).getMonth() + 1)).slice(-2)
          // return this.days[new Date(input).getDay()];
          // return day+"/"+dayNumber+"/"+monthL;
          return dayNumber + "." + month + "." + year;

        },

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import "../assets/scss/globalVars.scss";
@import "../../node_modules/include-media/dist/_include-media.scss";

.singleHeader{
  h1{
    text-align: left !important;
    font-size: $fontSizeWindowLarge;
    font-weight: normal;
    text-transform: uppercase;
    margin: 0;
    line-height: 1;
    margin-top: -0.2vw;
  }

  .metaInfo{
    font-family: Calibre;
    font-size: $paddingWindowMedium;
    line-height: 1;
    margin-top:  $paddingWindowDesktop;
    // margin-bottom:  $paddingWindowDesktop;
    padding-top:  $paddingWindowDesktop;
    padding-bottom:  $paddingWindowDesktop;
    border-top: 2vw solid;
    border-bottom: 2vw solid;
    border-color: inherit;
    p{
      margin: 0;
    }

    .type{
      text-transform: uppercase;
    }
  }
}
</style>
