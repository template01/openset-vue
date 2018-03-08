<template>
<div class="searchList">
  <div class="searchListInner">

    <input type=text v-model="query" :placeholder="decodeHtml('&#xF002;&#xF002;&#xF002;&#xF002;&#xF002;&#xF002;&#xF002;&#xF002;&#xF002;&#xF002;&#xF002;&#xF002;&#xF002;&#xF002;&#xF002;&#xF002;&#xF002;&#xF002;&#xF002;&#xF002;&#xF002;&#xF002;&#xF002;&#xF002;&#xF002;&#xF002;')"
    />

    <div class="resultWrapper">

      <div v-if="query.length===0">

      </div>
      <div v-else>
        <div class="results" v-if="searching || noneFound">
          <span v-if="noneFound">
            No results :(
            </span>
          <span v-if="searching">
          Searching...
        </span>
        </div>
        <div class="results" v-for='item in results'>
          <router-link v-if="item.type === 'project'" :to="{path: 'project/'+item.slug}">
            <span class="projectItemTitle">{{item.title.rendered}}</span>
            <span class="projectItemHalf" v-html="'PROJECT'"></span>
            <span class="projectItemHalf" v-html="'Date: '+dateStamp(item.date)"></span>
          </router-link>
          <router-link v-if="item.type === 'editorreport'" :to="{path: 'expertinput/'+item.slug}">
            <span class="projectItemTitle">{{item.title.rendered}}</span>
            <span class="projectItemHalf" v-html="'REPORT / ASSIGNMENT'"></span>
            <span class="projectItemHalf" v-html="'Date: '+dateStamp(item.date)"></span>
          </router-link>
          <div v-if="item.type === 'news_announcements'">
            <newsItemListSingle :showType=true :itemDate="'Date: '+dateStamp(item.date)" :itemIdTitleRendered="item.title.rendered" :itemId="item.id"></newsItemListSingle>
          </div>
        </div>


      </div>
    </div>
  </div>

</div>
</template>

<script>
import _ from 'lodash'
import newsItemListSingle from '@/components/newsItemListSingle'


export default {
  name: 'aboutList',
  components: {
    newsItemListSingle
  },
  data() {
    return {
      query: '',
      results: [],
      searching: false,
      noneFound: false,
      days: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      mL: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
      mS: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'],
    }
  },
  methods: {

    dateStamp: function(input) {


      var day = this.days[new Date(input).getDay()]
      var dayNumber = ("0" + new Date(input).getDate()).slice(-2)

      var year = new Date(input).getFullYear()
      var monthL = this.mL[new Date(input).getMonth()]
      var month = ("0" + (new Date(input).getMonth() + 1)).slice(-2)
      // return this.days[new Date(input).getDay()];
      // return day+"/"+dayNumber+"/"+monthL;
      return dayNumber + "." + month + "." + year;

    },

    decodeHtml: function(html) {
      var txt = document.createElement("textarea");
      txt.innerHTML = html;
      return txt.value;
    },

    searchApi: function() {
      this.results = []
      this.searching = true

      this.$http.get('http://community.openset.nl/backend/wp-json/wp/v2/editorreport?search=' + this.query + '&published=1').then(function(response) {
        this.results = this.results.concat(response.body)
        this.searching = false

        var vm = this
        setTimeout(function() {
          if (vm.results.length === 0) {
            vm.noneFound = true
          } else {
            vm.noneFound = false
          }
        }, 100)

      }, response => {
        this.NotFoundState = false
      });


      this.$http.get('http://community.openset.nl/backend/wp-json/wp/v2/project?search=' + this.query + '&published=1').then(function(response) {
        this.results = this.results.concat(response.body)
        this.searching = false

        var vm = this
        setTimeout(function() {
          if (vm.results.length === 0) {
            vm.noneFound = true
          } else {
            vm.noneFound = false
          }
        }, 100)

      }, response => {
        this.NotFoundState = false
      });

      this.$http.get('http://community.openset.nl/backend/wp-json/wp/v2/news_announcements?search=' + this.query).then(function(response) {
        this.results = this.results.concat(response.body)
        this.searching = false

        var vm = this
        setTimeout(function() {
          if (vm.results.length === 0) {
            vm.noneFound = true
          } else {
            vm.noneFound = false
          }
        }, 100)

      }, response => {
        this.NotFoundState = false
      });

    }
  },
  watch: {
    'query': _.debounce(function() {
      // alert('chaaaaange')
      this.noneFound = false
      if (this.query.length != 0 && this.query.length > 1) {
        this.searchApi()

      }
    }, 500)
    // }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import "../assets/scss/globalVars.scss";
@import "../../node_modules/include-media/dist/_include-media.scss";

.searchList {
    position: relative;
    .resultWrapper {}
}

.searchListInner {
    position: absolute;
    margin: 0;
    padding-left: $paddingWindowDesktop;
    padding-right: $paddingWindowDesktop;
    width: 100%;
    display: block;
    left: 0;
    top: 0;
    @include media("<desktop") {
        position: relative;
        padding-left: $paddingWindowMobile;
        padding-right: $paddingWindowMobile;
        margin-top: -$paddingWindowMobile !important;

    }

}

a {
    width: 100%;
    display: inline-block;
    margin: 0;
    text-decoration: none;
    color: inherit;
}

.projectItemTitle {
    width: 100%;
    clear: both;
    display: block;
    margin-bottom: 5px;

    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

.projectItemHalf {
    // width: 50%;
    padding-right: $paddingWindowDesktop;
    float: left;
    font-size: 60%;

}
// input[type='text'] { font-size: 24px; font-family: monospace; }

input {
    // font-family:inherit, FontAwesome;
    outline: none;
    margin: 0;
    padding: $paddingWindowDesktop;
    margin-left: -$paddingWindowDesktop;
    // margin-top:-$paddingWindowDesktop !important;
    width: calc(100% + #{$paddingWindowDesktop*2});
    border: 0;
    // border-top:3px solid white;
    // border-bottom:3px solid white;
    display: block;
    color: white;
    background: red;
    left: 0;
    top: 0;
    font-size: inherit;

    &::-webkit-input-placeholder {
        /* WebKit, Blink, Edge */
        color: white;
        font-family: FontAwesome;

    }
    &:-moz-placeholder {
        /* Mozilla Firefox 4 to 18 */
        color: white;
        font-family: FontAwesome;

        opacity: 1;
    }
    &::-moz-placeholder {
        /* Mozilla Firefox 19+ */
        color: white;
        font-family: FontAwesome;

        opacity: 1;
    }
    &:-ms-input-placeholder {
        /* Internet Explorer 10-11 */
        color: white;
        font-family: FontAwesome;

    }
    &::-ms-input-placeholder {
        /* Microsoft Edge */
        color: white;
        font-family: FontAwesome;

    }

}

.results {
    padding: $paddingWindowDesktop;
    width: calc(100% + #{$paddingWindowDesktop*2});
    margin-left: -$paddingWindowDesktop;
    -webkit-box-shadow: inset 0 -3px 0 0 red;
    -moz-box-shadow: inset 0 -3px 0 0 red;
    box-shadow: inset 0 -3px 0 0 red;
    @include media("<desktop") {
        padding: $paddingWindowMobile;
        -webkit-box-shadow: inset 0 -2px 0 0 red;
        -moz-box-shadow: inset 0 -2px 0 0 red;
        box-shadow: inset 0 -2px 0 0 red;
    }

    background: white;
    color: red;
}
</style>
