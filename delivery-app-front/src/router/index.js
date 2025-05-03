import { createRouter, createWebHistory } from 'vue-router'

import store from "@/store/index.js"
import HomeView from '../views/HomeView.vue'

const Login = () => import("@/views/auth/Login.vue")
const Register = () => import("@/views/auth/Register.vue")
const ResetPassword = () => import("@/views/auth/ResetPassword.vue")

const NotFound = () => import("@/components/404.vue")
const NoPermission = () => import("@/components/NoPermission.vue")

//DICTIONARIES
const Dictionaries = () => import("@/views/dictionaries/Dictionaries.vue")
const AddDictionary = () => import("@/views/dictionaries/AddDictionary.vue")
const EditDictionary = () => import("@/views/dictionaries/EditDictionary.vue")

//DICTIONARY TYPES
const DictionaryTypes = () => import("@/views/dictionaryTypes/DictionaryTypes.vue")
const AddDictionaryType = () => import("@/views/dictionaryTypes/AddDictionaryType.vue")
const EditDictionaryType = () => import("@/views/dictionaryTypes/EditDictionaryType.vue")

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
const CollectPackage = () => import("@/views/packages/CollectPackage.vue")

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
  
  {path: "/MyAccount",name: "MyAccount",component: MyAccount, meta: { requiresAuth: true}},
  
  //CLIENT
  {path: "/Packages",name: "Packages",component: Packages, meta: { requiresAuth: true, roles: ['Client']}},
  {path: "/Packages/AddPackage",name: "AddPackage",component: AddPackage, meta: { requiresAuth: true, roles: ['Client']}},
  {path: "/Packages/PackageInfo/:id",name: "PackageInfo",component: PackageInfo, meta: { requiresAuth: true, roles: ['Client', 'Admin']}},
  {path: "/Packages/SendPackage/:id",name: "SendPackage",component: SendPackage, meta: { requiresAuth: true, roles: ['Client']}},
  {path: "/Packages/CollectPackage/:id",name: "CollectPackage",component: CollectPackage, meta: { requiresAuth: true, roles: ['Client']}},
  
  {path: "/Payment/:id",name: "Payment",component: Payment, meta: { requiresAuth: true, layout: 'payment-layout', roles: ['Client']}},

  {path: "/Addresses",name: "Addresses",component: Addresses, meta: { requiresAuth: true, roles: ['Client']}},
  {path: "/Addresses/AddAddress",name: "AddAddress",component: AddAddress, meta: { requiresAuth: true, roles: ['Client']}},
  {path: "/Addresses/EditAddress/:id",name: "EditAddress",component: EditAddress, meta: { requiresAuth: true, roles: ['Client']}},

  //DELIVERY
  {path: "/Callendar",name: "Callendar",component: Callendar, meta: { requiresAuth: true}},
  {path: "/Deliveries/DeliveriesHistory",name: "DeliveriesHistory",component: DeliveriesHistory, meta: { requiresAuth: true, roles: ['Delivery']}},
  {path: "/Deliveries/DailyDeliveries/:id",name: "DailyDeliveries",component: DailyDeliveries, meta: { requiresAuth: true, roles: ['Delivery']}},

  //STORAGE MANAGER
  {path: "/Storage/PackagesToAssign",name: "PackagesToAssign",component: PackagesToAssign, meta: { requiresAuth: true, roles: ['Admin', 'DeliveryManager']}},
  {path: "/Storage/AssignPackage/:id",name: "AssignPackage",component: AssignPackage, meta: { requiresAuth: true, roles: ['Admin', 'DeliveryManager']}},

  {path: "/Cars",name: "Cars",component: Cars, meta: { requiresAuth: true}, meta: { requiresAuth: true, roles: ['Admin', 'Support', 'DeliveryManager']}},
  {path: "/Cars/AddCar",name: "AddCar",component: AddCar, meta: { requiresAuth: true}, meta: { requiresAuth: true, roles: ['Admin', 'Support', 'DeliveryManager']}},
  {path: "/Cars/EditCar/:id",name: "EditCar",component: EditCar, meta: { requiresAuth: true}, meta: { requiresAuth: true, roles: ['Admin', 'Support', 'DeliveryManager']}},

  {path: "/Drivers",name: "Drivers", component: Drivers, meta: { requiresAuth: true, roles: ['Admin', 'Support', 'DeliveryManager']}},
  {path: "/Drivers/EditDriver/:id",name: "EditDriver" ,component: EditDriver, meta: { requiresAuth: true, roles: ['Admin', 'Support', 'DeliveryManager']}},
  
  //SUPPORT
  {path: "/AllPackages",name: "AllPackages",component: AllPackages, meta: { requiresAuth: true, roles: ['Admin', 'Support']}},

  {path: "/Users",name: "Users",component: Users, meta: { requiresAuth: true, roles: ['Admin', 'Support']}},
  {path: "/Users/EditUser/:id",name: "EditUser",component: EditUser, meta: { requiresAuth: true, roles: ['Admin', 'Support']}},
  {path: "/Users/SetNewPassword/:userId",name: "SetNewPassword",component: SetNewPassword, meta: { requiresAuth: true}},

  //ADMIN 
  {path: "/Currencies",name: "Currencies",component: Currencies, meta: { requiresAuth: true, meta: { requiresAuth: true, roles: ['Admin']}}},
  {path: "/Currencies/AddCurrency",name: "AddCurrency",component: AddCurrency, meta: { requiresAuth: true}, meta: { requiresAuth: true, roles: ['Admin']}},
  {path: "/Currencies/EditCurrency/:id",name: "EditCurrency",component: EditCurrency, meta: { requiresAuth: true}, meta: { requiresAuth: true, roles: ['Admin']}},

  {path: "/PriceLists",name: "PriceLists",component: PriceLists, meta: { requiresAuth: true}, meta: { requiresAuth: true, roles: ['Admin']}},
  {path: "/PriceLists/EditPriceList/:id",name: "EditPriceList",component: EditPriceList, meta: { requiresAuth: true}, meta: { requiresAuth: true, roles: ['Admin']}},
  
  {path: "/Countries",name: "Countries",component: Countries, meta: { requiresAuth: true}, meta: { requiresAuth: true, roles: ['Admin']}},
  {path: "/Countries/AddCountry",name: "AddCountry",component: AddCountry, meta: { requiresAuth: true}, meta: { requiresAuth: true, roles: ['Admin']}},
  {path: "/Countries/EditCountry/:id",name: "EditCountry",component: EditCountry, meta: { requiresAuth: true}, meta: { requiresAuth: true, roles: ['Admin']}},
  
  {path: "/DictionaryTypes", name: "DictionaryTypes",component: DictionaryTypes, meta: { requiresAuth: true}, meta: { requiresAuth: true, roles: ['Admin']}},
  {path: "/DictionaryTypes/AddDictionaryType",name: "AddDictionaryType",component: AddDictionaryType, meta: { requiresAuth: true}, meta: { requiresAuth: true, roles: ['Admin']}},
  {path: "/DictionaryTypes/EditDictionaryType/:typeId", name: "EditDictionaryType",component: EditDictionaryType, meta: { requiresAuth: true}, meta: { requiresAuth: true, roles: ['Admin']}},
  
  {path: "/DictionaryTypes/:typeId/Dictionaries", name: "Dictionaries",component: Dictionaries, meta: { requiresAuth: true}, meta: { requiresAuth: true, roles: ['Admin']}},
  {path: "/DictionaryTypes/:typeId/Dictionaries/AddDictionary", name: "AddDictionary",component: AddDictionary, meta: { requiresAuth: true}, meta: { requiresAuth: true, roles: ['Admin']}},
  {path: "/DictionaryTypes/:typeId/Dictionaries/EditDictionary/:id", name: "EditDictionary",component: EditDictionary, meta: { requiresAuth: true}, meta: { requiresAuth: true, roles: ['Admin']}},
  
  //OTHERS
  {path: "/404",name: "404",component: NotFound,},
  {path: "/NoPermission",name: "NoPermission",component: NoPermission,},
  {path: "/:pathMatch(.*)", redirect: to => { return "/404" }}
]

// const router = createRouter({
//   history: createWebHashHistory(),
//   routes
// })
const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

router.beforeEach(async (to, from, next) => {
  const isAuthenticated = store.getters['auth/UserIsAuthenticated'];
  const userRole = store.getters['auth/UserRole'];

  if (!isAuthenticated) {
    await store.dispatch('auth/TryLogin');
  }

  // 1. Jeśli wymagane logowanie, a użytkownik niezalogowany → przekieruj do /Login
  if (to.meta.requiresAuth && !isAuthenticated) {
    return next('/Login');
  }

  // 2. Jeśli wymagane niezalogowanie, a użytkownik już zalogowany → przekieruj do home
  if (to.meta.requiresUnauth && isAuthenticated) {
    return next('/');
  }

  // 3. Jeśli są wymagane role i użytkownik nie ma żadnej z nich → przekieruj (np. brak uprawnień)
  if (to.meta.roles && !to.meta.roles.includes(userRole)) {
    return next('/NoPermission'); 
  }

  // 4. Domyślnie → przepuść
  next();
});

export default router
