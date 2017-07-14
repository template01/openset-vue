<template>
<div class="visualProject" :class="projectColorSchemeProp">

  <div class="introWrapper fixedIntro" v-if="introText">


    <div class="fixedIntroInnerWrapper">

      <div class="fixedIntroInnerColumns">
        <singleHeader :nameProp=authorName :dateProp="date" :titleProp="title"></singleHeader>
        <div v-html="introText">
        </div>

      </div>
    </div>
  </div>
  <div class="introWrapper fixedIntro" v-if="introKeywords">
    <div class="fixedIntroInnerWrapper">
      <div class="keywordHeader">
        <singleHeader :nameProp=authorName :dateProp="date" :titleProp="title"></singleHeader>
        <div class="keywords">
          <p>
            Keywords:
            <span v-for="item in introKeywords" v-html="item.add_keyword+'&nbsp;'">
            </span>
          </p>
        </div>

      </div>
      <!-- <div  class="fixedIntroInnerLeft">
        <div v-for="item in introKeywords">
          <p v-html="item.add_keyword">

          </p>
        </div>

        </div> -->

    </div>
  </div>

  <div class="visualContent" v-if="positionVisualContentTop>1" v-bind:style="{'top':positionVisualContentTop+'px'}">

    <!-- {{content}} -->

    <div class="visualContentSingle" v-for="item in content">
      <!-- {{item}} -->
      <div v-if="item.acf_fc_layout == 'visual_media'">
        <img class="alignLeft" v-bind:class="[item.align,item.width]" v-bind:src="item.visual_media_content.sizes.large" />
      </div>
      <div v-bind:class="[item.align,item.width]" v-if="item.acf_fc_layout == 'visual_media_video'">
        <div v-html="item.visual_youtube">
        </div>
      </div>
      <!-- <div class="visualContentTextarea" v-bind:class="[item.align,item.width]" v-if="item.acf_fc_layout == 'visual_textarea'" v-html="item.visual_textarea_content">
      </div> -->
    </div>
  </div>
</div>
</template>

<script>
import singleHeader from '@/components/singleHeader'

export default {
  name: 'visualProject',
  components: {
    singleHeader
  },
  data() {
    return {
      msg: 'Welcome to Your Vue.js App',
      positionVisualContentTop: 0,
    }
  },
  props: ['title', 'introText', 'introKeywords', 'content', 'projectColorSchemeProp', 'authorName', 'date'],
  methods: {

    resizeIframe: function() {
      var allIframes = this.$el.querySelectorAll('iframe');

      for (var i = 0, len = allIframes.length; i < len; i++) {
        console.log(allIframes[i].getAttribute("width"))
        console.log(allIframes[i].getAttribute("height"))
        var format = allIframes[i].getAttribute("height") / allIframes[i].getAttribute("width")
        console.log(format)
        allIframes[i].style.height = format * allIframes[i].offsetWidth + 'px'
      }
    },

    positionVisualContent: function() {

      this.positionVisualContentTop = this.$el.querySelector('.fixedIntroInnerWrapper').offsetHeight + (window.outerWidth / 100)
    }
  },
  updated: function() {
    // alert('chaeeenge')
    this.resizeIframe()
    this.positionVisualContent()

  },

  mounted: function() {

    // this.positionVisualContent()
    var vm = this
    document.addEventListener("DOMContentLoaded", this.positionVisualContent());
    // setTimeout(function() {
    //   vm.positionVisualContent()
    // }, 1000)
    // window.onload = function(){
    // console.log("window.onload", e, Date.now() ,window.tdiff,
    // }
  },
  created: function() {
    // alert('created')
    // this.positionVisualContent()

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import "../assets/scss/globalVars.scss";

.visualProject {

    background: inherit;
    display: block;
    margin-bottom: $paddingWindowLarge;
    position: absolute;
    width: 100%;

    .introWrapper {

        &.fixedIntro {
            position: fixed;
        }
        font-size: $fontSizeWindowMedium;
        color: inherit;
        background: inherit;
        width: 100%;
        height: 100%;
        position: relative;
        line-height: $lineHeight105;
        padding: $paddingWindowDesktop;
        z-index: 0;

        .keywordHeader {
            width: 100%;
            display: inline-block;
            .keywords {
                float: right;
                width: 50%;
                padding-left: $paddingWindowDesktop/2;

            }
            div {
                width: 50%;
                padding-right: $paddingWindowDesktop/2;

                float: left;
                p {
                    margin: 0;
                }

            }
        }

        .fixedIntroInnerColumns {
            columns: 2;
            -webkit-columns: 2;
        }
        .fixedIntroInnerLeft {
            display: inline-block;
            width: 100%;
            margin-top: $paddingWindowLarge;
            margin-bottom: $paddingWindowLarge;

            div {
                display: block;
                float: left;
                width: 50%;
                text-align: center;
            }
        }

    }

    .visualContent {
        top: 400px;
        // background: black;
        color: inherit;
        z-index: 1;
        position: relative;

        .visualContentSingle {
            clear: both;
            padding: $paddingWindowDesktop;
            width: 100%;

            img {
                max-width: 100%;
                margin: 0 auto;
                display: block;
            }
            div:not(.left):not(.right) {
                display: inline-block;
                width: 100%;
            }
            .right {
                float: right;
                display: inline-block;

            }

            div {
                &.Half {
                    // width: 50% !important;
                        margin: 0 auto;
                }
            }
            img {
                &.Half {
                    max-width: 50%;
                }
            }

            .visualContentTextarea {
                line-height: $lineHeight1;

                padding: $paddingWindowMedium;
                border-radius: $paddingWindowLarge;
                font-size: $fontSizeWindowLarge;

            }
        }

    }

    &.white_on_black {
        background: black;
        .visualContentTextarea {
            background: white;
            color: black;

        }
    }
    &.black_on_white {
        background: white;
        .visualContentTextarea {
            background: black;
            color: white;
        }
    }
    &.white_on_red {
        background: red;
        .visualContentTextarea {
            background: white;
            color: red;

        }
    }
    &.black_on_green {
        background: lime;
        .visualContentTextarea {
            background: white;
        }
    }

}

h1,
h2 {
    font-weight: normal;
}

ul {
    list-style-type: none;
    padding: 0;
}

li {
    display: inline-block;
    margin: 0 10px;
}

a {
    color: #42b983;
}
</style>

<style lang="scss">
@import "../assets/scss/globalVars.scss";

.visualProject {

  // div{
    .Half.right,.Half.left{
      width: 50%;
      // display: none;
      iframe {
        width: 100%;
      }
    }

    .Half.left{
      margin:initial !important;
    }

  // }

    .Half{
      iframe {
        width: 50%;
      }
    }

    iframe {
        width: 100%;
        margin: 0 auto;
        display: block;
    }

    .visualContentTextarea {
        p {
            margin: 0;
        }
    }
}
</style>
