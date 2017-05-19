
<template>
<div id="visualView">



  <!-- <button @click="counter++">click</button> -->
  <!-- {{counter}} -->
  <newsItemExpanded v-on:closeNews="newsItemExpandedTrue=false" v-bind:itemId="newsItemExpandedId" v-bind:isExpanded="newsItemExpandedTrue"></newsItemExpanded>

  <div id="postContent">

    <div v-for="(item, index) in newsAndProjectsAndReportsOrdered" :key="item.id">



      <template v-if="item.type == 'project'">

      <template v-if="item.acf.default_project">
        <div class="floatItem project projectRed" v-bind:class="randomAnimation()" v-once>
          <h3>
            <router-link :to="{path: 'project/'+item.slug}" v-html="item.title.rendered"></router-link>

          </h3>
          <div class="arrowsLink"></div>

          <!-- {{item.acf.simplestyle}} -->

        </div>
</template>

      <template v-else-if="item.acf.visual_report">
<div class="floatItem project visualReport">
  <router-link :to="{path: 'project/'+item.slug}">
  <div class="cornered">

  </div>
  <h3  v-html="item.title.rendered">


  </h3>
</router-link>
  <!-- {{item.acf.simplestyle}} -->
        <div class="arrowsLink"></div>
</div>
</template>

      <template  v-else-if="item.acf.sketch_project">
<div class="floatItem project visualReport">


  <router-link :to="{path: 'project/'+item.slug}">
  <div class="cornered white">
  </div>
  <h3  class="whiteTitle" v-html="item.title.rendered">
  </h3>
</router-link>

<div class="arrowsLink"></div>


  <!-- {{item.acf.simplestyle}} -->

</div>
</template>


      <template v-else>
<div class="floatItem project">
  <h3>
            <router-link :to="{path: 'project/'+item.slug}" v-html="item.title.rendered"></router-link>
          </h3>
  <!-- {{item.acf.simplestyle}} -->

</div>
</template>


    </template>


    <template v-else-if="item.type == 'news_announcements'">
<div class="floatItem splashNews"  @click="renderNewsItem(item.id)">

  <div class="blueCircle" v-bind:class="randomNewsBorder()" v-once>
    <h1>
            {{item.title.rendered}}
          </h1>


          <!-- <div v-for="n in 3" class="arrowsLinkNews" v-bind:class="randomNewsStars()" v-once></div> -->
  </div>
  <div class="arrowsLink"></div>

</div>
</template>

<template v-else-if="item.type == 'editorreport'">
<div class="floatItem project report">
  <router-link :to="{path: 'project/'+item.slug}">

    <span class="largeLetter">
    <span v-html="item.title.rendered.charAt(0)">

    </span>
    </span>
    <span v-if="item.acf.extensive_report_or_assignment==='Assignment'" v-html="item.acf.extensive_report_or_assignment" class="type smallReport">
  </span>
    <span v-if="item.acf.extensive_report_or_assignment==='Report'" v-html="item.acf.extensive_report_or_assignment" class="type smallReport">
  </span>

    <span class="title smallReport" v-html="item.title.rendered">
    man
  </span>

  </router-link>
  <div class="arrowsLink"></div>
</div>
</template>



  </div>


  </div>

  <div @click="$emit('getmoreContentReportEmit',getMoreContentAll); $emit('getmoreContentProjectsEmit',getMoreContentAll); $emit('getmoreContentNewsEmit',getMoreContentAll); getMoreContentAll++" id="LoadMore">
    <h1 >Load More Content</h1>

  </div>

</div>
</template>

<script>
import newsItemExpanded from '@/components/newsItemExpanded'

