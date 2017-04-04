<template>
<div>

  <!-- <button @click="counter++">click</button> -->
  <!-- {{counter}} -->
  <div v-for="(item, index) in newsAndProjectsOrdered">



    <template v-if="item.type == 'project'">
      <template v-if="item.acf.simplestyle == 'Red'">
        <div class="project projectRed">
          <h3>
            <router-link :to="{path: 'project/'+item.id}">{{item.title.rendered}}</router-link>

          </h3>
          {{item.acf.simplestyle}}

        </div>
      </template>

      <template v-else-if="item.acf.simplestyle == 'Tall'">
        <div class="project projectTall">
          <h3>
            <router-link :to="{path: 'project/'+item.id}">{{item.title.rendered}}</router-link>

          </h3>
          {{item.acf.simplestyle}}

        </div>
      </template>

      <template v-else>
        <div class="project">
          <h3>
            <router-link :to="{path: 'project/'+item.id}">{{item.title.rendered}}</router-link>
          </h3>
          {{item.acf.simplestyle}}

        </div>
      </template>


    </template>


    <template v-else-if="item.type == 'news_announcements'">
      <div class="splashNews">
        <h1>
          NEWS
          <br />
          {{item.title.rendered}}
        </h1>
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

  props:['newsProp','projectsProp','newsAndProjectsProp'],


  computed: {
    newsAndProjectsOrdered: function() {
      return _.orderBy(this.newsAndProjectsProp, 'modified', ['desc'])
    },

  },




}
</script>

<style lang="scss" scoped>

.project{
  &.projectRed{
    background: red;
  }

  &.projectTall{
    width: 25%;
    height: 300px;
    border:1px solid gray;
  }
}

.splashNews{

  background: lime;
  margin: 0;

  h1{
    margin: 0;
  }
}

</style>
