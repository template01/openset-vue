<template>
<div>
  <header>
    <router-link to="/">Home</router-link>
    <router-link to="/list">List View</router-link>
  </header>

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
  name: 'indexPage',
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