export default {
  name: 'indexGraphic',
  data() {
    return {
      // counter:0,
      newsItemExpandedId: '',
      newsItemExpandedTrue: false,
      getMoreContentAll: 2,
    }
  },


  components: {
    newsItemExpanded
  },

  props: ['newsProp', 'projectsProp', 'newsAndProjectsAndReportsProp'],

  computed: {
    newsAndProjectsAndReportsOrdered: function() {
      return _.orderBy(this.newsAndProjectsAndReportsProp, 'date', ['desc'])
    },


  },

  methods: {



    renderNewsItem: function(indexParam) {
      console.log('hey')
      this.newsItemExpandedId = indexParam
      this.newsItemExpandedTrue = true;


    },

    packery: function() {
      var elem = document.querySelector('#visualView');
      var pckry = new Packery(elem, {
        itemSelector: '.floatItem',
        transitionDuration: 0,
      });
    },


    randomNewsBorder: function() {
      var myArray = ['borderA', 'borderB']
      return myArray[Math.floor(Math.random() * myArray.length)];

    },

    randomNewsStars: function() {
      var myArray = ['arrowsLinkNewsA', 'arrowsLinkNewsB', 'arrowsLinkNewsC', 'arrowsLinkNewsD', '']
      return myArray[Math.floor(Math.random() * myArray.length)];

    },


    randomAnimation: function() {
      var myArray = ['addAnimationA', 'addAnimationB', 'addAnimationC', 'addAnimationD', 'addAnimationE']
      return myArray[Math.floor(Math.random() * myArray.length)];

    },



  },

  updated: function() {
    this.packery()
    this.packery()
  },

  watch: {

    // newsAndProjectsAndReportsOrdered:function(val){
    //
    //   this.packery()
    //   this.packery()
    //
    // }
  },
  activated: function() {
    // var vm = this;
    // setTimeout(function(){
    //   vm.packery()
    // },1000)
    this.packery()
    this.packery()

  }



}
</script>

<style lang="scss" scoped>
@import "../assets/scss/globalVars.scss";

#visualView {
    background: lime;
    min-height: 100vh;
    overflow-x: hidden;
    overflow-y: hidden;
    margin-bottom: $paddingWindowLarge;

    -webkit-box-shadow: inset 0px -1px 0px 0px red;
    -moz-box-shadow: inset 0px -1px 0px 0px red;
    box-shadow: inset 0px -1px 0px 0px red;
    #LoadMore {
        cursor: pointer;
        box-shadow: 0 0 -1px -1px blue;
        background: red;
        position: fixed;
        bottom: 0;
        z-index: -1;
        width: 100%;
        height: $paddingWindowLarge;
        // width: $paddingWindowLarge;
        font-weight: normal;

        float: right;
        display: flex;
        align-items: center;
        height: $paddingWindowLarge;
        justify-content: center;

        h1{
          font-size: $fontSizeWindowLarge;
          color: white;
          font-weight: normal;
        }
    }



}
.floatItem {
    float: left;
    min-height: 16.666666vw;

    // background: rgb(244, 244, 244);
    justify-content: center;

    // h2,h3{
    //   font-weight: normal;
    //   font-size: 2vw;
    // }

    h1 {
        font-weight: normal;

    }

    a {
        color: inherit;
        text-decoration: none;
        font-weight: normal;
        font-size: 2vw;

    }

    text-transform: uppercase;
    letter-spacing: 1px;
}

