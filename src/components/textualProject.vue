<template>
<div class="textualProject" :class="projectColorSchemeProp">
  <h1 class="title" v-html="title"></h1>
  <div v-for="item in content">
    <!-- {{item}} -->
    <div :class="item.text_content_align" class="textPiece" v-if="item.acf_fc_layout==='text_piece'">
      <div v-html="item.text_content">
      </div>
    </div>
    <div v-if="item.acf_fc_layout==='gallery'">
      <!-- <img src="http://placehold.it/400x300"/> -->
      <div v-html="item.text_content">
      </div>
    </div>

    <div v-if="item.acf_fc_layout==='image'" class="image">
      <img :src="item.image.url"/>
      <!-- <div v-html="item.text_content"> -->
      <!-- </div> -->
    </div>
  </div>

</div>
</template>

<script>
export default {
  name: 'hello',
  data() {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  props: ['title', 'content', 'projectColorSchemeProp']

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import "../assets/scss/globalVars.scss";
@import "../../node_modules/include-media/dist/_include-media.scss";

.textualProject {
    padding: $paddingWindowDesktop;
    position: absolute;

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

    .textPiece {
        width: 50%;
        line-height: 1.3;
        float: left;

        font-size: $fontSizeWindowLarge/1.2;
        font-family: Lyon;
        @include media(">desktop") {
            font-size: $fontSizeWindowMedium/1.2;

        }

        &.right{
          float: right;
        }

    }

    img{

    }

    &.white_on_black{
      background: black;
      .visualContentTextarea{
        background: white;
        color: black;

      }
    }
    &.black_on_white{
      background: white;
      .visualContentTextarea{
        background: black;
        color: white;
      }
    }
    &.white_on_red{
      background: red;
      .visualContentTextarea{
        background: white;
        color: red;

      }
    }
    &.black_on_green{
      background: lime;
      .visualContentTextarea{
        background: white;
      }
    }

}
</style>
