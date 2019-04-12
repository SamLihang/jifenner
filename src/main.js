import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './assets/css/clear.css'
import './assets/js/rem.js'
import Vant from 'vant';
import store from './store';
import clipboard from 'clipboard';
import 'vant/lib/index.css';
Vue.use(Vant);
import { Lazyload } from 'vant';
Vue.use(Lazyload);
Vue.config.productionTip = false
import { post, fetch }  from "../config/axios";
Vue.prototype.$get=fetch;
Vue.prototype.$post=post;
Vue.prototype.$clipboard=clipboard;
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
