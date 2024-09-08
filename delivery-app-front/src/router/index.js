import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Login from "../components/Login.vue"
import Register from "../components/Register.vue"

const Dashboard = () => import("../components/Dashboard.vue")
const NotFound = () => import("../components/404-page.vue")

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: function () {
      return import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
    }
  },
  {
      path: "/dashboard",
      name: "dashboard",
      component: Dashboard,
  },
  {
      path: "/404",
      name: "404-page",
      component: NotFound,
  },
  {
      path: "/register",
      name: "register",
      component: Register,
  },
  {
      path: "/login",
      name: "login",
      component: Login,
  }
]

// const router = createRouter({
//   history: createWebHashHistory(),
//   routes
// })
const router = createRouter({
  history: createWebHistory(),
  routes,
  });

  router.beforeEach((to, from, next) => {
      const publicPages = ['/login', '/register'];
      const authRequired = !publicPages.includes (to.path);
      const loggedIn = localStorage.getItem("token");
      
      if (authRequired && !loggedIn) {
          next('/login');
      } else {
          next();
      }

      if (authRequired) {
          next('/login');
      } else {
          next();
      }
  });

export default router
