// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import vueResource from 'vue-resource'
Vue.use(vueResource)

// 
// import inView from 'in-view'
// Vue.use(inView)

// import _ from 'lodash'
// Vue.use(_)

// window._ = require('lodash');
import _ from 'lodash'

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
