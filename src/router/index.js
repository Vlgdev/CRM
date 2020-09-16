import Vue from 'vue'
import VueRouter from 'vue-router'
import firebase from 'firebase/app'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/Home.vue'),
    meta: { layout: 'main', auth: true }
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login.vue'),
    meta: { layout: 'empty' },
  },
  {
    path: '/categories',
    name: 'Categories',
    component: () => import('../views/Categories.vue'),
    meta: { layout: 'main', auth: true },
  },
  {
    path: '/detail-record',
    name: 'DetailRecord',
    component: () => import('../views/DetailRecord.vue'),
    meta: { layout: 'main', auth: true }
  },
  {
    path: '/history',
    name: 'History',
    component: () => import('../views/History.vue'),
    meta: { layout: 'main', auth: true }
  },
  {
    path: '/planning',
    name: 'Planning',
    component: () => import('../views/Planning.vue'),
    meta: { layout: 'main', auth: true }
  },
  {
    path: '/profile',
    name: 'Profile',
    component: () => import('../views/Profile.vue'),
    meta: { layout: 'main', auth: true }
  },
  {
    path: '/record',
    name: 'Record',
    component: () => import('../views/Record.vue'),
    meta: { layout: 'main', auth: true }
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('../views/Register.vue'),
    meta: { layout: 'empty' }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
})

router.beforeEach((to, from, next) => {
  const currentUser = firebase.auth().currentUser
  const requireAuth = to.matched.some(r => r.meta.auth)

  if (!currentUser && requireAuth) {
    next('/login?message=login')
  } else {
    next()
  }
})

export default router
