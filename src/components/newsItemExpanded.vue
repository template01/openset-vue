<template>
<div>
  <!-- <div  class="newsItemExpandedTop">
    </div> -->
  <div class="newsItemExpanded" v-bind:class="{isExpand:isExpanded}" v-if="Object.keys(newsContent).length >0">
    <!-- {{newsContent.keys(obj).length === 0}} -->
    <div class="newsMenu">
      <span @click="$emit('closeNews')" class="close black pointy newsClose"></span>
      <p class="newsTitle">
        <i class="fa fa-newspaper-o" aria-hidden="true"></i>
      </p>
    </div>
    <div>
      <div class="newsContentWrapper">
        <h1 class="loading" v-if="!loaded">LOADING...</h1>
        <singleHeader v-if="loaded" :nameProp='projectStudentNames' :dateProp="date" :titleProp="newsTitleRendered"></singleHeader>

        <div v-if="loaded" class="newsContentReal" v-html="newsContentRendered">
        </div>

      </div>
    </div>
  </div>

</div>
</template>

<script>
import singleHeader from '@/components/singleHeader'

export default {
  name: 'hello',
  data() {
    return {
      msg: 'Welcome to Your Vue.js App',
      positionVisualContentTop: 0,
      newsContent: '',
      newsTitleRendered: '',
      newsContentRendered: '',
      date: '',
      projectStudentNames: [],
      loaded: false,

    }
  },
  components: {
    singleHeader
  },
  props: ['itemId', 'isExpanded'],
  methods: {

  },
  mounted: function() {
    this.getContent(this.itemId)
  },
  methods: {
    getContent: function(itemIdParam) {

      this.$http.get('http://placeholder-b.template-studio.nl/wp-json/wp/v2/news_announcements/' + itemIdParam).then(function(response) {

        this.newsContent = response.body
        this.newsContentRendered = response.body.content.rendered
        this.newsTitleRendered = response.body.title.rendered
        this.date = response.body.date
        this.projectStudentNames = this.newsContent.acf.student_name.split(",")
        this.loaded = true

      }, response => {
        // error callback
        this.NotFoundState = false
      });

    }
  },
  watch: {
    itemId: function() {
      this.getContent(this.itemId)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import "../assets/scss/globalVars.scss";
@import "../../node_modules/include-media/dist/_include-media.scss";

.newsMenu {
    .newsTitle {
        width: calc(100% - 100px);
        float: left;
        margin: 0;
        line-height: 50px;
        margin-left: $paddingWindowDesktop;
        font-size: $fontSizeWindowLarge !important;
        @include media("<phone") {
            font-size: 40px !important;
            margin-top: 4px;
        }

    }

    .newsClose {
        float: left;
        &::after {
            background: blue;
        }

        &::before {
            background: blue;
        }
        &:hover {
            &::after,
            &::before {
                background: red;
            }
        }

    }
    clear: both;
    display: inline-block;
}

.newsItemExpandedTop {
    background: blue;
    width: 33.333%;
    @include media("<desktop") {
        width: 50%;
    }
    @include media("<phone") {
        width: 100%;
    }

    right: 0;
    height: $paddingWindowLarge;
    position: fixed;
    top: 0;

}
.newsItemExpanded {
    // background: blue;
    overflow-y: auto;
    background: white;
    width: 33.333%;


    .loading{
      font-weight: normal;
      margin: 0;
      line-height: 1;
      @include media("<desktop") {
        font-size: $fontSizeWindowLarge;
      }
      @include media("<phone") {
        font-size: $fontSizeWindowXLarge;
      }


    }
    .newsContentWrapper {
        margin-top: $paddingWindowDesktop;
        @include media("<desktop") {
            margin-top: $paddingWindowDesktop;
        }
    }
    @include media("<desktop") {
        width: 50%;
        right: -120%;

    }
    @include media("<phone") {
        width: calc(100% - 4vw);
        right: -120%;

    }

    z-index: 2;
    right: -50%;
    position: fixed;
    color: blue;
    z-index: 999999;
    -webkit-transition: right 0.5s ease;
    -moz-transition: right 0.5s ease;
    -o-transition: right 0.5s ease;
    -ms-transition: right 0.5s ease;
    transition: right 0.5s ease;

    &.isExpand {
        right: 0;
        // transition: right 3s;

    }

    // -webkit-box-shadow: 0px -100px 0px 0px blue;
    // -moz-box-shadow: 0px -100px 0px 0px blue;
    // box-shadow: 0px -100px 0px 0px blue;
    @include media("<desktop") {

        -webkit-box-shadow: -2vw 0 0 0 blue;
        -moz-box-shadow: -2vw 0 0 0 blue;
        box-shadow: -2vw 0 0 0 blue;

    }
    @include media("<phone") {

        -webkit-box-shadow: -4vw 0 0 0 blue;
        -moz-box-shadow: -4vw 0 0 0 blue;
        box-shadow: -4vw 0 0 0 blue;

    }

    -webkit-box-shadow: -2vw 0 0 0 blue;
    -moz-box-shadow: -2vw 0 0 0 blue;
    box-shadow: -2vw 0 0 0 blue;

    // height: 500px;
    -webkit-overflow-scrolling: touch; /* lets it scroll lazy */
    height: calc(100% - #{$paddingWindowLarge});
    @include media("<desktop") {
        height: calc(100% - 8vw);
    }
    @include media("<phone") {
        height: calc(100% - 16vw);
    }

    padding: $paddingWindowDesktop;
    @include media("<desktop") {
        padding: $paddingWindowMobile;
        font-size: $fontSizeWindowLarge;
    }
    @include media("<phone") {
        font-size: $fontSizeWindowXLarge;
    }

    font-size: $fontSizeWindowMedium;
    //
    // &::-webkit-scrollbar {
    //     width: 0;
    //     // background-color: #F5F5F5;
    // }

}
</style>

<style lang="scss">
@import "../assets/scss/globalVars.scss";
@import "../../node_modules/include-media/dist/_include-media.scss";

.newsContentReal {
    *:first-child {
        margin-top: $paddingWindowDesktop;
        @include media("<desktop") {
            margin-top: $paddingWindowMobile;
        }
    }

    a{
      color: inherit;
      text-decoration: none;
      -webkit-box-shadow: inset 0px -2px 0px 0px blue;
      -moz-box-shadow: inset 0px -2px 0px 0px blue;
      box-shadow: inset 0px -2px 0px 0px blue;
    }
}
</style>