.project {

    &.report {
        width: 16.666666%;
        height: 33.33333333vw;
        background: black;
        a {
            cursor: pointer;
            width: 100%;
            position: absolute;
            height: 100%;
            // &:hover{
            //   .smallReport {
            //
            //       opacity: 1;
            //   }
            //
            // }
        }

        .smallReport {
            text-align: center;
            position: absolute;
            width: 100%;
            left: 0;
            line-height: $fontSizeWindowMedium;
            font-size: $fontSizeWindowMedium;
            // opacity: 0;
        }

        .type {
            top: 0;
            padding: 1vw;

        }

        .title {
            bottom: 0;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            padding: 1vw;
        }

        .largeLetter {
            height: 100%;
            overflow: hidden;
            span {
                overflow: hidden;
                position: absolute;
                width: 100%;
                color: lime;
                text-align: center;
                line-height: 33.3333333vw;
                left: -0.25vw;

                font-size: 26.666vw;
                top: -1.3vw;
                transform: scaleY(1.4);

                // font-family: lyon;
                // font-size: 20vw;
                // top: -0vw;
                // transform: scaleY(1.6);

                margin: 0;
                pointer-events: none;
            }
        }
    }

    .arrowsLink {
        background: lime;
        pointer-events: none;
        position: absolute;
        // display: none;
        visibility: hidden;
        opacity: 0;
        // transition:opacity 1s linear;
        transition-delay: 0.0s;

        left: 100%;
        color: red;
        width: 100vw;
        z-index: 1;
        height: 100%;
        top: 0;
        background-image: url('../assets/svg/background.svg');
        background-size: 5.1vw;
        // background-repeat: repeat-x;
        animation: animatedBackground 40s linear infinite;
    }
    @keyframes animatedBackground {
        from {
            background-position: 0 0;
        }
        to {
            background-position: 100% 0;
        }
    }
    &:hover {
        .arrowsLink {
            // display: block;
            transition-delay: 0.3s;

            opacity: 1;
            visibility: visible;
        }
    }
    width: 50%;

    &.projectRed {
        width: 33.333%;
        display: flex;
        align-items: center;
        background: red;
        border-radius: 13% 43% 60% 90%;
        color: white;
        justify-content: center;

        &.addAnimationA {
            // margin: 20px;
            -webkit-animation: mymovea 5s infinite forwards;
            /* Chrome, Safari, Opera */
            animation: mymovea 5s infinite forwards;

        }

        &.addAnimationB {
            // margin: 20px;
            -webkit-animation: mymoveb 9s infinite forwards;
            /* Chrome, Safari, Opera */
            animation: mymoveb 9s infinite forwards;

        }

        &.addAnimationC {
            // margin: 20px;
            -webkit-animation: mymovec 7s infinite forwards;
            /* Chrome, Safari, Opera */
            animation: mymovec 7s infinite forwards;

        }

        &.addAnimationD {
            // margin: 20px;
            -webkit-animation: mymoved 8s infinite forwards;
            /* Chrome, Safari, Opera */
            animation: mymoved 8s infinite forwards;

        }

        &.addAnimationE {
            // margin: 20px;
            -webkit-animation: mymovee 6s infinite forwards;
            /* Chrome, Safari, Opera */
            animation: mymovee 6s infinite forwards;

        }

        a,
        h2,
        h3 {
            font-size: 3.5vw;
            // line-height: 8vw;
            color: white;

            word-break: break-all;
            align-self: center;
            // float: right;
            margin: 0;
        }
    }
    @-webkit-keyframes mymovea {
        25% {
            border-radius: 12% 66% 98% 23%;
        }
        50% {
            border-radius: 6% 33% 88% 43%;
        }
        75% {
            border-radius: 44% 66% 23% 87%;
        }
        100% {
            border-radius: 13% 43% 60% 90%;
        }
    }
    @-webkit-keyframes mymoveb {
        25% {
            border-radius: 75% 40% 20% 39%;
        }
        50% {
            border-radius: 44% 87% 21% 55%;
        }
        75% {
            border-radius: 23% 93% 73% 10%;
        }
        100% {
            border-radius: 13% 43% 60% 90%;
        }
    }
    @-webkit-keyframes mymovec {
        25% {
            border-radius: 23% 93% 73% 10%;
        }
        50% {
            border-radius: 44% 87% 21% 55%;
        }
        75% {
            border-radius: 6% 33% 88% 43%;
        }
        100% {
            border-radius: 13% 43% 60% 90%;
        }
    }
    @-webkit-keyframes mymoved {
        25% {
            border-radius: 26% 21% 37% 90%;
        }
        50% {
            border-radius: 14% 84% 21% 66%;
        }
        75% {
            border-radius: 19% 90% 81% 32%;
        }
        100% {
            border-radius: 13% 43% 60% 90%;

        }
    }
    @-webkit-keyframes mymovee {
        25% {
            border-radius: 21% 34% 45% 10%;
        }
        50% {
            border-radius: 90% 22% 88% 32%;
        }
        75% {
            border-radius: 89% 1% 89% 21%;
        }
        100% {
            border-radius: 13% 43% 60% 90%;

        }
    }

    &.visualReport {
        width: 33.333%;
        // display: flex;
        // justify-content: center;
        // align-items: center;
        a,
        h2,
        h3 {
            width: 100%;
            font-weight: normal;
            font-size: 3.5vw;
            // line-height: 8vw;
            // word-break: break-all;
            align-self: center;
            color: white;
            text-align: center;
            // float: right;
            margin: 0;
            max-height: 16.666666vw;
            // white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
        }

        h3 {
            position: absolute;
            color: white;
            top: 50%;
            -webkit-transform: translateY(-50%);
            -ms-transform: translateY(-50%);
            transform: translateY(-50%);

            &.whiteTitle {
                color: black;

            }
        }

        .cornered {

            display: flex;
            justify-content: center;
            align-items: center;
            background: black;
            position: relative;
            margin: 3vw 0;
            padding: 0 3vw;
            min-height: calc(16.666666vw - 6vw);
            color: white;
            text-align: center;
            &.white {

                background: white;
                &:after {
                    border-top-color: white;
                    -webkit-box-shadow: 0 -2vw 0 0 white;
                    -moz-box-shadow: 0 -2vw 0 0 white;
                    box-shadow: 0 -2vw 0 0 white;
                }
                &:before {
                    border-bottom-color: white;
                    -webkit-box-shadow: 0 2vw 0 0 white;
                    -moz-box-shadow: 0 2vw 0 0 white;
                    box-shadow: 0 2vw 0 0 white;
                }

            }
            // a,
            // h2,
            // h3 {
            //     font-size: 4vw;
            //     // line-height: 8vw;
            //     word-break: break-all;
            //     align-self: flex-start;
            //     text-align: right;
            //     color: lime;
            //
            //     // float: right;
            //     margin: 0;
            // }

        }
        .cornered:after,
        .cornered:before {
            box-sizing: border-box;
            border-style: solid;
            border-color: transparent;
            border-width: 3vw;
            content: "";
            display: block;
            left: 0;
            position: absolute;
            width: 100%;
        }
        .cornered:before {
            border-top-width: 0;
            border-bottom-color: black;
            top: -3vw;
            -webkit-box-shadow: 0 2vw 0 0 rgba(0,0,0,1);
            -moz-box-shadow: 0 2vw 0 0 rgba(0,0,0,1);
            box-shadow: 0 2vw 0 0 rgba(0,0,0,1);
        }
        .cornered:after {
            border-bottom-width: 0;
            border-top-color: black;
            bottom: -3vw;
            -webkit-box-shadow: 0 -2vw 0 0 rgba(0,0,0,1);
            -moz-box-shadow: 0 -2vw 0 0 rgba(0,0,0,1);
            box-shadow: 0 -2vw 0 0 rgba(0,0,0,1);
        }

    }

    &.projectTall {
        width: 20%;
        min-height: 4$paddingWindowLarge;

        a,
        h2,
        h3 {
            font-size: 7vw;
            line-height: 5.5vw;
            word-break: break-all;
            align-self: flex-start;
            margin: 0;
            text-align: left;
            color: black;
        }
        // border:1px solid gray;
    }

    a,
    h2,
    h3 {
        font-size: 4vw;
        // line-height: 8vw;
        // word-break: break-all;
        align-self: flex-start;
        text-align: right;
        color: lime;

        // float: right;
        margin: 0;
    }
}

