import { createRouter, createWebHistory } from 'vue-router'

import store from "@/store/index.js"

import HomeView from '../views/HomeView.vue'

const Login = () => import("@/views/auth/Login.vue")
const Register = () => import("@/views/auth/Register.vue")
const ResetPassword = () => import("@/views/auth/ResetPassword.vue")

const TestEndpointsButtons = () => import('@/components/layoutComponents/TestEndpointsButtons.vue')
const NotFound = () => import("@/components/404.vue")

//DICTIONARIES
const Dictionaries = () => import("@/views/dictionaries/Dictionaries.vue")
const AddDictionary = () => import("@/views/dictionaries/AddDictionary.vue")
const EditDictionary = () => import("@/views/dictionaries/EditDictionary.vue")

//DICTIONARY TYPES
const DictionaryTypes = () => import("@/views/dictionaryTypes/DictionaryTypes.vue")
const AddDictionaryType = () => import("@/views/dictionaryTypes/AddDictionaryType.vue")

//CARS
const Cars = () => import("@/views/cars/Cars.vue")
const AddCar = () => import("@/views/cars/AddCar.vue")
const EditCar = () => import("@/views/cars/EditCar.vue")

//CURRENCIES
const Currencies = () => import("@/views/currencies/Currencies.vue")
const AddCurrency = () => import("@/views/currencies/AddCurrency.vue")
const EditCurrency = () => import("@/views/currencies/EditCurrency.vue")

//COUNTRIES
const Countries = () => import("@/views/countries/Countries.vue")
const AddCountry = () => import("@/views/countries/AddCountry.vue")
const EditCountry = () => import("@/views/countries/EditCountry.vue")

//ADDRESSES
const Addresses = () => import("@/views/addresses/Addresses.vue")
const AddAddress = () => import("@/views/addresses/AddAddress.vue")
const EditAddress = () => import("@/views/addresses/EditAddress.vue")

//PRICELISTS
const PriceLists = () => import("@/views/priceLists/PriceLists.vue")
const EditPriceList = () => import("@/views/priceLists/EditPriceList.vue")

//PACKAGES
const Packages = () => import("@/views/packages/Packages.vue")
const AddPackage = () => import("@/views/packages/AddPackage.vue")
const PackageInfo = () => import("@/views/packages/PackageInfo.vue")
const AllPackages = () => import("@/views/packages/AllPackages.vue")
const SendPackage = () => import("@/views/packages/SendPackage.vue")

//PACKAGES
const PackagesToAssign = () => import("@/views/storage/PackagesToAssign.vue")
const AssignPackage = () => import("@/views/storage/AssignPackage.vue")

//DELIVERIES
const Callendar = () => import("@/views/deliveries/Callendar.vue")
const DailyDeliveries = () => import("@/views/deliveries/DailyDeliveries.vue")
const DeliveriesHistory = () => import("@/views/deliveries/DeliveriesHistory.vue")

//USERS
const Users = () => import("@/views/users/Users.vue")
const EditUser = () => import("@/views/users/EditUser.vue")
const MyAccount = () => import("@/views/users/MyAccount.vue")
const SetNewPassword = () => import("@/views/users/SetNewPassword.vue")

//DRIVERS
const Drivers = () => import("@/views/drivers/Drivers.vue")
const EditDriver = () => import("@/views/drivers/EditDriver.vue")

//PAYMENTS
const Payment = () => import("@/views/payments/ProcessPayment.vue")

