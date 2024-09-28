import Vue from 'vue'
import App from './App.vue'

import './registerServiceWorker'
import router from './router'

//BOOTSTRAP
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

//CSS
import "@/assets/global.css"

Vue.config.productionTip = false
Vue.use(BootstrapVue)
Vue.use(IconsPlugin)

new Vue({
  router,
  el: "#app",
  render: function (h) { return h(App) }
}).$mount('#app')
