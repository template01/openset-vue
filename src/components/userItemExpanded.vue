<template>
<div>
  <!-- <div  class="userItemExpandedTop">
    </div> -->
  <div class="userItemExpanded" v-bind:class="{isExpand:isExpanded}">
    <!-- {{userContent.keys(obj).length === 0}} -->
    <div class="userMenu">
      <span @click="isExpanded=false" class="close black pointy userClose"></span>
      <p class="userTitle">
        USER:
        <!-- <i class="fa fa-userpaper-o" aria-hidden="true"></i> -->
      </p>
    </div>
    <div>
      <div class="userContentWrapper">
        <h1 class="loading" v-if="!loaded">LOADING...</h1>

        <div v-if="loaded" class="userContentReal" >
          <p v-html="userName">

          </p>
          <div v-html="userDescription">
          </div>
          <br />
          <div v-html="userExtra">
          </div>
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
      userName: '',
      userDescription: '',
      userContent:'',
      userExtra:'',
      date: '',
      projectStudentNames: [],
      loaded: false,
      isExpanded: false

    }
  },
  components: {
    singleHeader
  },
  props: ['slug'],
  methods: {

  },
  mounted: function() {
    // this.getContent(this.slug)
  },
  methods: {
    getContent: function(itemIdParam) {
      this.loaded = false

      this.$http.get('http://community.openset.nl/backend/wp-json/wp/v2/users?slug=' + itemIdParam).then(function(response) {
        this.userContent = response.body
        this.userName = response.body[0].name
        this.userDescription = response.body[0].description
        this.userExtra = response.body[0].acf.extra_info
        // this.userContentRendered = response.body.content.rendered
        // this.userTitleRendered = response.body.title.rendered
        // this.date = response.body.date
        // this.projectStudentNames = this.userContent.acf.student_name.split(",")
        this.loaded = true

      }, response => {
        // error callback
        this.NotFoundState = false
      });

    }
  },
  watch: {
    slug: function(){
      if(this.slug.length >0){
        this.isExpanded = true
        this.getContent(this.slug)
      }
    },
    // itemId: function() {
    //   this.getContent(this.itemId)
    // }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import "../assets/scss/globalVars.scss";
@import "../../node_modules/include-media/dist/_include-media.scss";

.userMenu {

    .userTitle {
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

    .userClose {
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

.userItemExpandedTop {
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
.userItemExpanded {
    font-family: Calibre;
    text-align: left;
    // background: blue;
    overflow-y: auto;
    background: white;
    width: 33.333%;
    position: fixed;
    top: 4vw;

    @include media("<desktop") {
      top: 8vw;
    }

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
    .userContentWrapper {
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

.userContentReal {
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
