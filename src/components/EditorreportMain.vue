

<template>
<div class="">
  <div v-if="NotFoundState">

    <!-- {{editorAssignment}} -->
    <!-- {{editorReport}} -->
    <!-- {{EditorreportTitle}} -->

    <!-- {{editorAssignmentContent}} -->
    <!-- {{editorReportContent}} -->

    <editorAssignment v-bind:content="this.editorAssignmentContent" v-bind:title="this.EditorreportTitle" v-if="editorAssignment"></editorAssignment>
    <editorReport v-bind:content="this.editorReportContent" v-bind:title="this.EditorreportTitle" v-if="editorReport"></editorReport>

    <!-- {{this.EditorreportContentMain.acf.extensive_report_or_assignment}} -->
    <!-- {{this.EditorreportContentMain}} -->
    <!-- visual {{this.visualReport}}<br />
    skecth {{this.sketchProject}}<br />
    default {{this.defaultProject}} -->
    <!-- <h1 v-html="this.projectTitle"></h1> -->
    <!-- <defaultProject v-bind:title="this.projectTitle" v-if="defaultProject"></defaultProject> -->
  </div>
  <div v-else>
    <NotFound></NotFound>
  </div>
</div>
</template>

<script>
import NotFound from '@/components/Notfound'
import editorAssignment from '@/components/editorAssignment'
import editorReport from '@/components/editorReport'



export default {


  name: 'project',

  components: {
    NotFound,
    editorAssignment,
    editorReport
  },

  data() {
    return {
      // projectId: this.$route.params.projectId,
      EditorreportSlug: this.$route.params.editorreportSlug,
      // projectContent: Object,
      EditorreportTitle: '',
      // projectSlug:'',
      // projectDefaultContent:'',
      NotFoundState: true,
      EditorreportContentMain: Object,

      editorReport: false,
      editorReportContent: '',
      editorAssignment: false,
      editorAssignmentContent: '',

      // visualReportIntro:'',
      // sketchProject:false,
      // defaultProject:false,
    }
  },

  deactivated: function() {
    this.$destroy()
  },
  methods: {
    test: function() {
      alert(';e')
    },
    getContentEditorReport: function(apiEndpointParamA) {


      this.$http.get(apiEndpointParamA).then(function(response) {

        console.log(response.body)
        this.EditorreportContentMain = response.body[0]
        this.EditorreportTitle = this.EditorreportContentMain.title.rendered
        // this.EditorreportSlug = this.EditorreportTitle.slug
        // this.EditorreportDefaultContent = this.EditorreportTitle.acf.rendered
        if (this.EditorreportContentMain.acf.extensive_report_or_assignment === 'Assignment') {
          this.editorAssignment = true
          this.editorAssignmentContent = this.EditorreportContentMain.acf.assignment_content

          // this.visualReportIntro = this.projectContent.acf.visual_introduction
          // this.visualContent = this.projectContent.acf.visual_report
        }
        if (this.EditorreportContentMain.acf.extensive_report_or_assignment === "Report") {
          this.editorReport = true
          this.editorReportContent = this.EditorreportContentMain.acf.report_content
        }

        // if(this.projectContent.acf.sketch_project){
        //   this.sketchProject = true
        // }
        // if(this.projectContent.acf.default_project){
        //   this.defaultProject = true
        // }
      }, response => {
        // error callback
        this.NotFoundState = false
      });

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
          this.EditorreportContentMain = response.body[0]
          this.EditorreportTitle = this.EditorreportContentMain.title.rendered
          // this.EditorreportSlug = this.EditorreportTitle.slug
          // this.EditorreportDefaultContent = this.EditorreportTitle.acf.rendered
          if (this.EditorreportContentMain.acf.extensive_report_or_assignment === 'Assignment') {
            this.editorAssignment = true
            this.editorAssignmentContent = this.EditorreportContentMain.acf.assignment_content

            // this.visualReportIntro = this.projectContent.acf.visual_introduction
            // this.visualContent = this.projectContent.acf.visual_report
          }
          if (this.EditorreportContentMain.acf.extensive_report_or_assignment === "Report") {
            this.editorReport = true
            this.editorReportContent = this.EditorreportContentMain.acf.report_content
          }
        }

      }, response => {
        // error callback
        this.NotFoundState = false
      });

    }

  },

  created: function() {
    // var apiEndpoint = 'http://placeholder-b.template-studio.nl/wp-json/wp/v2/editorreport?slug=' + this.EditorreportSlug
    // this.getContentEditorReport(apiEndpoint)

    var apiEndpoint = 'http://placeholder-b.template-studio.nl/wp-json/wp/v2/editorreport?slug=' + this.EditorreportSlug + '&published=1'
    var unofficialApiEndpoint = 'http://placeholder-b.template-studio.nl/wp-json/wp/v2/editorreport?slug=' + this.EditorreportSlug + '&notpublished=1'

    if (this.$route.query.status === 'unofficial') {
      // this.getContent(unofficialApiEndpoint,apiEndpoint)
      this.getContent(unofficialApiEndpoint, apiEndpoint)

    } else {
      // this.getContent(apiEndpoint,apiEndpoint)
      this.getContent(apiEndpoint)

    }


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
