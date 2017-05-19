<template>
<div id="listView" class="">
  <div class="right">
    <div class="about">
      <div class="blockHeader">
        <h1>
          About
        </h1>
      </div>
      <p>
        Open Set is a design and education platform located in Rotterdam, the Netherlands, that operates internationally. It was initiated as an independent summer school in 2012. Our organization applies design thinking to education, while facilitating collaborations...
      </p>
      <p>
        Read more
      </p>
    </div>

    <div class="news">
      <div class="newsItem ">
        <div class="blockHeader">
          <h1>
            NEWS
          </h1>
        </div>
      </div>



      <div class="newsItem" v-for="item in newsProp">
        <div class="newsItemInner">
          <p>

            {{item.title.rendered}}
          </p>

          <div v-html="item.content.rendered">
          </div>
          <p>
            Expand
          </p>
        </div>

      </div>


      <div @click="$emit('getmoreContentNewsListEmit',getMoreContentNews); getMoreContentNews++" id="LoadMore">
        <!-- <h1>Load More Content</h1> -->
        <!-- {{getMoreContentNews}}
        {{newsListPage}} -->
        <h1 v-if="getMoreContentNews - 1 < newsListPage">Load More News</h1>
        <h1 v-else>No more News!</h1>
      </div>

    </div>
  </div>
  <div class="left">

    <div class="projects">


      <div class="projectItem">
        <div class="blockHeader">
          <h1>
            Projects

          </h1>
        </div>
      </div>

      <div class="projectItem" v-for="item in projectsProp">
        <router-link :to="{path: 'project/'+item.slug}">
          <span class="projectItemTitle" v-html="item.title.rendered">
          </span>
          <span class="projectItemHalf">
            {{item.acf.project_type}}
          </span>
          <span class="projectItemHalf" v-html="dateStamp(item.date)">
          </span>
        </router-link>
      </div>


      <div class="projectItem" id="LoadMoreProjects" @click="$emit('getmoreContentProjectsListEmit',getMoreContentProjects); getMoreContentProjects++">
        <h1 v-if="getMoreContentProjects - 1 < projectListPage ">Load More Projects</h1>
        <h1 v-else>You've reached the end.</h1>

      </div>


    </div>



  </div>

</div>
</template>

<script>
export default {
  name: 'list',
  data() {
    return {
      getMoreContentProjects: 2,
      getMoreContentNews: 2,
      // getMoreContentProjects:1,
      msg: 'Welcome to Your Vue.js App',
      days: ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],
      mL: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
      mS: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'],
    }
  },

  props: ['newsProp', 'projectsProp', 'newsAndProjectsProp', 'projectListPage', 'newsListPage'],

  methods:{


    dateStamp: function(input){


      var day = this.days[new Date(input).getDay()]
      var dayNumber = ("0" + new Date(input).getDate()).slice(-2)

      var year = new Date(input).getFullYear()
      var monthL = this.mL[new Date(input).getMonth()]
      var month = ("0" + (new Date(input).getMonth()+1)).slice(-2)
      // return this.days[new Date(input).getDay()];
      // return day+"/"+dayNumber+"/"+monthL;
      return dayNumber+"/"+month+"/"+year;

    }
  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
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
            // text-align: right;
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
    margin-top: $paddingWindowMedium;

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

.projects {
    // margin-top: 20px;
    background: white;
    // padding: 20px;
    *:first-of-type {
        margin-top: 0;
    }
    *:last-of-type {
        margin-bottom: 0;
    }

    .projectItem {

        overflow: hidden;

        h1 {
            color: white;
            font-weight: normal;
        }

        &#LoadMoreProjects {
            cursor: pointer;
            h1 {
                color: white;
                font-weight: normal;
            }
        }

        display: flex;
        height: $paddingWindowLarge*1.6;
        &:nth-child(odd) {
            a {

                color: white;
            }
            background: red;

        }
        &:nth-child(even) {
            &#LoadMoreProjects {
                h1 {
                    color: black;
                }
            }

        }

        width: 100%;
        // justify-content: center;
        align-items: center;
        padding: 20px;

        a {
            width: 100%;
            display: block;
            margin: 0;
            color: black;
            text-decoration: none;
        }

        .projectItemTitle {
            width: 100%;
            clear: both;
            display: inline-block;
            margin-bottom: 5px;
        }

        .projectItemHalf {
            width: 50%;
            float: left;
            font-size: 75%;
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
</style>
