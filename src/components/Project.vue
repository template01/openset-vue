

<template>
<div class="projectWrapper" :class="projectColorScheme">
  <div v-if="NotFoundState">
    <!-- visual {{this.visuallyOriented}}<br />
    skecth {{this.sketchProject}}<br />
    default {{this.textualProject}} -->
    <!-- <h1 v-html="this.projectTitle"></h1> -->
    <visualProject :projectColorSchemeProp="projectColorScheme" v-bind:introText="this.visuallyOrientedIntroText" v-bind:introKeywords="this.visuallyOrientedIntroKeywords" v-bind:content="this.visualContent"  v-bind:title="this.projectTitle" v-if="visuallyOriented"></visualProject>
    <textualProject :projectColorSchemeProp="projectColorScheme" v-bind:content="this.textualContent"  v-bind:title="this.projectTitle" v-if="textuallyOriented"></textualProject>
  </div>
  <div v-else>
    <NotFound></NotFound>
  </div>
</div>

</template>

<script>
import NotFound from '@/components/Notfound'
import visualProject from '@/components/visualProject'
import textualProject from '@/components/textualProject'


export default {


  name: 'project',

  components: {
    NotFound, visualProject, textualProject
  },

  data() {
    return {
      // projectId: this.$route.params.projectId,
      projectSlug: this.$route.params.projectSlug,
      projectContent: Object,
      projectTitle:'',
      projectSlug:'',
      projectDefaultContent:'',
      projectColorScheme:'',
      NotFoundState: true,
      visuallyOriented:false,
      visuallyOrientedIntroText:'',
      visuallyOrientedIntroKeywords:'',
      visualContent:'',
      textuallyOriented:false,
      textualContent:'',

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
          this.projectColorScheme = this.projectContent.acf.project_color_scheme
          if(this.projectContent.acf.content_type ==="visually_oriented"){
            this.visuallyOriented = true
            if(this.projectContent.acf.visual_introduction_style === "text_based"){
              this.visuallyOrientedIntroText = this.projectContent.acf.visual_introduction_text
            }else{
              this.visuallyOrientedIntroKeywords = this.projectContent.acf.visual_introduction_keywords
            }
            this.visualContent = this.projectContent.acf.visual
          }
          // if(this.projectContent.acf.sketch_project){
          //   this.sketchProject = true
          // }
          if(this.projectContent.acf.content_type ==="textually_oriented"){
            this.textuallyOriented = true
            this.textualContent = this.projectContent.acf.textual


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
<style scoped lang="scss">
@import "../assets/scss/globalVars.scss";

.projectWrapper{
  min-height: calc(100% - #{$paddingWindowLarge});
  position: absolute;
  width: 100%;

  &.white_on_black{
    background: black;
    color: white;
  }
  &.black_on_white{
    background: white;
    color: black;
  }
  &.white_on_red{
    background: red;
    color: white;
  }
  &.black_on_green{
    background: lime;
    color: black;
  }
}

</style>
