import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'

import Login from "../components/Login.vue"
import Register from "../components/Register.vue"
import TestEndpointsButtons from '../components/TestEndpointsButtons.vue'
// import { component } from 'vue/types/umd'

// lazy-loaded
const Dashboard = () => import("../components/Dashboard.vue")
const NotFound = () => import("../components/404.vue")

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',

    component: function () {
      return import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
    }
  },
  {
    path: "/login",
    // alias: ['/login'],
    name:"Login",
    component: Login,
  },
  {
      path: "/register",
      name: "Register",
      component: Register,
  },
  {
      path: "/dashboard",
      name: "Dashboard",
      component: Dashboard,
  },
  {
      path: "/404",
      name: "404",
      component: NotFound,
  },
  {
    path: "/testEndpoints",
    name: "testEndpoints",
    component: TestEndpointsButtons
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

// const router = createRouter({
//   history: createWebHistory(),
//   routes,
//   });

//   router.beforeEach((to, from, next) => {
//       const publicPages = ['/login', '/register'];
//       const authRequired = !publicPages.includes (to.path);
//       const loggedIn = localStorage.getItem("token");
      
//       if (authRequired && !loggedIn) {
//           next('/login');
//       } else {
//           next();
//       }

//       if (authRequired) {
//           next('/login');
//       } else {
//           next();
//       }
//   });

export default router
