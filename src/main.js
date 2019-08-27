import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './assets/css/clear.css'
import './assets/js/rem.js'
import Vant from 'vant';
import store from './store';
import clipboard from 'clipboard';
import 'vant/lib/index.css';
import VConsole from 'vconsole'

let vconsole = new VConsole
Vue.use(Vant);
import { Lazyload } from 'vant';
Vue.use(Lazyload);
Vue.config.productionTip = false
import { post, fetch } from "../config/axios";

router.beforeEach((to, from, next) => {
  document.title = to.meta.title
  next()
})
Vue.prototype.$get = fetch;
Vue.prototype.$post = post;
Vue.prototype.$clipboard = clipboard;
Vue.filter("name", function (value) {
  if (!value) return;
  let v = value.split("");
  v.splice(1, 1, "*");
  v = v.join("");
  return v;
});

Vue.filter("phone", function (value) {
  if (!value) return;
  let v = value.split("");
  v.splice(3, 4, "****");
  v = v.join("");
  return v;
});
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
