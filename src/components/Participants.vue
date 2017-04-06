<template>
<div id="listView" class="">
  <div class="right">

    <div class="projects">
      <div class="projectItem">
        <div class="blockHeader">
          <h1>
                Participants:
              </h1>
        </div>
      </div>

      <div class="projectItem" v-for="item in participantsProp">
        <span class="w25 align-self-start" v-html="item.name">
        </span>
        <span class="w75" v-html="item.acf.extra_info">
        </span>
        <!-- <router-link :to="{path: 'project/'+item.id}">
          <span class="w25">
                {{item.type}}
              </span>
          <span class="w50" v-html="item.title.rendered">
              </span>
          <span class="w25">
                {{item.date}}
              </span>
        </router-link> -->
      </div>
    </div>
  </div>
  <div class="left">

    <div class="about">
      <!-- <div class="blockHeader">
        <h1>
          About:
        </h1>
      </div> -->
      <p>
        A description of the participants. A design and education platform located in Rotterdam, the Netherlands, that operates internationally. It was initiated as an independent summer school in 2012. Our organization applies design thinking to education, while facilitating collaborations...
      </p>
    </div>


  </div>

</div>
</template>

<script>
export default {
  name: 'Participants',
  data() {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },

  props: ['participantsProp'],

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
#listView {
    background: lime;
    min-height: calc(100vh - 80px);

    font-size: 18px;

    .blockHeader {
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
    padding-top: 20px;
    *:first-of-type {
        margin-top: 0;
    }
    *:last-of-type {
        margin-bottom: 0;
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
        min-height: 80px;

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

        .align-self-start{
            align-self: flex-start;
        }


        .w25 {
            width: 25%;
        }
        .w50 {
            width: 50%;
        }
        .w75 {
            width: 75%;

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
    width: 33.333%;
}

.right {
    right: 0;
    width: 66.666%;
}
</style>

<style>
.projectItem p{
  margin-top: 0;
}
</style>
