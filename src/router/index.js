import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import IndexPage from '@/components/IndexPage'
import Ass from '@/components/Ass'

import IndexGraphic from '@/components/IndexGraphic'

Vue.use(Router)

export default new Router({
   mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: IndexPage,
    //   beforeEnter: (to, from, next) => {
    //    alert('next')
    // },
    children: [
      {
        // UserProfile will be rendered inside User's <router-view>
        // when /user/:id/profile is matched
        name: 'work',

        path: 'work/',
        component: Ass,

      },
      {
        // UserProfile will be rendered inside User's <router-view>
        // when /user/:id/profile is matched
        name: 'visual',

        path: '/',
        component: IndexGraphic,

      },

    ]
  }
  ]
})
