<template>
<div class="visualProject" :class="projectColorSchemeProp">

  <div class="introWrapper fixedIntro" v-if="introText">


    <div class="fixedIntroInnerWrapper">

      <div class="fixedIntroHalf">
        <singleHeader :typeProp="'project'" :nameProp=authorName :dateProp="date" :titleProp="title"></singleHeader>

      </div>
      <div class="fixedIntroHalf">
        <div v-html="introText">
        </div>
      </div>
    </div>
  </div>
  <div class="introWrapper fixedIntro" v-if="introKeywords">
    <div class="fixedIntroInnerWrapper">
      <div class="keywordHeader">
        <singleHeader :typeProp="'project'" :nameProp=authorName :dateProp="date" :titleProp="title"></singleHeader>
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
        <!-- <img class="alignLeft" v-bind:class="[item.align,item.width]" v-bind:src="item.visual_media_content.sizes.large" /> -->
        <img v-bind:class="[item.width != 'Full'  ?  item.align:item.align , item.width]" v-bind:src="item.visual_media_content.sizes.large" />

        <div :class="projectColorSchemeProp" class="mediaCaption" v-if="item.visual_media_content_caption" v-html="item.visual_media_content_caption">

        </div>
      </div>
      <div v-bind:class="[item.align,item.width]" v-if="item.acf_fc_layout == 'visual_media_video'">
        <div v-html="item.visual_youtube">
        </div>

      </div>
      <div :class="projectColorSchemeProp" class="mediaCaption" v-if="item.visual_youtube_caption" v-html="item.visual_youtube_caption"></div>

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
      if(window.innerWidth > 1024){
        this.positionVisualContentTop = this.$el.querySelector('.fixedIntroInnerWrapper').offsetHeight + (window.outerWidth / 100)
      }else{
        this.positionVisualContentTop = 2

      }
    },
    //
    // _.debounce(function(){
    //   alert('man')
    // }, 250, { 'maxWait': 1000 });

    test: function() {
      alert('tesa')
    }
  },
  updated: function() {
    // alert('chaeeenge')
    this.resizeIframe()
    this.positionVisualContent()
    var vm = this
    setTimeout(function() {
      vm.positionVisualContent()
    }, 250)
    setTimeout(function() {
      vm.positionVisualContent()
    }, 500)
    setTimeout(function() {
      vm.positionVisualContent()
    }, 1000)

  },

  mounted: function() {

    var vm = this

    var vm = this
    document.addEventListener("DOMContentLoaded", this.positionVisualContent());

    window.addEventListener('resize', _.debounce(function() {
      vm.positionVisualContent()
      vm.resizeIframe()


    }, 250));
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
@import "../../node_modules/include-media/dist/_include-media.scss";

.visualProject {

    background: inherit;
    display: block;
    margin-bottom: $paddingWindowDesktop;
    @include media("<desktop") {
      padding-bottom: $paddingWindowMobile;
        margin-bottom: 0;
    }
    position: absolute;
    width: 100%;

    .introWrapper {

        .fixedIntroInnerWrapper {
            display: inline-block;
        }

        &.fixedIntro {
            position: fixed;
            @include media("<desktop") {
              position: relative;
              padding-bottom: 0;


            }

        }
        font-size: $fontSizeWindowMedium;
        @include media("<desktop") {
            font-size: $fontSizeWindowLarge;
            padding: $paddingWindowMobile;

        }

        @include media("<phone") {
            font-size: $fontSizeWindowMediumFixed;

        }


        line-height: 1;
        color: inherit;
        background: inherit;
        width: 100%;
        height: 100%;
        position: relative;
        line-height: $lineHeight105;
        padding: $paddingWindowDesktop;
        @include media("<desktop") {
            padding: $paddingWindowMobile;
        }
        z-index: 0;

        .keywordHeader {
            width: 100%;
            line-height: 1;
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
            @include media("<desktop") {
                .keywords {
                    width: 100%;
                    padding-left: 0;
                    padding-top: $paddingWindowMobile;

                }
                div {
                    width: 100%;
                    padding-right: 0;
                }
            }

        }

        .fixedIntroHalf {
            width: 50%;
            float: left;
            // display: table-cell;
            &:first-of-type {
                padding-right: $paddingWindowDesktop;

            }
            @include media("<desktop") {
                width: 100%;
                &:first-of-type {
                    padding-right: 0;

                }
            }
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
            padding-top: $paddingWindowDesktop;
            padding-left: $paddingWindowDesktop;
            padding-right: $paddingWindowDesktop;
            &:last-of-type {
                padding-bottom: $paddingWindowDesktop;
            }
            @include media("<desktop") {
                padding-top: $paddingWindowMobile;
                padding-left: $paddingWindowMobile;
                padding-right: $paddingWindowMobile;
                &:last-of-type {
                    padding-bottom: $paddingWindowMobile;
                }

            }

            width: 100%;

            .mediaCaption {
                font-size: $fontSizeWindowSmall;
                margin-top: $paddingWindowDesktop;
                padding: $paddingWindowDesktop;
                border-radius: $fontSizeWindowSmall;
                border: $paddingWindowDesktop/10 solid;
                @include media("<desktop") {
                    font-size: $fontSizeWindowLarge;

                    margin-top: $paddingWindowMobile;
                    padding: $paddingWindowMobile;
                    border-radius: $fontSizeWindowMedium;
                    border: $paddingWindowMobile/10 solid;

                }

                @include media("<phone") {
                    font-size: $fontSizeWindowMediumFixed;
                }

                max-width: 50% !important;
                width: auto !important;
                display: block;
                // float: right;
                margin-left: 50%;

                &.white_on_black {
                    background: black;
                    .visualContentTextarea {
                        background: white;
                        color: black;
                        border-color: black;

                    }
                }
                &.black_on_white {
                    background: white;
                    .visualContentTextarea {
                        background: black;
                        color: white;
                        border-color: white;
                    }
                }
                &.white_on_red {
                    background: red;
                    .visualContentTextarea {
                        background: white;
                        color: red;
                        border-color: red;

                    }
                }
                &.black_on_green {
                    background: lime;
                    .visualContentTextarea {
                        background: white;
                        border-color: white;
                    }
                }
            }

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
                    @include media("<desktop") {
                      max-width: 100%;

                    }
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
@import "../../node_modules/include-media/dist/_include-media.scss";

.visualProject {

    // div{
    .Half.left,
    .Half.right {
        width: 50%;
        @include media("<desktop") {
            width: 100%;

        }
        // display: none;
        iframe {
            width: 100%;
        }
    }

    .Half.left {
        margin: initial !important;
    }

    // }

    .Half {
        iframe {
            width: 50%;
            @include media("<desktop") {
                width: 100%;

            }
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
    .fixedIntroHalf {
        *:first-of-type {
            margin-top: 0;
        }
        *:last-of-type {
            margin-bottom: 0;
        }
    }
    @include media("<desktop") {
        .fixedIntroHalf:last-of-type {
            *:first-of-type {
                margin-top: $paddingWindowMobile;
            }
        }
    }

}
</style>
