<template>
<div>
  <header>

    <div class="viewSwitcher">
        <router-link v-if="listView" to="/">Visual</router-link>
        <router-link v-else to="/list">Texual</router-link>
    </div>

    <div class="navigation">
      <router-link to="/list">About</router-link>
      <router-link to="/participants">Participants</router-link>
      <!-- <router-link to="http://placeholder-b.template-studio.nl/">Login/Register</router-link> -->
      <a href="http://placeholder-b.template-studio.nl/">Login/Register</a>
    </div>

    <div class="title">

      <h1>OPEN SET COMMUNITY</h1>
    </div>


  </header>

  <div class="content">
    <keep-alive>
      <router-view v-bind:participantsProp="this.participants"  v-bind:newsProp="this.news" v-bind:projectsProp="this.projects" v-bind:newsAndProjectsProp="this.newsAndProjects"></router-view>
    </keep-alive>
  </div>
</div>
</template>

<script>


export default {
  name: 'indexPage',
  // components:{Participants},
  data() {
    return {
      news: Array,
      projects: Array,
      participants: Array,
      newsAndProjects: [],
      indexScrollY: 0,
      listView: false,
      listParticipants:false,
    }
  },

  created: function() {

    if (this.$route.path === '/list') {
      this.listView = true
    }

    this.$http.get('http://placeholder-b.template-studio.nl/wp-json/wp/v2/news_announcements').then(function(response) {
      this.news = response.body

      this.newsAndProjects = this.newsAndProjects.concat(response.body)

      // console.log(this.newsAndProjects)

    })

    this.$http.get('http://placeholder-b.template-studio.nl/wp-json/wp/v2/project?published=1').then(function(response) {
      this.projects = response.body
      this.newsAndProjects = this.newsAndProjects.concat(response.body)
    })

    this.$http.get('http://placeholder-b.template-studio.nl/wp-json/wp/v2/users?exclude=1').then(function(response) {
      this.participants = response.body
      // this.newsAndProjects = this.newsAndProjects.concat(response.body)
    })


  },

  computed: {
    newsAndProjectsOrdered: function() {
      return _.orderBy(this.newsAndProjects, 'modified', ['desc'])
    },

  },

  watch: {


    '$route' (to, from) {

      if (this.$route.path === '/list') {
        this.listView = true
      }

      if (this.$route.path === '/') {
        this.listView = false
      }

      if (from.path === '/' || from.path === '') {
        var scrolltop = window.pageYOffset
        this.indexScrollY = scrolltop
      }

      if (to.path === '/' || to.path === '') {
        var vm = this
        setTimeout(function() {
          window.scrollTo(0, vm.indexScrollY)
        }, 0)

      }
    }
  }


}
</script>

<style lang="scss" scoped>

header {
    height: 80px;
    position: fixed;
    top: 0;
    background: black;
    width: 100%;
    font-weight: bold;

    .navigation {
        // width: 80px;
        float: right;
        display: flex;
        align-items: center;
        height: 80px;
        justify-content: center;
        a {
            padding-right: 20px;
            color: white;
            text-decoration: none;
        }

        button{
          margin: 0;
          padding: 0;
          color: white;
          background: transparent;
          border: 0;
          font-size: inherit;
          font-weight: inherit;
          padding-right: 20px;
        }
    }

    .viewSwitcher {
        width: 80px;
        float: right;
        display: flex;
        align-items: center;
        height: 80px;
        justify-content: center;
        background: white;
        a {
            color: black;
            text-decoration: none;
            height: 100%;
            width: 100%;
            line-height: 80px;
            text-align: center;
        }
    }

    .title{
      h1{
        color: lime;
        font-size: 4vw;
        // line-height: 8vw;
        font-weight: normal;
        // float: right;
        margin: 0;
      }
      background: white;
      float: left;
      display: flex;
      align-items: center;
      height: 80px;
      justify-content: center;
      width: auto;
      padding-left: 20px;
      padding-right: 20px;


    }
}
.content {
    margin-top: 80px;
}
</style>
