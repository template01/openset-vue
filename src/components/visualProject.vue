<template>
<div class="visualProject">
  <div class="fixedIntro">
    <div class="fixedIntroInner">
      <div v-html="title">
      </div>
      <div v-html="intro">
      </div>
    </div>
  </div>
  <div class="visualContent" v-if="positionVisualContentTop>1" v-bind:style="{'top':positionVisualContentTop+'px'}">

    <!-- {{content}} -->
    <div class="visualContentSingle" v-for="item in content">
      <!-- {{item}} -->
      <div v-if="item.acf_fc_layout == 'visual_report_media'">
        <img class="alignLeft" v-bind:class="[item.align,item.width]" v-bind:src="item.visual_report_media_content.sizes.large" />
      </div>
      <div class="visualContentTextarea" v-bind:class="[item.align,item.width]" v-if="item.acf_fc_layout == 'visual_report_textarea'" v-html="item.visual_report_textarea_content">
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
  props: ['title', 'intro', 'content'],
  methods: {
    positionVisualContent: function() {
      // alert('mounted')
      this.positionVisualContentTop = this.$el.querySelector('.fixedIntroInner').offsetHeight / 2 + 40
    }
  },
  mounted: function() {
    this.positionVisualContent()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import "../assets/scss/globalVars.scss";

.visualProject {
    background: black;
    display: block;

    .fixedIntro {
        font-size: $fontSizeWindowMedium;
        position: fixed;
        color: white;
        background: black;
        width: 100%;
        height: 100%;
        columns: 2;
        -webkit-columns: 2;
        line-height: $lineHeight105;
        padding: $paddingWindowMedium;
        z-index: 0;
    }

    .visualContent {
        top: 400px;
        // background: black;
        color: white;
        z-index: 1;
        position: relative;

        .visualContentSingle {
            clear: both;
            padding: $paddingWindowMedium;
            width: 100%;

            img {
                max-width: 100%;
            }
            *:not(.left):not(.right) {
                display: block;
                margin: 0 auto;
            }
            .right {
                float: right;
                display: inline-block;

            }

            .Half {
                max-width: 50%;
            }

            .visualContentTextarea {
                background: black;
                line-height: $lineHeight1;

                padding: $paddingWindowMedium;
                border-radius: $paddingWindowLarge;
                font-size: $fontSizeWindowLarge;

            }
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
.visualProject {
    .visualContentTextarea {
        p {
            margin: 0;
        }
    }
}
</style>
