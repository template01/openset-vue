<template>
<div class="">
  assignment
  <div class="fixedIntro">
    <div class="fixedIntroInner">
      <slot></slot>
    </div>
  </div>
  <div class="">
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
    }
  },
  props: ['title', 'content'],
  methods: {

  },
  mounted: function() {
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import "../assets/scss/globalVars.scss";

</style>

<style lang="scss">
@import "../assets/scss/globalVars.scss";

</style>
