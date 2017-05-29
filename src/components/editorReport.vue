<template>
<div id="editorReport" class="">
  <div class="reportContent">
    <div class="bodyText">
      <h1 class="reportTitle">{{title}}</h1>
    </div>
    <div v-for="item in content">
      <div class="bodyText" v-if="item.text_piece_default" v-html="item.text_piece_default">
      </div>
      <div class="imageWrapper" v-if="item.image">
          <img :src="item.image.url"/>
      </div>
      <div class="qouteLarge" v-if="item.text_piece_qoute" v-html="item.text_piece_qoute">
      </div>
    </div>
  </div>

</div>
</template>

<script>
export default {
  name: 'hello',
  data() {
    return {
      msg: 'Welcome to Your Vue.js App',
      positionVisualContentTop: 0,
    }
  },
  props: ['title', 'content'],
  methods: {

  },
  mounted: function() {
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
  padding-top: 4vw;
  .reportContent{
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
      font-family: Lyon;
      padding-left: $paddingWindowMedium;
      padding-right: $paddingWindowMedium;

      @include media(">desktop") {
        font-size: 1.2vw;

      }



    }
  }
}

</style>

<style lang="scss">
@import "../assets/scss/globalVars.scss";



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

    }

  }
}
</style>
