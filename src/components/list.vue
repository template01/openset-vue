<template>
<div id="listView" class="">



  <div class="third hideDesktop">

    <div class="thirdInner ">
      <div class="tableStyle">

        <div v-if="aboutTab" class="projectItem greenItem mobileHeader">
          <div class="blockHeader leftAlign ">
            <h1>
                <span  @click="aboutTab=false; $router.replace({path:'/list', hash:''})" class="close black pointy"></span>
                <span>ABOUT</span>


                    </h1>
          </div>
        </div>

        <aboutList v-if="aboutTab" class="projectItem noMarginTop"></aboutList>


      </div>
    </div>
  </div>


  <div class="third defaultBorderThird">
    <div class="thirdInner">



      <!-- <div class="tableStyle red"> -->
      <div class="tableStyle defaultBorder">


        <div class="projectItem mobileHeader" @click="setMobileExpanded('mobileProjects')">
          <div class="blockHeader">
            <h1>
            Projects

          </h1>
          </div>
        </div>

        <div class="projectItem" v-bind:class="{ mobileHeader: mobileProjects }" v-for="item in projectsProp">
          <div class="projectItemInner">

            <router-link :to="{path: 'project/'+item.slug}">
              <span class="projectItemTitle" v-html="item.title.rendered">
          </span>
              <span class="projectItemHalf" v-if="item.acf.student_name">By:
                <span v-for="(name,index) in namesArray(item.acf.student_name)">
                  <span v-if="index<namesArray(item.acf.student_name).length -1" v-html="name[0]+', '"></span>
                  <span  v-else v-html="name[0]"></span>
                </span>

              </span>
              <span class="projectItemHalf" v-html="'Date: '+dateStamp(item.date)">
          </span>
            </router-link>
          </div>
        </div>


        <div class="projectItem LoadMoreProjects" v-bind:class="{ mobileHeader: mobileProjects }" id="" @click="$emit('getmoreContentProjectsListEmit',getMoreContentProjects); getMoreContentProjects++">
          <h1 v-if="getMoreContentProjects - 1 < projectListPage ">Get More Projects</h1>
          <h1 v-else>No More Projects</h1>

        </div>
      </div>
    </div>
  </div>

  <div class="third defaultBorderThird">
    <div class="thirdInner">

      <!-- <div class="tableStyle green"> -->
      <div class="tableStyle defaultBorder">



        <div class="projectItem mobileHeader" @click="setMobileExpanded('mobileReports')">
          <div class="blockHeader">
            <h1>
            Expert Input
          </h1>
          </div>
        </div>

        <div class="projectItem" v-bind:class="{ mobileHeader: mobileReports }" v-for="item in editorreportsProp">
          <div class="projectItemInner">

            <router-link :to="{path: 'expertinput/'+item.slug}">
              <span class="projectItemTitle" v-html="item.title.rendered">
          </span>
              <span class="projectItemHalf" v-if="item.acf.student_name">By:
                <span v-for="(name,index) in namesArray(item.acf.student_name)">
                  <span v-if="index<namesArray(item.acf.student_name).length -1" v-html="name[0]+', '"></span>
                  <span  v-else v-html="name[0]"></span>
                </span>

              </span>
              <span class="projectItemHalf" v-html="'Date: '+dateStamp(item.date)"></span>
            </router-link>
          </div>
        </div>


        <div class="projectItem LoadMoreProjects" v-bind:class="{ mobileHeader: mobileReports }" @click="$emit('getmoreContentReportsListEmit',getMoreContentReports); getMoreContentReports++">
          <h1 v-if="getMoreContentReports - 1 < reportListPage ">Get More Reports</h1>
          <h1 v-else>No More Reports</h1>

        </div>
      </div>
    </div>
  </div>


  <div class="third">

    <div class="thirdInner ">
      <div class="tableStyle">

        <div v-if="aboutTab" class="projectItem greenItem mobileHeader hideMobile">
          <div class="blockHeader leftAlign ">
            <h1>
              <span  @click="aboutTab=false; $router.replace({path:'/list', hash:''})" class="close black pointy"></span>
              <span>ABOUT</span>


                  </h1>
          </div>
        </div>

        <aboutList v-if="aboutTab" class="projectItem noMarginTop hideMobile"></aboutList>


        <div @click="setMobileExpanded('mobileNews'); newsTab=!newsTab; $router.replace({path:'/list', hash:''})" class="projectItem  tabHeader50 blueItem mobileHeader">
          <div class="blockHeader ">
            <h1>NEWS

          </h1>


          </div>
        </div>


        <div @click="setMobileExpanded('mobileSearch'); newsTab=!newsTab;$router.replace({path:'/list', hash:''})" class="projectItem tabHeader50 redItem mobileHeader">
          <div class="blockHeader ">
            <h1>SEARCH

          </h1>
          </div>
        </div>
        <searchList v-if="!newsTab" class="projectItem" v-bind:class="{ mobileHeader: mobileSearch }"></searchList>
        <!-- <aboutList v-if="newsTab" class="projectItem"></aboutList> -->
        <div v-if="newsTab" class="tableStyle blue">

          <div class="projectItem" v-for="(item, index) in newsProp" :expandedx="true" :key="item" v-bind:class="{ mobileHeader: mobileNews }">
            <newsItemListSingle :itemDate="'Date: '+dateStamp(item.date)" :itemStudentNames="item.acf.student_name" :itemIdTitleRendered="item.title.rendered" :itemId="item.id"></newsItemListSingle>
            <!-- <div class="projectItemInner">

                <span class="projectItemTitle" v-html="item.title.rendered">
            </span>
            <span class="projectItemHalf" v-html="'Date: '+dateStamp(item.date)">

            </span>
            <span class="projectItemHalf"  v-html="">
            </span>
            </div> -->

          </div>


          <div class="projectItem LoadMoreProjects" id="" v-bind:class="{ mobileHeader: mobileNews }" @click="$emit('getmoreContentNewsListEmit',getMoreContentNews); getMoreContentNews++">
            <h1 v-if="getMoreContentNews - 1 < newsListPage ">Get More News</h1>
            <h1 v-else>No More News</h1>

          </div>
        </div>
      </div>
    </div>
  </div>

