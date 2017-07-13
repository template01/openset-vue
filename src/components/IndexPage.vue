  <template>
<div>
  <header>

    <div class="viewSwitcher">
      <template v-if="notOnIndex" >
        <router-link v-if="listView" to="/list">Back</router-link>
        <router-link v-else to="/">Back</router-link>
      </template>
      <template v-else>
        <router-link v-if="listView" to="/">Visual</router-link>
        <router-link v-else to="/list">Textual</router-link>
      </template>
    </div>

    <div class="navigation">
      <router-link :to="{path:'/list', hash:'about'}" replace>About</router-link>
      <!-- <router-link to="/participants">Participants</router-link> -->
      <!-- <router-link to="http://placeholder-b.template-studio.nl/">Login/Register</router-link> -->
      <a href="http://placeholder-b.template-studio.nl/">Lo<span class="liftedNavigation">g</span>in</a>
    </div>

    <div class="title">

      <h1>OPEN SET COMMUNITY</h1>
    </div>


  </header>

  <div class="content">
    <keep-alive>
      <router-view v-bind:newsListPage="totalNewsListPages"  v-bind:reportListPage="totalReportListPages" v-bind:projectListPage="totalProjectListPages" v-on:getmoreContentNewsListEmit="function(input){getmoreContentNewsList(input)}" v-on:getmoreContentProjectsListEmit="function(input){getmoreContentProjectsList(input)}" v-on:getmoreContentReportsListEmit="function(input){getmoreContentReportsList(input)}" v-on:getmoreContentProjectsEmit="function(input){getmoreContentProjects(input)}" v-on:getmoreContentNewsEmit="function(input){getmoreContentNews(input)}" v-on:getmoreContentReportEmit="function(input){getmoreContentReport(input)}"v-bind:participantsProp="this.participants" v-bind:newsProp="this.news" v-bind:projectsProp="this.projects" v-bind:editorreportsProp="this.reports" v-bind:newsAndProjectsAndReportsProp="this.newsAndProjectsAndReports">
      </router-view>
    </keep-alive>
  </div>
</div>
</template>

