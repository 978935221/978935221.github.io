import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from 'views/home/Home.vue'
import About from 'views/about/About.vue'
import Demo from 'views/about/demo/Demo.vue'
import Demo2 from 'views/about/demo2/Demo2.vue'

Vue.use(VueRouter)

const routes = [{
  path: '/',
  redirect: '/home'
}, {
  path: '/home',
  name: 'Home',
  component: Home
}, {
  path: '/about',
  name: 'About',
  component: About,
  redirect: { name: 'AboutDemo' },
  children: [{
    path: 'demo',
    name: 'AboutDemo',
    component: Demo
  }, {
    path: 'demo2',
    name: 'AboutDemo2',
    component: Demo2
  }]
}]

const router = new VueRouter({
  routes
})

export default router
