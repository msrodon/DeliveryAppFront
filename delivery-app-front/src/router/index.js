import { createRouter, createWebHistory } from 'vue-router'
import store from "@/store/index.js"

import HomeView from '../views/HomeView.vue'

const Login = () => import("@/views/auth/Login.vue")
const Register = () => import("@/views/auth/Register.vue")

const TestEndpointsButtons = () => import('@/components/layoutComponents/TestEndpointsButtons.vue')
const NotFound = () => import("@/components/404.vue")

//CARS
const Cars = () => import("@/views/cars/Cars.vue")
const AddCar = () => import("@/views/cars/AddCar.vue")
const EditCar = () => import("@/views/cars/EditCar.vue")

//USERS
const Users = () => import("@/views/users/Users.vue")
const EditUser = () => import("@/views/users/EditUser.vue")

const routes = [
  {path: '/', name: 'home', component: HomeView },
  {path: '/dashboard', name: 'dashboard', component: HomeView },

  {path: "/login", name:"Login",component: Login, meta: { requiresUnauth: true }},
  {path: "/register",name: "Register",component: Register, meta: { requiresUnauth: true }},
  
  {path: "/Cars",name: "Cars",component: Cars, meta: { requiresAuth: true}},
  {path: "/Cars/AddCar",name: "AddCar",component: AddCar, meta: { requiresAuth: true}},
  {path: "/Cars/EditCar/:id",name: "EditCar",component: EditCar, meta: { requiresAuth: true}},
  
  {path: "/Users",name: "Users",component: Users, meta: { requiresAuth: true}},
  {path: "/Users/EditUser/:id",name: "EditUser",component: EditUser, meta: { requiresAuth: true}},

  {path: "/testEndpoints",name: "testEndpoints",component: TestEndpointsButtons},
  {path: "/404",name: "404",component: NotFound,},
  {path: "/:pathMatch(.*)", redirect: to => { return "/404" }}
]

const router = createRouter({
  mode: 'history',
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach(function(to, from, next){

  if(!store.getters['auth/UserIsAuthenticated']){
    store.dispatch('auth/TryLogin');    
  } 

  if(to.meta.requiresAuth && !store.getters['auth/UserIsAuthenticated']){
    next('/Login');
  }else if(to.meta.requiresUnauth && !!store.getters['auth/UserIsAuthenticated']){
    next('/')
  }else{
    next();
  }
});

export default router