<script>
export default {
  name: 'indexPage',
  // components:{Participants},
  data() {
    return {
      news: Array,
      projects: Array,
      reports: Array,
      participants: Array,
      newsAndProjectsAndReports: [],
      indexScrollY: 0,
      listView: false,
      listParticipants: false,
      totalProjectListPages:0,
      totalReportListPages:0,
      totalNewsListPages:0,
      notOnIndex: false

    }
  },

  created: function() {

    if (this.$route.path === '/list') {
      this.listView = true
    }

    this.$http.get('http://placeholder-b.template-studio.nl/wp-json/wp/v2/news_announcements').then(function(response) {
      this.news = response.body
      this.totalNewsListPages = response.headers.map['X-WP-TotalPages'][0]

      this.newsAndProjectsAndReports = this.newsAndProjectsAndReports.concat(response.body)

      // console.log(this.newsAndProjectsAndReports)

    })


    this.$http.get('http://placeholder-b.template-studio.nl/wp-json/wp/v2/editorreport?published=1').then(function(response) {
      console.log(response)
      console.log(response.headers)
      this.reports = response.body
      this.totalReportListPages = response.headers.map['X-WP-TotalPages'][0]

      this.newsAndProjectsAndReports = this.newsAndProjectsAndReports.concat(response.body)
    })

    this.$http.get('http://placeholder-b.template-studio.nl/wp-json/wp/v2/project?published=1').then(function(response) {
      this.projects = response.body
      this.totalProjectListPages = response.headers.map['X-WP-TotalPages'][0]
      this.newsAndProjectsAndReports = this.newsAndProjectsAndReports.concat(response.body)
    })

    this.$http.get('http://placeholder-b.template-studio.nl/wp-json/wp/v2/users?exclude=1').then(function(response) {
      this.participants = response.body
      // this.newsAndProjectsAndReports = this.newsAndProjectsAndReports.concat(response.body)
    })


  },

  methods:{
    getmoreContentReport: function(input){
      this.$http.get('http://placeholder-b.template-studio.nl/wp-json/wp/v2/editorreport?published=1?page='+input).then(function(response) {
        var totalPages = response.headers.map['X-WP-TotalPages'][0]
        console.log(response)
        console.log(response.headers)
        console.log(response.headers.map['X-WP-TotalPages'][0])

        this.newsAndProjectsAndReports = this.newsAndProjectsAndReports.concat(response.body)
      })
    },

    getmoreContentNews: function(input){
      this.$http.get('http://placeholder-b.template-studio.nl/wp-json/wp/v2/news_announcements?page='+input).then(function(response) {
        var totalPages = response.headers.map['X-WP-TotalPages'][0]

        console.log(response)
        console.log(response.headers)
        console.log(response.headers.map['X-WP-TotalPages'][0])
        this.newsAndProjectsAndReports = this.newsAndProjectsAndReports.concat(response.body)
      })
    },

    getmoreContentProjects: function(input){
      this.$http.get('http://placeholder-b.template-studio.nl/wp-json/wp/v2/project?published=1&page='+input).then(function(response) {
        var totalPages = response.headers.map['X-WP-TotalPages'][0]
        console.log(response)
        console.log(response.headers)
        console.log(response.headers.map['X-WP-TotalPages'][0])
        this.newsAndProjectsAndReports = this.newsAndProjectsAndReports.concat(response.body)
      })
    },

    getmoreContentProjectsList: function(input){
      this.$http.get('http://placeholder-b.template-studio.nl/wp-json/wp/v2/project?published=1&page='+input).then(function(response) {
        var totalPages = response.headers.map['X-WP-TotalPages'][0]
        this.totalProjectListPages = response.headers.map['X-WP-TotalPages'][0]

        console.log(response)
        console.log(response.headers)
        console.log(response.headers.map['X-WP-TotalPages'][0])
        this.projects = this.projects.concat(response.body)
      })
    },
    getmoreContentReportsList: function(input){
      this.$http.get('http://placeholder-b.template-studio.nl/wp-json/wp/v2/editorreport?published=1?page='+input).then(function(response) {
        var totalPages = response.headers.map['X-WP-TotalPages'][0]
        this.totalReportListPages = response.headers.map['X-WP-TotalPages'][0]
        this.reports = this.reports.concat(response.body)
      })
    },



    getmoreContentNewsList: function(input){
      this.$http.get('http://placeholder-b.template-studio.nl/wp-json/wp/v2/news_announcements?page='+input).then(function(response) {
        var totalPages = response.headers.map['X-WP-TotalPages'][0]
        this.totalNewsListPages = response.headers.map['X-WP-TotalPages'][0]

        console.log(response)
        console.log(response.headers)
        console.log(response.headers.map['X-WP-TotalPages'][0])
        this.news = this.news.concat(response.body)
      })
    }

  },

  computed: {
    newsAndProjectsAndReportsOrdered: function() {
      return _.orderBy(this.newsAndProjectsAndReports, 'modified', ['desc'])
    },

  },

  mounted: function(){
          if(this.$route.path === '/'){
            this.notOnIndex = false
          }else if (this.$route.path === '/list') {
            this.notOnIndex = false

          }else{
            this.notOnIndex = true
          }
  },

  watch: {


    '$route' (to, from) {

      if (this.$route.path === '/list') {
        this.listView = true
      }

      if (this.$route.path === '/') {
        this.listView = false
      }


// from.path === '/' || from.path === '/list' && to.path != '/' || to.path != '/list')
console.log(to.path)

      if(from.path === '/' && to.path != '/list' ){
        this.notOnIndex = true
      }else{
        this.notOnIndex = false
      }

      if(from.path === '/list' && to.path != '/' && to.path != '/list'){
        if(to.hash != '#about'){
          this.notOnIndex = true
        }
      }


      if (from.path === '/' || from.path === '') {
        var scrolltop = window.pageYOffset
        this.indexScrollY = scrolltop
      }

      if (to.path === '/' || to.path === '') {
        var vm = this
        setTimeout(function() {
          window.scrollTo(0, vm.indexScrollY)
        }, 0)

      }
    }
  }


}
</script>

<style lang="scss" scoped>
@import "../assets/scss/globalVars.scss";

header {
    height: $paddingWindowLarge;
    position: fixed;
    z-index: 0;
    top: 0;
    background: black;
    width: 100%;
    font-weight: bold;

    .navigation {
        // width: $paddingWindowLarge;
        font-size: $fontSizeWindowLarge;
        font-weight: normal;

        float: right;
        display: flex;
        align-items: center;
        height: $paddingWindowLarge;
        justify-content: center;
        a {

          .liftedNavigation{
            top: -$fontSizeWindowLarge/7;
            position: relative;
          }
            padding-right: 20px;
            color: white;
            text-decoration: none;
            padding-left: 20px;
        }

        button {
            margin: 0;
            padding: 0;
            color: white;
            background: transparent;
            border: 0;
            font-size: inherit;
            font-weight: inherit;
            padding-right: 20px;
        }
    }

    .viewSwitcher {
        // width: $paddingWindowLarge;
        padding-right: 20px;
        padding-left: 20px;

        float: right;
        display: flex;
        align-items: center;
        height: $paddingWindowLarge;
        justify-content: center;
        background: white;
        font-size: $fontSizeWindowLarge;
        font-weight: normal;

        a {
            color: black;
            text-decoration: none;
            height: 100%;
            width: 100%;
            line-height: $paddingWindowLarge;
            text-align: center;
        }
    }

    .title {
        h1 {
            color: lime;
            font-size: $fontSizeWindowLarge;
            // line-height: 8vw;
            font-weight: normal;
            // float: right;
            margin: 0;
        }
        background: white;
        float: left;
        display: flex;
        align-items: center;
        height: $paddingWindowLarge;
        justify-content: center;
        width: auto;
        padding-left: 20px;
        padding-right: 20px;

    }
}
.content {
    margin-top: $paddingWindowLarge;
}
</style>
