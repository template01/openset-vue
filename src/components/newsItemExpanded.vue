<template>
<div>
  <!-- <div  class="newsItemExpandedTop">
    </div> -->
  <div class="newsItemExpanded" v-bind:class="{isExpand:isExpanded}" v-if="Object.keys(newsContent).length >0">
    <!-- {{newsContent.keys(obj).length === 0}} -->
    <div class="newsMenu">
      <span @click="$emit('closeNews')" class="close black pointy newsClose"></span>
      <p class="newsTitle">
        NEWS
      </p>
    </div>
    <div>

      <p class="" v-html="newsTitleRendered">
      </p>
      <div v-html="newsContentRendered">
      </div>

      <div v-html="newsContentRendered">
      </div>
    </div>
  </div>

</div>
</template>

<script>
export default {
  name: 'hello',
  data() {
    return {
      msg: 'Welcome to Your Vue.js App',
      positionVisualContentTop: 0,
      newsContent: '',
      newsTitleRendered: '',
      newsContentRendered: '',
    }
  },
  props: ['itemId', 'isExpanded'],
  methods: {

  },
  mounted: function() {
    this.getContent(this.itemId)
  },
  methods: {
    getContent: function(itemIdParam) {

      this.$http.get('http://placeholder-b.template-studio.nl/wp-json/wp/v2/news_announcements/' + itemIdParam).then(function(response) {

        this.newsContent = response.body
        this.newsContentRendered = response.body.content.rendered
        this.newsTitleRendered = response.body.title.rendered
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

.newsMenu {
    .newsTitle {
        width: calc(100% - 100px);
        float: left;
        margin: 0;
        line-height: 50px;
        margin-left: $paddingWindowDesktop;
        font-size: $fontSizeWindowLarge !important;
    }

    .newsClose {
        float: left;
        &::after {
            background: blue;
        }

        &::before {
            background: blue;
        }

        &:hover {
          &::before, &::after {
            background: red;
          }
        }


    }
    clear: both;
    display: inline-block;
}

.newsItemExpandedTop {
    background: blue;
    width: 33.333%;
    right: 0;
    height: $paddingWindowLarge;
    position: fixed;
    top: 0;

}
.newsItemExpanded {
    // background: blue;
    overflow-y: auto;
    background: white;
    width: 33.333%;
    z-index: 2;
    right: -50%;
    position: fixed;
    color: blue;
    z-index: 999999;
    -webkit-transition: right 0.5s ease;
    -moz-transition: right 0.5s ease;
    -o-transition: right 0.5s ease;
    -ms-transition: right 0.5s ease;
    transition: right 0.5s ease;

    &.isExpand {
        right: 0;
        // transition: right 3s;

    }

    // -webkit-box-shadow: 0px -100px 0px 0px blue;
    // -moz-box-shadow: 0px -100px 0px 0px blue;
    // box-shadow: 0px -100px 0px 0px blue;

    -webkit-box-shadow:  -2vw  0 0 0 blue;
    -moz-box-shadow:  -2vw  0 0 0 blue;
    box-shadow: -2vw  0 0 0 blue;

    // height: 500px;
    height: calc(100% - #{$paddingWindowLarge});
    padding: $paddingWindowDesktop;
    font-size: $fontSizeWindowMedium;
    // 
    // &::-webkit-scrollbar {
    //     width: 0;
    //     // background-color: #F5F5F5;
    // }

}
</style>

<style lang="scss">
</style>
