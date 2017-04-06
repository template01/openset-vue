
<template>
<div id="visualView">

  <!-- <button @click="counter++">click</button> -->
  <!-- {{counter}} -->
  <div v-for="(item, index) in newsAndProjectsOrdered">



    <template v-if="item.type == 'project'">
      <template v-if="item.acf.simplestyle == 'Red'">
        <div class="floatItem project projectRed" v-bind:class="randomAnimation()">
          <h3>
            <router-link :to="{path: 'project/'+item.id}" v-html="item.title.rendered"></router-link>

          </h3>
          <!-- {{item.acf.simplestyle}} -->

        </div>
</template>

      <template v-else-if="item.acf.simplestyle == 'Tall'">
<div class="floatItem project projectTall">
  <h3>
            <router-link :to="{path: 'project/'+item.id}" v-html="item.title.rendered"></router-link>

          </h3>
  <!-- {{item.acf.simplestyle}} -->

</div>
</template>

      <template v-else>
<div class="floatItem project">
  <h3>
            <router-link :to="{path: 'project/'+item.id}" v-html="item.title.rendered"></router-link>
          </h3>
  <!-- {{item.acf.simplestyle}} -->

</div>
</template>


    </template>


    <template v-else-if="item.type == 'news_announcements'">
<div class="floatItem splashNews">

  <div class="cornered">
    <h1>
            {{item.title.rendered}}
          </h1>
  </div>
</div>
</template>


  </div>




</div>
</template>

<script>
export default {
  name: 'indexGraphic',
  data() {
    return {
      // counter:0,
    }
  },

  props: ['newsProp', 'projectsProp', 'newsAndProjectsProp'],

  computed: {
    newsAndProjectsOrdered: function() {
      return _.orderBy(this.newsAndProjectsProp, 'date', ['desc'])
    },

  },

  methods: {
    packery: function() {
      var elem = document.querySelector('#visualView');
      var pckry = new Packery(elem, {
        itemSelector: '.floatItem',
        transitionDuration: 0,
      });
    },

    randomAnimation: function() {
      var myArray = ['addAnimationA', 'addAnimationB', 'addAnimationC', 'addAnimationD', 'addAnimationE']
      return myArray[Math.floor(Math.random() * myArray.length)];

    }

  },

  updated: function() {
    this.packery()
    this.packery()
  },

  watch: {

    // newsAndProjectsOrdered:function(val){
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
// #44d2ff

#visualView {
    background: lime;
}
.floatItem {
    float: left;
    min-height: 200px;
    background: rgb(244, 244, 244);
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
            font-size: 4vw;
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

    &.projectTall {
        width: 20%;
        min-height: 480px;

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
        word-break: break-all;
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
    margin-left: 1px;
    margin-bottom: -1px;

    .cornered {

        display: flex;
        justify-content: center;
        align-items: center;
        background: black;
        position: relative;
        margin: 20px 0 20px -1px;
        padding: 0 20px;
        min-height: 200px;
        color: white;
        text-align: center;
        a,
        h2,
        h3 {
            font-size: 4vw;
            // line-height: 8vw;
            word-break: break-all;
            align-self: flex-start;
            text-align: right;
            color: lime;

            // float: right;
            margin: 0;
        }

    }
    .cornered:after,
    .cornered:before {
        box-sizing: border-box;
        border-style: solid;
        border-color: transparent;
        border-width: 20px;
        content: "";
        display: block;
        left: 0;
        position: absolute;
        width: 100%;
    }
    .cornered:before {
        border-top-width: 0;
        border-bottom-color: black;
        top: -20px;
    }
    .cornered:after {
        border-bottom-width: 0;
        border-top-color: black;
        bottom: -20px;
    }

    // position: relative;
    width: 33.33333%;
    // border-radius: 20px;

}
</style>
