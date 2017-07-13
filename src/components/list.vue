<template>
<div id="listView" class="">
  <div class="third defaultBorderThird">
    <div class="thirdInner">

      <!-- <div class="tableStyle red"> -->
      <div class="tableStyle defaultBorder">


        <div class="projectItem">
          <div class="blockHeader">
            <h1>
            Projects

          </h1>
          </div>
        </div>

        <div class="projectItem" v-for="item in projectsProp">
          <div class="projectItemInner">

            <router-link :to="{path: 'project/'+item.slug}">
              <span class="projectItemTitle" v-html="item.title.rendered">
          </span>
              <span class="projectItemHalf" v-if="item.acf.student_name">By:
              <span v-for="(name, index) in item.acf.student_name.split(',')">
                <span v-if="index != item.acf.student_name.split(',').length -1 ">{{name}}, </span>
              <span v-else>{{name}}</span>
              </span>
              </span>
              <span class="projectItemHalf" v-html="'Date: '+dateStamp(item.date)">
          </span>
            </router-link>
          </div>
        </div>


        <div class="projectItem LoadMoreProjects" id="" @click="$emit('getmoreContentProjectsListEmit',getMoreContentProjects); getMoreContentProjects++">
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


        <div class="projectItem">
          <div class="blockHeader">
            <h1>
            Reports / Assignments
          </h1>
          </div>
        </div>

        <div class="projectItem" v-for="item in editorreportsProp">
          <div class="projectItemInner">

            <router-link :to="{path: 'editorreport/'+item.slug}">
              <span class="projectItemTitle" v-html="item.title.rendered">
          </span>
              <span class="projectItemHalf" v-if="item.acf.student_name">By:
            <span v-for="(name, index) in item.acf.student_name.split(',')">
              <span v-if="index != item.acf.student_name.split(',').length -1 ">{{name}}, </span>
              <span v-else>{{name}}</span>
              </span>
              </span>
              <span class="projectItemHalf" v-html="'Date: '+dateStamp(item.date)">

          </span>
            </router-link>
          </div>
        </div>


        <div class="projectItem LoadMoreProjects" @click="$emit('getmoreContentReportsListEmit',getMoreContentReports); getMoreContentReports++">
          <h1 v-if="getMoreContentReports - 1 < reportListPage ">Get More Reports</h1>
          <h1 v-else>No More Reports</h1>

        </div>
      </div>
    </div>
  </div>


  <div class="third">
    <div class="thirdInner halfHeight">

      <div class="tableStyle blue">


        <div class="projectItem">
          <div class="blockHeader">
            <h1>
            News

          </h1>
          </div>
        </div>

        <div class="projectItem" v-for="(item, index) in newsProp" :expandedx="true" :key="item">
          <newsItemListSingle :itemDate="'Date: '+dateStamp(item.date)" :itemIdTitleRendered="item.title.rendered" :itemId="item.id"></newsItemListSingle>
          <!-- <div class="projectItemInner">

              <span class="projectItemTitle" v-html="item.title.rendered">
          </span>
          <span class="projectItemHalf" v-html="'Date: '+dateStamp(item.date)">

          </span>
          <span class="projectItemHalf"  v-html="">
          </span>
          </div> -->

        </div>


        <div class="projectItem LoadMoreProjects" id="" @click="$emit('getmoreContentNewsListEmit',getMoreContentNews); getMoreContentNews++">
          <h1 v-if="getMoreContentNews - 1 < newsListPage ">Get More News</h1>
          <h1 v-else>No More News</h1>

        </div>
      </div>
    </div>




    <div class="thirdInner halfHeight">
      <div class="tableStyle">

        <div @click="aboutTab=!aboutTab; $router.replace({path:'/list', hash:'about'})" class="projectItem  tabHeader50 ">
          <div class="blockHeader ">
          <h1 :class="{ 'blink' : addBlink }" >About

          </h1>


          </div>
        </div>


        <div @click="aboutTab=!aboutTab;$router.replace({path:'/list', hash:''})" class="projectItem tabHeader50 redItem">
          <div class="blockHeader ">
            <h1>SEARCH

          </h1>
          </div>
        </div>
        <searchList  v-if="!aboutTab" class="projectItem"></searchList>
        <aboutList v-if="aboutTab" class="projectItem"></aboutList>
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
      addBlink:false,
      // getMoreContentProjects:1,
      msg: 'Welcome to Your Vue.js App',
      days: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      mL: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
      mS: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'],
      aboutTab: true
    }
  },

  props: ['newsProp', 'projectsProp', 'editorreportsProp', 'newsAndProjectsProp', 'projectListPage', 'reportListPage', 'newsListPage'],

  methods: {

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

    addBlinkMethod: function(){
      this.aboutTab=true
      // alert(this.aboutTab)
      this.addBlink=true
      var vm = this
      setTimeout(function(){
        vm.addBlink=false
      },3000)
    }
  },

  mounted(){
    if(this.$route.hash === '#about'){
      this.addBlinkMethod()
    }
  },
  watch: {

    '$route':function(to,from){
      if(to.hash==="#about"){
        if(from.path != '/list'){
          this.addBlinkMethod()
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

#listView {
    background: lime;
    min-height: calc(100vh - $paddingWindowLarg);

    // font-size: 18px;
    font-size: $fontSizeWindowMedium;
    line-height: 1;

    .blockHeader {
        width: 100%;
        min-height: $paddingWindowLarge;

        h1 {
            // color: lime;
            line-height: $paddingWindowLarge;

            font-size: 4vw;
            font-weight: normal;
            margin-top: 0;
            margin-bottom: 0;
            text-transform: uppercase;
            text-align: center;

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
                    color: white;

                    a {

                        color: white;
                    }
                    background: blue;

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

            border-top: 3px solid black;

            .blockHeader{

              margin-top: -3px;
            }

            .projectItem {
                border-bottom: 3px solid black;
                background: white;
                color: black;
                a {
                    color: black;
                }

                &:first-of-type{
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
            padding: 20px;

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
                font-size: 60%;


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
        &:nth-of-type(2) {
            left: 33.33333%;
        }
        &:nth-of-type(3) {
            left: 66.66666%;
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
