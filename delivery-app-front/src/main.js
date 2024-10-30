import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index.js'
import store from './store/index.js'

import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap"

//CSS
import "@/assets/styles/global.css"

//Global components
import BaseCard from '@/components/layoutComponents/BaseCard.vue';
import BaseDialog from '@/components/layoutComponents/BaseDialog.vue';

import WhiteCard80 from '@/components/layoutComponents/WhiteCard80.vue';
import WhiteCard50 from '@/components/layoutComponents/WhiteCard50.vue';
import WhiteCard20 from '@/components/layoutComponents/WhiteCard20.vue';

const app = createApp(App);

app.component('BaseCard', BaseCard);
app.component('BaseDialog', BaseDialog);
app.component('WhiteCard80', WhiteCard80);
app.component('WhiteCard50', WhiteCard50);
app.component('WhiteCard20', WhiteCard20);

app.use(store);
app.use(router);
app.mount('#app');