</div>

</div>
</template>

<script>
import newsItemListSingle from '@/components/newsItemListSingle'
import searchList from '@/components/searchList'
import aboutList from '@/components/aboutList'

export default {
  name: 'list',

  components: {
    aboutList,
    newsItemListSingle,
    searchList
  },
  data() {
    return {
      getMoreContentProjects: 2,
      getMoreContentNews: 2,
      getMoreContentReports: 2,
      addBlink: false,
      // getMoreContentProjects:1,
      msg: 'Welcome to Your Vue.js App',
      days: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      mL: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
      mS: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'],
      newsTab: true,
      aboutTab: false,
      mobileProjects: false,
      mobileReports: false,
      mobileNews: false,
      mobileSearch: false,
    }
  },

  props: ['newsProp', 'projectsProp', 'editorreportsProp', 'newsAndProjectsProp', 'projectListPage', 'reportListPage', 'newsListPage'],


  methods: {

    namesArray: function(input){
      var namePairs = []
      var arr = input.split(',')
      var newArr = _(arr).reduce(function(result, value, index) {
        if (index % 2 === 0)
          result.push(arr.slice(index, index + 2));
        return result;
      }, []);
      return newArr
    },

    toggleExpandendNews(index) {
      console.log('click');
      newsProp[index].expandedx = 'assaa';
      // item.expandedx = 'mananana';
    },


    dateStamp: function(input) {


      var day = this.days[new Date(input).getDay()]
      var dayNumber = ("0" + new Date(input).getDate()).slice(-2)

      var year = new Date(input).getFullYear()
      var monthL = this.mL[new Date(input).getMonth()]
      var month = ("0" + (new Date(input).getMonth() + 1)).slice(-2)
      // return this.days[new Date(input).getDay()];
      // return day+"/"+dayNumber+"/"+monthL;
      return dayNumber + "." + month + "." + year;

    },

    addBlinkMethod: function() {
      this.newsTab = true
      // alert(this.newsTab)
      this.addBlink = true
      var vm = this
      setTimeout(function() {
        vm.addBlink = false
      }, 3000)
    },

    setMobileExpanded: function(toggleArea) {



      if (toggleArea === 'mobileProjects') {
        this.mobileProjects = !this.mobileProjects;
        this.mobileNews = false;
        this.mobileSearch = false;
        this.mobileReports = false;
      }
      if (toggleArea === 'mobileSearch') {
        this.mobileSearch = !this.mobileSearch;
        this.mobileNews = false;
        this.mobileProjects = false;
        this.mobileReports = false;

        this.newsTab = true
      }
      if (toggleArea === 'mobileNews') {
        this.mobileNews = !this.mobileNews;
        this.mobileProjects = false;
        this.mobileSearch = false;
        this.mobileReports = false;

        this.newsTab = false

      }
      if (toggleArea === 'mobileReports') {
        this.mobileReports = !this.mobileReports;
        this.mobileNews = false;
        this.mobileSearch = false;
        this.mobileProjects = false;
      }
    }


  },

  mounted() {
    if (this.$route.hash === '#about') {
      // this.addBlinkMethod()
      this.aboutTab = true


    }
  },
  watch: {

    '$route': function(to, from) {
      if (to.hash === "#about") {
        this.aboutTab = true
        this.mobileProjects = false;
        this.mobileReports = false;
        this.mobileNews = false;
        this.mobileSearch = false;

        window.scrollTo(0, 0)

        if (from.path != '/list') {
          // this.addBlinkMethod()
        }
      }
      // alert('change')
    }

  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
@import "../assets/scss/globalVars.scss";
@import "../../node_modules/include-media/dist/_include-media.scss";

#listView {
    background: lime;
    min-height: calc(100vh - $paddingWindowLarg);
    line-height: 1;

    font-size: $fontSizeWindowMedium;
    @include media("<desktop") {
        font-size: $fontSizeWindowLarge;

    }
    @include media("<phone") {
        font-size: $fontSizeWindowXLarge;

    }
    @include media("<desktop") {
        .hideMobile {
            display: none !important;
        }
        .hideDesktop {
            display: block !important;

        }

    }
    @include media(">desktop") {
        .hideMobile {
            display: block !important;
        }
        .hideDesktop {
            display: none !important;

        }

    }

    .blockHeader {
        width: 100%;
        min-height: $paddingWindowLarge;

        h1 {
            line-height: $paddingWindowLarge;

            font-size: $fontSizeWindowLarge;
            font-weight: normal;
            margin-top: 0;
            margin-bottom: 0;
            text-transform: uppercase;
            text-align: center;

        }

        &.leftAlign {
            h1 {
                text-align: left;
                display: flex;
                span {
                    align-self: center;
                    &:nth-of-type(2) {
                        padding-left: $paddingWindowDesktop;

                    }
                }
            }
        }

    }

    .about {

        background: white;
        padding-left: 20px;
        padding-right: 20px;
        padding-bottom: 20px;
        *:first-of-type {
            margin-top: 0;
        }
        *:last-of-type {
            margin-bottom: 0;
        }
    }

    .news {
        // padding-bottom: 20px;
        // margin-top: $paddingWindowMedium;

        background: white;
        width: 100%;
        border-left: $fontSizeWindowMedium solid blue;
        // border-left: 1.5vw solid blue;
        > *:first-of-type {
            margin-top: 0;
        }
        .newsItem {
            display: flex;
            align-items: center;
            min-height: $paddingWindowLarge;
            padding-left: 20px;
            padding-right: 20px;
            color: blue;
            // width: calc(100% - 40px);
            width: 100%;
            border-bottom: $fontSizeWindowMedium solid blue;
            // border-bottom: 1.5vw solid blue;

        }

        h1 {
            color: blue;
            font-weight: normal;
        }
    }

    .tableStyle {
        // margin-top: 20px;

        &.blue {
            background: blue;
            color: white;

            .projectItem {

                h1 {
                    color: blue;
                }

                &#LoadMoreProjects {
                    h1 {
                        color: blue;
                    }
                }
                &:nth-child(odd) {
                    color: blue;

                    a {

                        color: blue;
                    }
                    background: white;

                }
                &:nth-child(even) {
                    &.LoadMoreProjects {
                        h1 {
                            color: white;
                        }
                    }

                }

                a {
                    color: white;
                }

            }

        }

        &.green {
            background: lime;

            .projectItem {
                h1 {
                    color: lime;
                }

                &#LoadMoreProjects {
                    h1 {
                        color: lime;
                    }
                }
                &:nth-child(odd) {
                    a {

                        color: lime;
                    }
                    background: black;

                }
                &:nth-child(even) {
                    &.LoadMoreProjects {
                        h1 {
                            color: black;
                        }
                    }

                }

                a {
                    color: black;
                }

            }

        }

        &.red {
            background: white;

            .projectItem {
                h1 {
                    color: white;
                }

                &#LoadMoreProjects {
                    h1 {
                        color: white;
                    }
                }
                &:nth-child(odd) {
                    a {

                        color: white;
                    }
                    background: red;

                }
                &:nth-child(even) {
                    &.LoadMoreProjects {
                        h1 {
                            color: black;
                        }
                    }

                }

                a {
                    color: black;
                }

            }

        }

        &.defaultBorder {
            @include media("<desktop") {
                .projectItem:first-of-type {
                    border-bottom: 2px solid white;
                }
            }
            // -webkit-box-shadow: inset 0px -3px 0px 0px rgba(0,0,0,1);
            // -moz-box-shadow: inset 0px -3px 0px 0px rgba(0,0,0,1);
            // box-shadow: inset 0px -3px 0px 0px rgba(0,0,0,1);

            .blockHeader {

                // margin-top: -3px;

            }

            .projectItem {
                // border-bottom: 3px solid black;
                -webkit-box-shadow: inset 0 -3px 0 0 rgba(0,0,0,1);
                -moz-box-shadow: inset 0 -3px 0 0 rgba(0,0,0,1);
                box-shadow: inset 0 -3px 0 0 rgba(0,0,0,1);
                @include media("<desktop") {
                    padding: $paddingWindowMobile;
                    -webkit-box-shadow: inset 0 -2px 0 0 rgba(0,0,0,1);
                    -moz-box-shadow: inset 0 -2px 0 0 rgba(0,0,0,1);
                    box-shadow: inset 0 -2px 0 0 rgba(0,0,0,1);
                }
                background: white;
                color: black;
                a {
                    color: black;
                }
                &:first-of-type {
                    background: black;
                    color: white;
                }

            }
        }
        // padding: 20px;
        *:first-of-type {
            margin-top: 0;
        }
        *:last-of-type {
            margin-bottom: 0;
        }

        .projectItem {

            &.redItem {
                background: red;
                color: white;
            }

            &.blueItem {
                background: blue;
                color: white;
            }

            &.greenItem {
                background: lime;
                color: black;

                &.invertedColor {
                    background: black;
                    color: lime;

                }
            }
            &.tabHeader50 {
                float: left;
                width: 50%;
            }

            .projectItemInner {
                overflow: hidden;
                width: 100%;
                display: block;

                .projectItemInnerHeader {
                    display: inline-block;
                    width: 100%;
                    clear: both;

                }
            }

            h1 {
                font-weight: normal;
            }

            &.LoadMoreProjects {
                line-height: $fontSizeWindowLarge;
                font-size: $fontSizeWindowLarge;
                @include media("<phone") {
                    font-size: $fontSizeWindowXLarge;
                }

                h1 {
                    font-size: inherit;

                }
                cursor: pointer;
                text-align: center;

                h1 {
                    width: 100%;
                    font-weight: normal;
                }
            }

            display: flex;
            // min-height: $paddingWindowLarge*1.6;

            width: 100%;
            // justify-content: center;
            align-items: center;
            padding: $paddingWindowDesktop;
            @include media("<desktop") {
                padding: $paddingWindowMobile;
                &:not(.mobileHeader) {
                    display: none;

                }

                &.mobileHeader {

                    h1 {
                        font-size: $fontSizeWindowLarge;
                        line-height: $paddingWindowLarge*2;
                        @include media("<phone") {
                            line-height: $paddingWindowLarge*4;
                            font-size: $fontSizeWindowXLarge;
                        }
                    }
                }

            }

            &.noMarginTop {
                padding-top: 0;
            }

            a {
                width: 100%;
                display: inline-block;
                margin: 0;
                text-decoration: none;
            }

            .projectItemTitle {
                width: 100%;
                clear: both;
                display: block;
                margin-bottom: 5px;

                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
            }

            .projectItemHalf {
                // width: 50%;
                padding-right: $paddingWindowDesktop;
                float: left;
                font-size: $fontSizeWindowSmall;
                @include media("<phone") {
                    font-size: $fontSizeWindowLarge;
                }

            }

        }
    }

    .halfHeight {
        height: 50%;
        overflow-y: auto;
        position: relative;

    }

    .third {

        // &.defaultBorderThird{
        //   border-top: 3px solid black;
        // };
        float: left;
        width: 33.3333%;
        position: absolute;
        background: lime;
        overflow-y: auto;
        height: calc(100% - #{$paddingWindowLarge});
        // height: 100%;
        &:nth-of-type(3) {
            left: 33.33333%;
        }
        &:nth-of-type(4) {
            left: 66.66666%;
        }
        @include media("<desktop") {
            width: 100%;
            position: relative;
            &:nth-of-type(3) {
                left: 0;
            }
            &:nth-of-type(4) {
                left: 0;
            }
        }

    }

    .left,
    .right {
        background: lime;
        position: absolute;
        height: calc(100% - #{$paddingWindowLarge});
        overflow-y: auto;
    };

    .left {
        left: 0;
        // width: 66.666%;
        width: 50%;
    }

    .right {
        right: 0;
        // width: 33.333%;
        width: 50%;
    }

}
</style>
