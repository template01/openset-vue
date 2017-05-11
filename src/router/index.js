import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import IndexPage from '@/components/IndexPage'
import List from '@/components/list'
import NotFound from '@/components/Notfound'
import Project from '@/components/Project'
import Participants from '@/components/Participants'



import IndexGraphic from '@/components/IndexGraphic'

Vue.use(Router)


export default new Router({
    mode: 'history',
    // scrollBehavior (to, from, savedPosition) {
    //   console.log(savedPosition)
    //   if (savedPosition) {
    //     return savedPosition
    //   } else {
    //     return { x: 0, y: 0 }
    //   }
    // },

    // scrollBehavior (to, from, savedPosition) {
    //   return { x: 111111110, y: 1111111110 }
    // },


    routes: [{
      path: '/',
      // name: 'init',

      component: IndexPage,
      //   beforeEnter: (to, from, next) => {
      //    alert('next')
      // },
      children: [{
          // UserProfile will be rendered inside User's <router-view>
          // when /user/:id/profile is matched
          // name: 'list',
          path: 'list/',
          component: List,

        },
        {

          path: 'participants/',
          component: Participants,

        },
        {
          // UserProfile will be rendered inside User's <router-view>
          // when /user/:id/profile is matched
          name: 'visual',

          path: '/',
          component: IndexGraphic,

        },

        {
          // UserProfile will be rendered inside User's <router-view>
          // when /user/:id/profile is matched
          name: 'project',

          path: '/project/:projectSlug',
          component: Project,

        }, {

          path: '*',
          component: NotFound,

        },


      ]
    }]

  }

)
