<template>
  <div class="hello">
    <div class="news">
      <p>
        News:
      </p>
      <div v-for="item in newsProp">
          {{item.title.rendered}}
          <br>
          <!-- {{item.date}} -->
        </div>
    </div>
    <div class="projects">
      <p>
        Projects:
      </p>
      <div v-for="item in projectsProp">

          <router-link :to="{path: 'project/'+item.id}">{{item.title.rendered}}</router-link>
          <br>
          <!-- {{item.date}} -->
        </div>
    </div>

  </div>
</template>

<script>
export default {
  name: 'list',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },

  props:['newsProp','projectsProp','newsAndProjectsProp'],

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
