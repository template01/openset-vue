<template>
  <div class="singleHeader">
    <userItemExpanded v-bind:slug="userSlug"></userItemExpanded>
    <h1 v-html="titleProp"></h1>
    <div class="metaInfo">
      <p>
        <span v-if="typeProp" class="type" v-html="typeProp"></span>
        <br v-if="typeProp" />
        <span>By: </span>
<span v-for="(name,index) in namesArray">

  <span class="underlined" @click="userSlug = name[1]" v-if="index<namesArray.length -1" v-html="name[0]+', '"></span>
  <span class="underlined" @click="userSlug = name[1]" v-else v-html="name[0]"></span>
</span>
        <br />
        <span>Date: </span><span v-html="dateStamp(dateProp)"></span></span>
      </p>
    </div>
  </div>
</template>

<script>
import userItemExpanded from '@/components/userItemExpanded'

export default {
  components: {
    userItemExpanded
  },
  name: 'singleHeader',
  props:['titleProp','nameProp','dateProp','typeProp'],
  data () {
    return {
      userSlug:'',
      days: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      mL: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
      mS: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'],
    }
  },

  computed:{
    namesArray: function(){
      var namePairs = []
      var arr = this.nameProp.split(',')
      var newArr = _(arr).reduce(function(result, value, index) {
        if (index % 2 === 0)
          result.push(arr.slice(index, index + 2));
        return result;
      }, []);
      return newArr
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

  .underlined{
    border-bottom: 3px solid black;
    margin-bottom: 0px;
    display: inline-block;
    margin-right: 3px;
    cursor: pointer;
  }

  h1{
    text-align: left !important;
    font-size: $fontSizeWindowLarge;
    font-weight: normal;
    text-transform: uppercase;
    margin: 0;
    line-height: 1;
    margin-top: -0.2vw;
    @include media("<phone") {
      font-size: $fontSizeWindowXLarge;
    }


  }

  .metaInfo{
    font-family: Calibre;
    font-size: $paddingWindowMedium;

    @include media("<desktop") {
      font-size: $fontSizeWindowLarge;
      margin-top:  $paddingWindowMobile;
      padding-top:  $paddingWindowMobile;
      padding-bottom:  $paddingWindowMobile;

    }


    @include media("<phone") {
      font-size: $fontSizeWindowXLarge;
    }



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
