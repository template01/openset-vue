

<template>
<div class="">
  <div v-if="NotFoundState">
    <!-- visual {{this.visualReport}}<br />
    skecth {{this.sketchProject}}<br />
    default {{this.defaultProject}} -->
    <!-- <h1 v-html="this.projectTitle"></h1> -->
    <visualProject v-bind:introText="this.visualReportIntroText" v-bind:introKeywords="this.visualReportIntroKeywords" v-bind:content="this.visualContent"  v-bind:title="this.projectTitle" v-if="visualReport"></visualProject>
    <defaultProject v-bind:title="this.projectTitle" v-if="defaultProject"></defaultProject>
    <sketchProject v-bind:title="this.projectTitle" v-if="sketchProject"></sketchProject>
  </div>
  <div v-else>
    <NotFound></NotFound>
  </div>
</div>

</template>

<script>
import NotFound from '@/components/Notfound'
import visualProject from '@/components/visualProject'
import sketchProject from '@/components/sketchProject'
import defaultProject from '@/components/defaultProject'


export default {


  name: 'project',

  components: {
    NotFound, visualProject, sketchProject, defaultProject
  },

  data() {
    return {
      // projectId: this.$route.params.projectId,
      projectSlug: this.$route.params.projectSlug,
      projectContent: Object,
      projectTitle:'',
      projectSlug:'',
      projectDefaultContent:'',
      NotFoundState: true,
      visualReport:false,
      visualReportIntroText:'',
      visualReportIntroKeywords:'',
      visualContent:'',
      sketchProject:false,
      defaultProject:false,
    }
  },

  deactivated:function(){
    this.$destroy()
  },
  methods:{
    test:function(){
      alert(';e')
    },
    getContent: function(apiEndpointParamA,apiEndpointParamB){


      this.$http.get(apiEndpointParamA).then(function(response) {

        if(response.body.length===0){
          this.$router.push({ path: this.projectSlug})
          this.getContent(apiEndpointParamB)
        }else{
          console.log(response.body)
          this.projectContent = response.body[0]
          this.projectTitle = this.projectContent.title.rendered
          this.projectSlug = this.projectContent.slug
          this.projectDefaultContent = this.projectContent.acf.rendered
          if(this.projectContent.acf.visual_report){
            this.visualReport = true
            if(this.projectContent.acf.visual_report_introduction_style === "text_based"){
              this.visualReportIntroText = this.projectContent.acf.visual_report_introduction_text
            }else{
              this.visualReportIntroKeywords = this.projectContent.acf.visual_report_introduction_keywords
            }
            this.visualContent = this.projectContent.acf.visual_report
          }
          if(this.projectContent.acf.sketch_project){
            this.sketchProject = true
          }
          if(this.projectContent.acf.default_project){
            this.defaultProject = true
          }
        }

      }, response => {
        // error callback
        this.NotFoundState = false
      });

    }
  }
  ,

  created: function() {
    this.projectSlug =this.$route.params.projectSlug
    var apiEndpoint = 'http://placeholder-b.template-studio.nl/wp-json/wp/v2/project?slug=' + this.projectSlug+'&published=1'
    var unofficialApiEndpoint = 'http://placeholder-b.template-studio.nl/wp-json/wp/v2/project?slug=' + this.projectSlug+'&notpublished=1'

    if(this.$route.query.status==='unofficial'){
      this.getContent(unofficialApiEndpoint,apiEndpoint)
    }else{
      this.getContent(apiEndpoint,apiEndpoint)
    }


// http://placeholder-b.template-studio.nl/wp-json/wp/v2/project?slug=man&notpublished=1
    // alert(apiRoute)




},


}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@import "../assets/scss/globalVars.scss";

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
