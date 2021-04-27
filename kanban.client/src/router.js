import { createRouter, createWebHashHistory } from 'vue-router'
import { authGuard } from '@bcwdev/auth0provider-client'

function loadPage(page) {
  return () => import(`./pages/${page}.vue`)
}

const routes = [
  {
    path: '/',
    name: 'HomePage',
    component: loadPage('HomePage')
  },
  {
    path: '/about',
    name: 'AboutPage',
    component: loadPage('AboutPage')
  },
  {
    path: '/board',
    name: 'BoardPage',
    component: loadPage('BoardPage'),
    beforeEnter: authGuard
  }
]

const router = createRouter({
  linkActiveClass: 'router-link-active',
  linkExactActiveClass: 'router-link-exact-active',
  history: createWebHashHistory(),
  routes
})

export default router
