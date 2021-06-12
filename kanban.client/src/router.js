import { createRouter, createWebHashHistory } from 'vue-router'
import { authGuard } from '@bcwdev/auth0provider-client'

function loadPage(page) {
  return () => import(`./pages/${page}.vue`)
}

const routes = [
  {
    path: '/',
    name: 'Home',
    component: loadPage('HomePage')
  },
  {
    path: '/access',
    name: 'AccessTest',
    component: loadPage('AccessTestPage')
  },
  {
    path: '/welcome',
    name: 'Welcome',
    component: loadPage('WelcomePage'),
    beforeEnter: authGuard
  },
  {
    // NOTE path is referenced in the router link that navigates to the board page from the boardComponent
    // NOTE Path is defined at params:{id:boardProp.id} -> in boardComponent
    path: '/board/:id',
    name: 'Board',
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
