<template>
<div class="newsItemExpanded">
  <!-- {{newsContent.keys(obj).length === 0}} -->
  <button @click="$emit('closeNews')">close</button>
  <div v-if="Object.keys(newsContent).length >0">
    <p v-html="newsContent.title.rendered">
    </p>

    <div v-html="newsContent.content.rendered">
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
      newsContent:'',
    }
  },
  props: ['itemId'],
  methods: {

  },
  mounted: function() {
    this.getContent(this.itemId)
  },
  methods:{
    getContent: function(itemIdParam){

            this.$http.get('http://placeholder-b.template-studio.nl/wp-json/wp/v2/news_announcements/'+itemIdParam).then(function(response) {

              this.newsContent = response.body
            }, response => {
              // error callback
              this.NotFoundState = false
            });

    }
  },
  watch:{
    itemId: function () {
      this.getContent(this.itemId)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import "../assets/scss/globalVars.scss";
.newsItemExpanded{
  background: blue;
  width: 33.333%;
  z-index: 1;
  right: 0;
  position: fixed;
  color: white;
}
</style>

<style lang="scss">

</style>
