import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from './views/HomeView.vue'

import Login from "./Pages/Auth/Login.vue"
import Register from "./Pages/Auth/Register.vue"
import TestEndpointsButtons from './components/TestEndpointsButtons.vue'


const NotFound = () => import("./components/404.vue")

//CARS
const Cars = () => import("./Pages/Cars/Cars.vue")
const AddCar = () => import("./Pages/Cars/AddCar.vue")
const EditCar = () => import("./Pages/Cars/EditCar.vue")

//USERS
const Users = () => import("./Pages/Users/Users.vue")


Vue.use(VueRouter)

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
  {path: "*", redirect: to => { return "/404" }}
]

const router = new VueRouter({
  mode: 'history',
  // history: createWebHistory(),
  base: process.env.BASE_URL,
  routes
})

export default router
