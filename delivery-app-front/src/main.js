import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap"

//Global components
import NavBar from '@/components/NavBar.vue';
import BaseCard from '@/components/layoutComponents/BaseCard.vue';
import BaseDialog from '@/components/layoutComponents/BaseDialog.vue';

//White cards
import WhiteCard80 from '@/components/layoutComponents/WhiteCard80.vue';
import WhiteCard50 from '@/components/layoutComponents/WhiteCard50.vue';
import WhiteCard20 from '@/components/layoutComponents/WhiteCard20.vue';

const app = createApp(App)

app.component('NavBar', NavBar)
app.component('BaseCard', BaseCard)
app.component('BaseDialog', BaseDialog)
app.component('WhiteCard80', WhiteCard80)
app.component('WhiteCard50', WhiteCard50)
app.component('WhiteCard20', WhiteCard20)

app.use(store)
app.use(router)
app.mount('#app')
