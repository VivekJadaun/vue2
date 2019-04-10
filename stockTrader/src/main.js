import Vue from 'vue'
import App from './App.vue'
import VueResource from "vue-resource";
import { store } from "./store/store";
import { router } from "./router";

Vue.use(VueResource);
Vue.http.options.root = 'https://stock-trader-77ad0.firebaseio.com/'

new Vue({
  el: '#app',
  store,
  router,
  render: h => h(App)
})
