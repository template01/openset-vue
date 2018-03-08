<template>
<div id="editorReport" class="">
  <div class="reportContent">
    <div class="bodyText" :class="{'assignmentLayout':assignment}">
      <slot></slot>
    </div>
    <div>
      <div class="bodyText" v-html="content"  :class="{'assignmentLayout':assignment}">
      </div>
    </div>
    <div class="featuredImage"  :class="{'assignmentLayout':assignment}">
      <transition name="slide-fade">
        <img v-if="featuredImage" :src="featuredImage"/>
      </transition>
    </div>

  </div>

</div>
</template>

<script>
import inView from 'in-view'

export default {
  name: 'hello',
  data() {
    return {
      msg: 'Welcome to Your Vue.js App',
      positionVisualContentTop: 0,
      featuredImage: ''
    }
  },
  props: ['title', 'content','assignment'],
  methods: {
    setFeaturedImage: function(){
      inView('.bodyText img').on('enter', el => {

        var srcSet = el.getAttribute("srcset")

        if(!!srcSet){
          var srcSetArray = srcSet.split(",")
          var fullImagePath = srcSetArray[srcSetArray.length-1].trim().split(" ")[0]
          this.featuredImage = fullImagePath

          // this.featuredImage = el.getAttribute("src")
        }


      }).on('exit', el => {
        if(inView('.bodyText img').check().current.length===0){

          this.featuredImage = ''
        }
        console.log('CHECK START')
        console.log(inView('img').check())
        console.log('CHECK')




      });

    }

  },
  mounted: function() {
    this.setFeaturedImage()
  },
  updated: function(){
    // this.setFeaturedImage()

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import "../assets/scss/globalVars.scss";
@import "../../node_modules/include-media/dist/_include-media.scss";


#editorReport{
  z-index: -1;
  position: absolute;
  padding-top: $paddingWindowDesktop;

  @include media("<desktop") {
    padding-top: $paddingWindowMobile;

  }

  .reportContent{

    .featuredImage{


      right: 0;

      &.assignmentLayout{
        left: 0;

      }

      position: fixed;
      top: $paddingWindowLarge;
      width: 50%;
      height: calc(100% - #{$paddingWindowLarge});
      padding: $paddingWindowDesktop;

      @include media("<desktop") {
        padding: $paddingWindowMobile;
      }

      display: flex;
      img{
        max-width: 100%;
        align-self: center;
        margin: 0 auto;

      }

      @include media("<desktop") {
        display: none;
      }
    }
    position: relative;

    .reportTitle{
      margin: 0;
      font-size: $fontSizeWindowLarge;
      text-transform: uppercase;
      font-weight: normal;
      font-family: Calibre;
    }
    .imageWrapper{
      position: absolute;
      width: 50%;
      img{
        margin: 0 auto;
        display: block;
        max-width: calc(100% - 4vw);
      }
    }
    .qouteLarge{
      font-size: 4vw;
      text-align: center;
      width: 100%;
      padding: $paddingWindowMedium;
    }

    .bodyText{

      @include media("<desktop") {
        width: 100%;
      }

      width: 50%;
      font-size: $fontSizeWindowLargeFixed;
      @include media("<phone") {
        font-size: $fontSizeWindowMediumFixed;
      }


      line-height: 1.25;
      margin-left: 0%;
      &.assignmentLayout{
        margin-left: 50%;
        // font-family: Calibre;
        //
        // @include media(">desktop") {
        //   font-size: 1.4vw;
        //   line-height: 1.2;
        //
        // }
      };
      font-family: "Lyon", Times, serif;
      padding-left: $paddingWindowDesktop;
      padding-right: $paddingWindowDesktop;
      @include media("<desktop") {
        padding-left: $paddingWindowMobile;
        padding-right: $paddingWindowMobile;

      }
      @include media(">desktop") {
        font-size: $fontSizeWindowLargeFixed;


      }



    }
  }
}

</style>

<style lang="scss">
@import "../assets/scss/globalVars.scss";
@import "../../node_modules/include-media/dist/_include-media.scss";



#editorReport{
  background: white;
  .reportContent{
    .bodyText{
        h1:not(.reportTitle),h2:not(.reportTitle),h3:not(.reportTitle),h4:not(.reportTitle),h5:not(.reportTitle),h6:not(.reportTitle){
          font-family: Calibre;
          font-weight: normal;
          text-align: center;

      }
      img{
        max-width: calc(100% - 12vw);
        height: auto;
        margin: 0 auto;
        display: block;
      }
      .wp-caption{
        width: 100% !important;
      }

      .wp-caption-text{
        padding-left: $paddingWindowDesktop;

        font-family: Calibre;
        font-size: $fontSizeWindowMediumFixed;
        @include media(">=desktop") {
          font-size: $fontSizeWindowMediumFixed;
          line-height: $fontSizeWindowMediumFixed;
          width: 50%;
        }
        @include media("<desktop") {
          // font-size: 1vw;
          // line-height: 1vw;

          padding-left: $paddingWindowDesktop;
          padding-right: $paddingWindowDesktop;
        }

        clear: both;
      }

    }

  }


  /* Enter and leave animations can use different */
  /* durations and timing functions.              */
  .slide-fade-enter-active {
    transition: all .3s ease;
  }
  .slide-fade-leave-active {
    transition: all .8s ease;
  }
  .slide-fade-enter, .slide-fade-leave-to
  /* .slide-fade-leave-active for <2.1.8 */ {
    transform: translateY(-$paddingWindowDesktop);
    opacity: 0;
  }

}
</style>
