<template>
<div class="searchList">
  <div class="searchListInner">

    <input type=text v-model="query" placeholder="Type your search here...">
    <div class="resultWrapper">

      <div v-if="query.length===0">

      </div>
      <div v-else>
        <div class="results" v-if="noneFound">
          no results :(
        </div>
        <div class="results" v-for='item in results'>
          {{item.title.rendered}}
        </div>


      </div>
    </div>
  </div>

</div>
</template>

<script>
import _ from 'lodash'

export default {
  name: 'searchList',
  data() {
    return {
      query: '',
      results: [],
      noneFound: false
    }
  },
  methods: {
    searchApi: function() {
      this.results = []

      this.$http.get('http://placeholder-b.template-studio.nl/wp-json/wp/v2/editorreport?search=' + this.query + '&published=1').then(function(response) {
        this.results = this.results.concat(response.body)
        var vm = this
        setTimeout(function() {
          if (vm.results.length === 0) {
            vm.noneFound = true
          } else {
            vm.noneFound = false
          }
        }, 500)

      }, response => {
        this.NotFoundState = false
      });


      this.$http.get('http://placeholder-b.template-studio.nl/wp-json/wp/v2/project?search=' + this.query + '&published=1').then(function(response) {
        this.results = this.results.concat(response.body)
        var vm = this
        setTimeout(function() {
          if (vm.results.length === 0) {
            vm.noneFound = true
          } else {
            vm.noneFound = false
          }
        }, 500)

      }, response => {
        this.NotFoundState = false
      });

      this.$http.get('http://placeholder-b.template-studio.nl/wp-json/wp/v2/news_announcements?search=' + this.query).then(function(response) {
        this.results = this.results.concat(response.body)
        var vm = this
        setTimeout(function() {
          if (vm.results.length === 0) {
            vm.noneFound = true
          } else {
            vm.noneFound = false
          }
        }, 500)

      }, response => {
        this.NotFoundState = false
      });

    }
  },
  watch: {
    'query': _.debounce(function() {
      // alert('chaaaaange')
      this.noneFound = false
      if (this.query.length != 0 && this.query.length > 2) {
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
    .resultWrapper {
    }
}

.searchListInner{
  position: absolute;
  margin: 0;
  padding: $paddingWindowDesktop;
  width: 100%;
  display: block;
  left: 0;
  top: 0;
}
input {
  outline: none;
    margin: 0;
    padding: $paddingWindowDesktop;
    margin-left:-$paddingWindowDesktop;
    margin-top:-$paddingWindowDesktop !important;
    width: calc(100% + #{$paddingWindowDesktop*2});
    border: 0;
    border-top:3px solid white;
    border-bottom:3px solid white;
    display: block;
    color: white;
    background: red;
    left: 0;
    top: 0;
    font-size: inherit;

    &::-webkit-input-placeholder { /* WebKit, Blink, Edge */
        color:    white;
    }
    &:-moz-placeholder { /* Mozilla Firefox 4 to 18 */
       color:    white;
       opacity:  1;
    }
    &::-moz-placeholder { /* Mozilla Firefox 19+ */
       color:    white;
       opacity:  1;
    }
    &:-ms-input-placeholder { /* Internet Explorer 10-11 */
       color:    white;
    }
    &::-ms-input-placeholder { /* Microsoft Edge */
       color:    white;
    }

}

.results{
  padding: $paddingWindowDesktop;
  width: calc(100% + #{$paddingWindowDesktop*2});
  margin-left:-$paddingWindowDesktop;
  border-bottom:3px solid red;
  background: white;
  color: red;
}
</style>
