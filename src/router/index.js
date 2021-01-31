import Vue from 'vue'
import Router from 'vue-router'
import routes from 'vue-auto-routing'
import { createRouterLayout } from 'vue-router-layout'

Vue.use(Router)

const RouterLayout = createRouterLayout(layout => {
  return import('../layouts/' + layout + '.vue')
})

routes.push(
  {
    path: '*',
    redirect: '/404',
    meta: {
      title: '404',
      isVisible: false
    }
  }
)

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: RouterLayout,
      children: routes
    }
  ]
})

router.beforeEach((to, from, next) => {
  next()
})
export default router
