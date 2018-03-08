<template>
<div  class="projectItemInner">
  <div class="projectItemInnerHeader"  v-bind:class="{textOverflow:isExpanded}">
    <div  @click="toggleExpanded(itemId)">
      <span  class="projectItemTitle">
        <span class="closeNews" v-if="isExpanded">✕</span>
        <span v-html="itemIdTitleRendered"></span>
      </span>
      <!-- <span class="projectItemTitle" v-html="itemIdTitleRendered"></span> -->
      <span class="projectItemHalf" v-if="showType">NEWS</span>
      <span class="projectItemHalf" v-html="">By:
        <span v-for="(name,index) in namesArray">

          <span @click="userSlug = name[1]" v-if="index<namesArray.length -1" v-html="name[0]+', '"></span>
          <span @click="userSlug = name[1]" v-else v-html="name[0]"></span>
        </span>
      </span>

      </span>
      <span class="projectItemHalf" v-html="itemDate"></span>
    </div>
  </div>


  <div class="newsItemExpanded" v-bind:class="{isExpand:isExpanded}" v-if="Object.keys(newsContent).length >0 && isExpanded ">
    <div>


      <div v-html="newsContentRendered">
      </div>
    </div>
  </div>

</div>
</template>

<script>
export default {
  name: 'newsItemListSingle',
  data() {
    return {
      msg: 'Welcome to Your Vue.js App',
      positionVisualContentTop: 0,
      newsContent: '',
      newsTitleRendered: '',
      newsContentRendered: '',
      isExpanded: false,
      projectStudentNames:[],
    }
  },
  props: ['itemId','itemIdTitleRendered','itemDate','itemStudentNames','showType'],
  methods: {

  },
  mounted: function() {
    // this.getContent(this.itemId)
  },

  computed:{
    namesArray: function(){
      var namePairs = []
      var arr = this.itemStudentNames.split(',')
      var newArr = _(arr).reduce(function(result, value, index) {
        if (index % 2 === 0)
          result.push(arr.slice(index, index + 2));
        return result;
      }, []);
      return newArr
    }
  },

  methods: {

    toggleExpanded: function(id){
      this.getContent(id)
      this.isExpanded=!this.isExpanded
    },
    getContent: function(itemIdParam) {

      this.$http.get('http://community.openset.nl/backend/wp-json/wp/v2/news_announcements/' + itemIdParam).then(function(response) {

        this.newsContent = response.body
        this.newsContentRendered = response.body.content.rendered
        this.newsTitleRendered = response.body.title.rendered
        this.projectStudentNames =  this.newsContent.acf.student_name.split(",")

      }, response => {
        // error callback
        this.NotFoundState = false
      });

    }
  },
  watch: {
    itemId: function() {
      this.getContent(this.itemId)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import "../assets/scss/globalVars.scss";
.newsItemExpanded{
  padding-top: $paddingWindowDesktop;
}

.textOverflow{
  .projectItemTitle{
    white-space: normal !important;
    overflow: visible !important;

  }
}

.closeNews{
  top:0.1vw;
  left:-0.1vw;
  position: relative;
  &:hover{
    color: red;
  }
}

.projectItemInnerHeader{
  cursor: pointer;
}

</style>

<style lang="scss">
.newsItemExpanded{
  a{
    color: inherit;
    text-decoration: none;
    border-bottom: 2px solid;
    display: inline !important;
  }

}

</style>
