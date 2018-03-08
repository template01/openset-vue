

<template>
<div class="projectWrapper" :class="projectColorScheme">
  <div v-if="NotFoundState">
    <!-- visual {{this.visuallyOriented}}<br />
    skecth {{this.sketchProject}}<br />
    default {{this.textualProject}} -->
    <!-- <h1 v-html="this.projectTitle"></h1> -->
    <loading v-if="!loaded"></loading>
    <visualProject :authorName=projectStudentNames :projectColorSchemeProp="projectColorScheme" v-bind:introText="this.visuallyOrientedIntroText" v-bind:introKeywords="this.visuallyOrientedIntroKeywords" v-bind:introNone="this.visuallyOrientedIntroNone" v-bind:content="this.visualContent"
      v-bind:date="projectDate" v-bind:title="this.projectTitle" v-if="visuallyOriented"></visualProject>
      <textualProject v-bind:content="this.textualContent" v-bind:title="this.projectTitle" v-bind:date="projectDate" :authorName=projectStudentNames v-if="textuallyOriented"></textualProject>
    <div v-if="reportOriented">
      <editorReport v-bind:content="reportContent" v-bind:title="projectTitle" :assignment=true>
        <singleHeader :typeProp="'Expert Input'"  :nameProp=projectStudentNames :dateProp="projectDate" :titleProp="projectTitle"></singleHeader>
      </editorReport>
    </div>
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
import loading from '@/components/loading'
import editorReport from '@/components/editorReport'
import singleHeader from '@/components/singleHeader'


export default {


  name: 'project',

  components: {
    NotFound,
    visualProject,
    textualProject,
    loading,
    editorReport,
    singleHeader
  },

  data() {
    return {
      // projectId: this.$route.params.projectId,
      projectSlug: this.$route.params.projectSlug,
      projectContent: Object,
      projectTitle: '',
      projectDate: '',
      projectSlug: '',
      projectDefaultContent: '',
      projectColorScheme: '',
      projectStudentNames: '',
      NotFoundState: true,
      reportOriented: false,
      reportContent: '',
      visuallyOriented: false,
      visuallyOrientedIntroText: '',
      visuallyOrientedIntroKeywords: '',
      visuallyOrientedIntroNone: '',
      visualContent: '',
      textuallyOriented: false,
      textualContent: '',

      loaded: false

    }
  },

  deactivated: function() {
    this.$destroy()
  },
  methods: {
    test: function() {
      alert(';e')
    },
    getContent: function(apiEndpointParamA, apiEndpointParamB) {


      this.$http.get(apiEndpointParamA).then(function(response) {

        if (response.body.length === 0) {
          this.$router.push({
            path: this.projectSlug
          })
          this.getContent(apiEndpointParamB)
        } else {
          console.log(response.body)
          this.projectContent = response.body[0]
          this.projectTitle = this.projectContent.title.rendered
          this.projectDate = this.projectContent.date
          this.projectSlug = this.projectContent.slug
          this.projectDefaultContent = this.projectContent.acf.rendered
          this.projectColorScheme = this.projectContent.acf.project_color_scheme
          this.projectStudentNames = this.projectContent.acf.student_name
          if (this.projectContent.acf.content_type === "visually_oriented") {
            this.visuallyOriented = true
            if (this.projectContent.acf.visual_introduction_style === "text_based") {
              this.visuallyOrientedIntroText = this.projectContent.acf.visual_introduction_text
            }
            if (this.projectContent.acf.visual_introduction_style === "keyword_based") {
              this.visuallyOrientedIntroKeywords = this.projectContent.acf.visual_introduction_keywords
            }
            if (this.projectContent.acf.visual_introduction_style === "no_intro") {
              this.visuallyOrientedIntroNone = true
            }
            this.visualContent = this.projectContent.acf.visual
          }

          if(this.projectContent.acf.content_type ==="report_oriented"){
            this.reportOriented = true
            this.reportContent = this.projectContent.acf.report_content
          }
          // if(this.projectContent.acf.sketch_project){
          //   this.sketchProject = true
          // }
          if (this.projectContent.acf.content_type === "textually_oriented") {
            this.textuallyOriented = true
            this.textualContent = this.projectContent.acf.textual


          }
        }

        var vm = this
        setTimeout(function() {
          vm.loaded = true
        }, 500)

      }, response => {
        // error callback
        this.NotFoundState = false
      });

    }
  },

  created: function() {
    this.projectSlug = this.$route.params.projectSlug
    var apiEndpoint = 'http://community.openset.nl/backend/wp-json/wp/v2/project?slug=' + this.projectSlug + '&published=1'
    var unofficialApiEndpoint = 'http://community.openset.nl/backend/wp-json/wp/v2/project?slug=' + this.projectSlug + '&notpublished=1'

    if (this.$route.query.status === 'unofficial') {
      this.getContent(unofficialApiEndpoint, apiEndpoint)
    } else {
      this.getContent(apiEndpoint, apiEndpoint)
    }


    // http://community.openset.nl/backend/wp-json/wp/v2/project?slug=man&notpublished=1
    // alert(apiRoute)




  },


}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import "../assets/scss/globalVars.scss";

.projectWrapper {
    min-height: calc(100% - #{$paddingWindowLarge});
    position: absolute;
    width: 100%;

    &.white_on_black {
        background: black;
        color: white;
    }
    &.black_on_white {
        background: white;
        color: black;
    }
    &.white_on_red {
        background: red;
        color: white;
    }
    &.black_on_green {
        background: lime;
        color: black;
    }
}
</style>
