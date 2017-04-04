

<template>
<div class="hello">
  <div v-if="NotFoundState">
    <h1 v-html="this.projectTitle"></h1>
    <div v-html="this.projectDefaultContent"></div>
  </div>
  <div v-else>
    <NotFound></NotFound>
  </div>
</div>

</template>

<script>
import NotFound from '@/components/Notfound'


export default {


  name: 'project',

  components: {
    NotFound
  },

  data() {
    return {
      projectId: this.$route.params.projectId,
      projectContent: Object,
      projectTitle:'',
      projectDefaultContent:'',
      NotFoundState: true,

    }
  },

  deactivated:function(){
    this.$destroy()
  },

  created: function() {

    this.$http.get('http://placeholder-b.template-studio.nl/wp-json/wp/v2/project/' + this.projectId).then(function(response) {
      this.projectContent = response.body
      this.projectTitle = this.projectContent.title.rendered
      this.projectDefaultContent = this.projectContent.content.rendered
    }, response => {
      // error callback
      this.NotFoundState = false

    });



},


}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1,
h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