const routes = [
  {path: '/', name: 'home', component: HomeView, meta: { requiresAuth: true} },
  {path: '/dashboard', name: 'dashboard', component: HomeView, meta: { requiresAuth: true} },

  {path: "/login", name:"Login",component: Login, meta: { requiresUnauth: true }},
  {path: "/register", name: "Register",component: Register, meta: { requiresUnauth: true }},
  {path: "/resetPassword", name: "ResetPassword",component: ResetPassword, meta: { requiresUnauth: true }},
  
  {path: "/DictionaryTypes/:typeId/Dictionaries", name: "Dictionaries",component: Dictionaries, meta: { requiresAuth: true}},
  {path: "/DictionaryTypes/:typeId/Dictionaries/AddDictionary", name: "AddDictionary",component: AddDictionary, meta: { requiresAuth: true}},
  {path: "/DictionaryTypes/:typeId/Dictionaries/EditDictionary/:id", name: "EditDictionary",component: EditDictionary, meta: { requiresAuth: true}},

  {path: "/DictionaryTypes", name: "DictionaryTypes",component: DictionaryTypes, meta: { requiresAuth: true}},
  {path: "/DictionaryTypes/AddDictionaryType",name: "AddDictionaryType",component: AddDictionaryType, meta: { requiresAuth: true}},
  
  {path: "/Cars",name: "Cars",component: Cars, meta: { requiresAuth: true}},
  {path: "/Cars/AddCar",name: "AddCar",component: AddCar, meta: { requiresAuth: true}},
  {path: "/Cars/EditCar/:id",name: "EditCar",component: EditCar, meta: { requiresAuth: true}},

  {path: "/Currencies",name: "Currencies",component: Currencies, meta: { requiresAuth: true}},
  {path: "/Currencies/AddCurrency",name: "AddCurrency",component: AddCurrency, meta: { requiresAuth: true}},
  {path: "/Currencies/EditCurrency/:id",name: "EditCurrency",component: EditCurrency, meta: { requiresAuth: true}},

  {path: "/Countries",name: "Countries",component: Countries, meta: { requiresAuth: true}},
  {path: "/Countries/AddCountry",name: "AddCountry",component: AddCountry, meta: { requiresAuth: true}},
  {path: "/Countries/EditCountry/:id",name: "EditCountry",component: EditCountry, meta: { requiresAuth: true}},

  {path: "/Addresses",name: "Addresses",component: Addresses, meta: { requiresAuth: true}},
  {path: "/Addresses/AddAddress",name: "AddAddress",component: AddAddress, meta: { requiresAuth: true}},
  {path: "/Addresses/EditAddress/:id",name: "EditAddress",component: EditAddress, meta: { requiresAuth: true}},
  
  {path: "/PriceLists",name: "PriceLists",component: PriceLists, meta: { requiresAuth: true}},
  {path: "/PriceLists/EditPriceList/:id",name: "EditPriceList",component: EditPriceList, meta: { requiresAuth: true}},
  
  {path: "/Packages",name: "Packages",component: Packages, meta: { requiresAuth: true}},
  {path: "/AllPackages",name: "AllPackages",component: AllPackages, meta: { requiresAuth: true}},
  {path: "/Packages/AddPackage",name: "AddPackage",component: AddPackage, meta: { requiresAuth: true}},
  {path: "/Packages/PackageInfo/:id",name: "PackageInfo",component: PackageInfo, meta: { requiresAuth: true}},
  {path: "/Packages/SendPackage/:id",name: "SendPackage",component: SendPackage, meta: { requiresAuth: true}},

  {path: "/Storage/PackagesToAssign",name: "PackagesToAssign",component: PackagesToAssign, meta: { requiresAuth: true}},
  {path: "/Storage/AssignPackage/:id",name: "AssignPackage",component: AssignPackage, meta: { requiresAuth: true}},

  {path: "/Callendar",name: "Callendar",component: Callendar, meta: { requiresAuth: true}},
  {path: "/Deliveries/DailyDeliveries/:id",name: "DailyDeliveries",component: DailyDeliveries, meta: { requiresAuth: true}},
  {path: "/Deliveries/DeliveriesHistory",name: "DeliveriesHistory",component: DeliveriesHistory, meta: { requiresAuth: true}},
  
  {path: "/Users",name: "Users",component: Users, meta: { requiresAuth: true}},
  {path: "/Users/EditUser/:id",name: "EditUser",component: EditUser, meta: { requiresAuth: true}},
  {path: "/Users/SetNewPassword/:userId",name: "SetNewPassword",component: SetNewPassword, meta: { requiresAuth: true}},
  {path: "/MyAccount",name: "MyAccount",component: MyAccount, meta: { requiresAuth: true}},

  {path: "/Drivers",name: "Drivers", component: Drivers, meta: { requiresAuth: true}},
  {path: "/Drivers/EditDriver/:id",name: "EditDriver" ,component: EditDriver, meta: { requiresAuth: true}},
  
  {path: "/Payment/:id",name: "Payment",component: Payment, meta: { requiresAuth: true, layout: 'payment-layout' }},

  {path: "/testEndpoints",name: "testEndpoints",component: TestEndpointsButtons},
  {path: "/404",name: "404",component: NotFound,},
  {path: "/:pathMatch(.*)", redirect: to => { return "/404" }}
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

router.beforeEach(async (to, from, next) => {
  if (!store.getters['auth/UserIsAuthenticated']) {
    await store.dispatch('auth/TryLogin');
  }

  if (to.meta.requiresAuth && !store.getters['auth/UserIsAuthenticated']) {
    next('/Login');
  } else if (to.meta.requiresUnauth && store.getters['auth/UserIsAuthenticated']) {
    next('/');
  } else {
    next();
  }
});

export default router