.splashNews {
    min-height: 0;

    background-color: lime;
    // margin-left: 1px;
    // margin-bottom: -1px;
    width: 16.666666%;

    .arrowsLink {
        background: white;
        pointer-events: none;
        position: absolute;
        // display: none;
        visibility: hidden;
        opacity: 0;
        // transition:opacity 1s linear;
        transition-delay: 0.0s;

        left: 100%;
        color: red;
        width: 100vw;
        z-index: 1;
        height: 100%;
        top: 0;
        background-size: 5.1vw;

        background-image: url('../assets/svg/backgroundBlue.svg');
        // background-repeat: repeat-x;
        animation: animatedBackgroundNews 40s linear infinite;
    }
    @keyframes animatedBackgroundNews {
        from {
            background-position: 0 0;
        }
        to {
            background-position: -100% 0;
        }
    }
    &:hover {
        .arrowsLink {
            // display: block;
            transition-delay: 0.3s;

            opacity: 1;
            visibility: visible;
        }
    }
    // position: relative;
    // border-radius: 20px;

    .arrowsLinkNews {
        pointer-events: none;
        position: absolute;
        visibility: hidden;
        opacity: 0;
        transition-delay: 0.0s;

        z-index: 1;
        // top: -20px;
    }
    .arrowsLinkNewsA {
        background: blue;
        left: calc(100% - 2vw);
        top: calc(100% - 4vw);
        border-radius: 100%;
        width: 8vw;
        height: calc(8vw);
        background-image: url('../assets/svg/asterix.svg');
        background-position: center;
        // background-repeat: repeat-x;
        animation: animatedCircleA 10s linear infinite;
    }
    @keyframes animatedCircleA {
        from {
            background-position: 0 0;
        }
        to {
            background-position: 100% 100%;
        }
    }

    .arrowsLinkNewsB {
        background: blue;
        left: -2.5vw;
        top: calc(100% - 1vw);
        border-radius: 100%;
        width: 6vw;
        height: 6vw;
        background-position: center;

        background-image: url('../assets/svg/asterix.svg');
        // background-repeat: repeat-x;
        animation: animatedCircleB 25s linear infinite;
    }
    @keyframes animatedCircleB {
        from {
            -webkit-transform: rotate(0deg);

        }
        to {
            -webkit-transform: rotate(360deg);
        }
    }

    .arrowsLinkNewsC {
        background: blue;
        left: -40px;
        top: -40px;
        border-radius: 100%;
        width: $paddingWindowLarge;
        height: $paddingWindowLarge;
        background-position: center;

        background-image: url('../assets/svg/asterix.svg');
        // background-repeat: repeat-x;
        animation: animatedCircleC 20s linear infinite;
    }
    @keyframes animatedCircleC {
        from {
            -webkit-transform: rotate(0deg);

        }
        to {
            -webkit-transform: rotate(360deg);
        }
    }

    .arrowsLinkNewsD {
        background: blue;
        left: 50%;
        top: -100px;
        border-radius: 100%;
        width: 40px;
        height: 40px;
        background-position: center;

        background-image: url('../assets/svg/asterix.svg');
        // background-repeat: repeat-x;
        animation: animatedCircleD 10s linear infinite;
    }
    @keyframes animatedCircleD {
        from {
            background-position: 0 0;
        }
        to {
            background-position: -100% 0;
        }
    }
    &:hover {
        .arrowsLinkNews {
            // display: block;
            transition-delay: 0.3s;

            opacity: 1;
            visibility: visible;
        }
    }

    .blueCircle {

        &.borderA {
            border-top-color: white;
            border-top-width: 2vw;
            border-top-style: outset;
            border-right-color: blue;
            border-right-width: 2vw;
            border-right-style: inset;
            border-left-color: white;
            border-left-width: 2vw;
            border-left-style: outset;
            border-bottom-color: blue;
            border-bottom-width: 2vw;
            border-bottom-style: inset;

        }

        &.borderB {
            border-top-color: blue;
            border-top-width: 2vw;
            border-top-style: outset;
            border-right-color: blue;
            border-right-width: 2vw;
            border-right-style: inset;
            border-left-color: white;
            border-left-width: 2vw;
            border-left-style: outset;
            border-bottom-color: white;
            border-bottom-width: 2vw;
            border-bottom-style: inset;

        }

        width: 100%;

        display: flex;
        justify-content: center;
        align-items: center;
        background: blue;
        position: relative;
        // border-radius: 100%;
        // margin: 20px 0 20px -1px;
        padding: 0 1vw;
        height: 16.666666vw;
        * {
            // transform: rotate(15deg);
            color: white;
        }
        // min-height: 200px;
        text-align: center;
        font-size: 0.7vw;
        line-height: 0.9;

    }

}
</style>
