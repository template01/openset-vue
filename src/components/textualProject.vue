<template>
<div class="textualProject">


  <singleHeader class="halfWidth" :typeProp="'Project'" :nameProp=authorName :dateProp="date" :titleProp="title"></singleHeader>

  <!-- <h1 class="title" v-html="title"></h1> -->
  <div v-for="item in content">
    <!-- {{item}} -->
    <div :class="item.text_content_align" class="textPiece" v-if="item.acf_fc_layout==='text_piece'">
      <div v-html="item.text_content">
      </div>
    </div>

    <div class="largeQoute" v-if="item.acf_fc_layout==='qoute'">
      <div class="qouteContent" v-html="item.large_qoute">
      </div>
    </div>


    <div v-if="item.acf_fc_layout==='image'" class="image">
      <img :src="item.image.url"/>
      <div class="mediaCaption" v-if="item.image_caption" v-html="item.image_caption">

      </div>
      <!-- <div v-html="item.text_content"> -->
      <!-- </div> -->
    </div>
  </div>

</div>
</template>

<script>
import singleHeader from '@/components/singleHeader'
export default {

  name: 'textualProject',
  components:{
    singleHeader
  },
  data() {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  props: ['title', 'content','date','authorName']

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import "../assets/scss/globalVars.scss";
@import "../../node_modules/include-media/dist/_include-media.scss";

.textualProject {

    .halfWidth{
      width: 50%;
      padding-right: $paddingWindowDesktop;
    }

    padding: $paddingWindowDesktop;
    position: absolute;
    background: white;
    color: black;

    .title {
        width: 100%;
        font-weight: normal;
        font-size: $fontSizeWindowLarge;
        line-height: 1;
        margin: 0;
    }

    .image{
      width: 100%;
      display: inline-block;
      img{
        max-width: 100%;
        padding: $paddingWindowMedium;
        margin: 0 auto;
        display: block;

      }
    }


                .mediaCaption {
                  // font-size: 1vw;
                  font-size: inherit;
                  // line-height: 1vw;

                  font-size:$fontSizeWindowSmall;
                          // font-family: Lyon;
                          @include media(">desktop") {

                          }

                    margin-top: $paddingWindowDesktop;
                    max-width: 50% !important;
                    width: auto !important;
                    display: block;
                    // float: right;
                    margin: 0 auto;
                    text-align: center;

                }


    .largeQoute{
      width: 100%;
      line-height: 1;
      float: left;
      clear: both;
      font-size: $fontSizeWindowLarge;
      text-align: center;
      .qouteContent{
        margin: 0 auto;
        width: 75%;
      }
    }

    .textPiece {
        width: 50%;
        line-height: 1;
        float: left;
        clear: both;

        font-size: $fontSizeWindowLarge;
        // font-family: Lyon;
        @include media(">desktop") {
            font-size: $fontSizeWindowMedium;

        }

        &.right{
          float: right;

        }

    }

    img{

    }



}
</style>
