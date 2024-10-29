import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

import Login from "@/views/auth/Login.vue"
import Register from "@/views/auth/Register.vue"

const TestEndpointsButtons = () => import('@/components/layoutComponents/TestEndpointsButtons.vue')
const NotFound = () => import("@/components/404.vue")

//CARS
const Cars = () => import("@/views/cars/Cars.vue")
const AddCar = () => import("@/views/cars/AddCar.vue")
const EditCar = () => import("@/views/cars/EditCar.vue")

//USERS
const Users = () => import("@/views/users/Users.vue")

const routes = [
  {path: '/', name: 'home', component: HomeView },

  {path: "/login", name:"Login",component: Login,},
  {path: "/register",name: "Register",component: Register,},
  
  {path: "/Cars",name: "Cars",component: Cars},
  {path: "/Cars/AddCar",name: "AddCar",component: AddCar},
  {path: "/Cars/EditCar/:id",name: "EditCar",component: EditCar},
  
  {path: "/Users",name: "Users",component: Users},

  {path: "/testEndpoints",name: "testEndpoints",component: TestEndpointsButtons},
  {path: "/404",name: "404",component: NotFound,},
  {path: "/:pathMatch(.*)", redirect: to => { return "/404" }}
  // {
  //   path: '/about',
  //   name: 'about',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: function () {
  //     return import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  //   }
  // }
]

const router = createRouter({
  // mode: 'history',
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
