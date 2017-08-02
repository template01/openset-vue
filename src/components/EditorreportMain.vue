

<template>
<div class="">
  <div v-if="NotFoundState">

    <loading v-if="!loaded"></loading>
    <editorReport v-bind:content="this.editorReportContent" v-bind:title="this.EditorreportTitle" v-if="editorReport">
      <singleHeader :typeProp="'report'"  :nameProp=EditorreportAuthornames :dateProp="EditorreportDate" :titleProp="EditorreportTitle"></singleHeader>
    </editorReport>
    <editorReport v-bind:content="this.editorAssignmentContent" v-bind:title="this.EditorreportTitle" v-if="editorAssignment">
      <singleHeader :typeProp="'assignment'" :nameProp=EditorreportAuthornames :dateProp="EditorreportDate" :titleProp="EditorreportTitle"></singleHeader>
    </editorReport>

  </div>
  <div v-else>
    <NotFound></NotFound>
  </div>
</div>
</template>

<script>
import NotFound from '@/components/Notfound'
import editorReport from '@/components/editorReport'
import singleHeader from '@/components/singleHeader'
import loading from '@/components/loading'



export default {


  name: 'project',

  components: {
    NotFound,
    loading,
    // editorAssignment,
    editorReport,
    singleHeader,
  },

  data() {
    return {
      // projectId: this.$route.params.projectId,
      EditorreportSlug: this.$route.params.editorreportSlug,
      // projectContent: Object,
      EditorreportTitle: '',
      EditorreportDate: '',
      EditorreportAuthornames:'',
      // projectSlug:'',
      // projectDefaultContent:'',
      NotFoundState: true,
      EditorreportContentMain: Object,

      editorReport: false,
      editorReportContent: '',
      editorAssignment: false,
      editorAssignmentContent: '',
      loaded: false

      // visualReportIntro:'',
      // sketchProject:false,
      // defaultProject:false,
    }
  },

  deactivated: function() {
    this.$destroy()
  },
  methods: {

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
          this.EditorreportDate = this.EditorreportContentMain.date
          this.EditorreportAuthornames = this.EditorreportContentMain.acf.student_name

          // this.EditorreportSlug = this.EditorreportTitle.slug
          // this.EditorreportDefaultContent = this.EditorreportTitle.acf.rendered
          if (this.EditorreportContentMain.acf.extensive_report_or_assignment === 'Assignment') {
            this.editorAssignment = true
            this.editorAssignmentContent = this.EditorreportContentMain.content.rendered

            // this.visualReportIntro = this.projectContent.acf.visual_introduction
            // this.visualContent = this.projectContent.acf.visual_report
          }
          if (this.EditorreportContentMain.acf.extensive_report_or_assignment === "Report") {
            this.editorReport = true
            this.editorReportContent = this.EditorreportContentMain.content.rendered
          }
        }

        var vm = this
        setTimeout(function(){
          vm.loaded = true
        },500)

      }, response => {
        // error callback
        this.NotFoundState = false
      });

    }

  },

  created: function() {
    // var apiEndpoint = 'http://community.openset.nl/backend/wp-json/wp/v2/editorreport?slug=' + this.EditorreportSlug
    // this.getContentEditorReport(apiEndpoint)

    var apiEndpoint = 'http://community.openset.nl/backend/wp-json/wp/v2/editorreport?slug=' + this.EditorreportSlug + '&published=1'
    var unofficialApiEndpoint = 'http://community.openset.nl/backend/wp-json/wp/v2/editorreport?slug=' + this.EditorreportSlug + '&notpublished=1'

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

<style lang="scss">
@import "../assets/scss/globalVars.scss";
@import "../../node_modules/include-media/dist/_include-media.scss";

#editorReport{

.bodyText{
  h1{
    text-align: center;
    font-size: $fontSizeWindowLarge;
    font-weight: normal;
    text-transform: uppercase;
    line-height: 1;
    @include media("<phone") {
      font-size: $fontSizeWindowXLarge;
    }


  }


  h2,h3,h4,h5,h6{
    text-transform: uppercase;

    font-size: $fontSizeWindowMedium;

    @include media("<desktop") {
      font-size: $fontSizeWindowLarge;
    }

    @include media("<phone") {
      font-size: $fontSizeWindowXLarge;
    }

  }

}
.endnote{
  background:   red;
  border-radius: 100%;
  width:  $fontSizeWindowMediumFixed;
  height:  $fontSizeWindowMediumFixed;
  display: inline-block;
  position: relative;
  a{
    color: white;
    text-decoration: none;
    text-align: center;
    font-family: Calibre;
    line-height:  $fontSizeWindowMediumFixed;
    position: absolute;
    width: 100%;
    font-size: $fontSizeWindowMediumFixed/1.5;
  }


}
.endnotes{

  li{
    // display: inline-block;
    margin-bottom: $fontSizeWindowMediumFixed/3;
  }
          font-family: Calibre;
          font-size: $fontSizeWindowMediumFixed;
          @include media(">=desktop") {
            font-size: $fontSizeWindowMediumFixed;
            line-height: $fontSizeWindowMediumFixed;
          }
          @include media("<desktop") {
            // font-size: 1vw;
            // line-height: 1vw;

            padding-left: $paddingWindowDesktop;
            padding-right: $paddingWindowDesktop;
          }

          clear: both;
}
}

</style>
