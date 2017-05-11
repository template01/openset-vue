<template>
<div id="listView" class="">
  <div class="right">
    <div class="about">
      <div class="blockHeader">
        <h1>
          About:
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
            NEWS:
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
    </div>
  </div>
  <div class="left">

    <div class="projects">
      <div class="projectItem">
        <div class="blockHeader">
          <h1>
            Projects:
          </h1>
        </div>
      </div>

      <div class="projectItem" v-for="item in projectsProp">
        <router-link :to="{path: 'project/'+item.slug}">
          <span class="w25">
            {{item.acf.project_type}}
          </span>
          <span class="w50" v-html="item.title.rendered">
          </span>
          <span class="w25">
            {{item.date}}
          </span>
        </router-link>
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
      msg: 'Welcome to Your Vue.js App'
    }
  },

  props: ['newsProp', 'projectsProp', 'newsAndProjectsProp'],

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
#listView {
    background: lime;
    min-height: calc(100vh - 80px);

    font-size: 18px;


    .blockHeader  {
      width: 100%;
      min-height: 80px;

      h1 {
        color: lime;
        line-height: 80px;

        font-size: 4vw;
        font-weight: normal;
        margin-top: 0;
        margin-bottom: 0;
        text-transform: uppercase;
        text-align: right;
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
    padding-bottom: 20px;
    margin-top: 20px;
    background: white;
    width: 100%;
    > *:first-of-type {
        margin-top: 0;
    }
    .newsItem {
        display: flex;
        align-items: center;
        min-height: 80px;
        margin-left: 20px;
        margin-right: 20px;
        width: calc(100% - 40px);
        border-bottom: 1px solid grey;
    }

}

.projects {
    margin-top: 20px;
    background: white;
    // padding: 20px;
    *:first-of-type {
        margin-top: 0;
    }
    *:last-of-type {
        margin-bottom: 0;
    }

    .projectItem {
        display: flex;
        height: 80px;

        width: 100%;
        // justify-content: center;
        align-items: center;
        padding: 20px;
        border-top: 1px solid lime;
        // p{
        //   margin: 0;
        //   a{
        //     margin: 0;
        //   }
        // }

        a {
            width: 100%;
            display: inherit;
            margin: 0;
            color: black;
            text-decoration: none;
        }

        .w25 {
            width: 25%;
        }
        .w50 {
            width: 50%;

        }
    }
}

.left,
.right {

    position: absolute;
    height: calc(100% - 80px);
    overflow-y: auto;
};

.left {
    left: 0;
    width: 66.666%;
}

.right {
    right: 0;
    width: 33.333%;
}
</style>
