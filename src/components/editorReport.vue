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
       <img v-if="featuredImage" :src="featuredImage"/>
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
      inView('img').on('enter', el => {
        console.log(el.getAttribute("srcset"))
        var srcSet = el.getAttribute("srcset")

        if(!!srcSet){
          var srcSetArray = srcSet.split(",")
          console.log(srcSetArray.length)
          console.log(srcSetArray[srcSetArray.length-1].trim().split(" ")[0])
          var fullImagePath = srcSetArray[srcSetArray.length-1].trim().split(" ")[0]
          this.featuredImage = fullImagePath

          // this.featuredImage = el.getAttribute("src")
        }


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
  .reportContent{

    .featuredImage{

      &.assignmentLayout{
        right: 0;
      }
      position: fixed;
      top: $paddingWindowLarge;
      width: 50%;
      height: calc(100% - #{$paddingWindowLarge});
      padding: $paddingWindowDesktop;
      display: flex;
      img{
        max-width: 100%;
        align-self: center;
        margin: 0 auto;

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
      width: 50%;
      font-size: 2vw;
      margin-left: 50%;
      &.assignmentLayout{
        margin-left: 0%;
        font-family: Calibre;

              @include media(">desktop") {
                font-size: 1.4vw;
                line-height: 1.2;

              }
      };
      font-family: "Times New Roman", Times, serif;
      line-height: 1.3;
      padding-left: $paddingWindowDesktop;
      padding-right: $paddingWindowDesktop;

      @include media(">desktop") {
        font-size: 1.2vw;

      }



    }
  }
}

</style>

<style lang="scss">
@import "../assets/scss/globalVars.scss";
@import "../../node_modules/include-media/dist/_include-media.scss";



#editorReport{
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
        font-family: Calibre;
        font-size: $fontSizeWindowSmall;
        @include media(">=desktop") {
          margin-left: 50%;
          font-size: 1vw;
          line-height: 1vw;
          width: 50%;
        }
        @include media("<desktop") {
          // font-size: 1vw;
          // line-height: 1vw;

          padding-left: $paddingWindowDesktop;
        }

        clear: both;
      }

    }

  }
}
</style>
