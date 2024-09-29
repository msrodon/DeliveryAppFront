import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'

import Login from "../components/Auth/Login.vue"
import Register from "../components/Auth/Register.vue"
import TestEndpointsButtons from '../components/TestEndpointsButtons.vue'
// import { component } from 'vue/types/umd'

// lazy-loaded
const NotFound = () => import("../components/404.vue")

//CARS
const AddCar = () => import("../components/Cars/AddCar.vue")
const Cars = () => import("../components/Cars/Cars.vue")


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
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
      path: "/404",
      name: "404",
      component: NotFound,
  },
  {
    path: "/testEndpoints",
    name: "testEndpoints",
    component: TestEndpointsButtons
  },
  {
    path: "/AddCar",
    name: "AddCar",
    component: AddCar
  },
  {
    path: "/Cars",
    name: "Cars",
    component: Cars
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
