<template>
<div>
  <!-- <div v-for="item in news">
      {{item.title.rendered}}
      <br>
      {{item.date}}
    </div>
    <br>
    <div v-for="item in projects">
      {{item.title.rendered}}
      <br>
      {{item.date}}
    </div> -->
    index
    <router-link to="/">Go to Home</router-link>

    <router-link to="/work">Go to Foo</router-link>


<keep-alive>
    <router-view
    v-bind:newsProp="this.news"
    v-bind:projectsProp="this.projects"
    v-bind:newsAndProjectsProp="this.newsAndProjects"
    ></router-view>
</keep-alive>

</div>
</template>

<script>
export default {
  name: 'hello',
  data() {
    return {
      news: Array,
      projects: Array,
      newsAndProjects: [],
    }
  },

  created: function() {
    // console.log(this.categorylink)
    // INCLUDE YEAR SPLASH (ID=13) TAGS!
    //
    this.$http.get('http://placeholder-b.template-studio.nl/wp-json/wp/v2/news_announcements').then(function(response) {
      this.news = response.body

      this.newsAndProjects = this.newsAndProjects.concat(response.body)

      // console.log(this.newsAndProjects)

    })

    this.$http.get('http://placeholder-b.template-studio.nl/wp-json/wp/v2/project').then(function(response) {
      this.projects = response.body
      this.newsAndProjects = this.newsAndProjects.concat(response.body)
    })

  },

  computed: {
    newsAndProjectsOrdered: function() {
      return _.orderBy(this.newsAndProjects, 'modified', ['desc'])
    },

  },



}
</script>

<style lang="scss" scoped>


</style>
