import Vue from 'vue';
import App from './App.vue';
import Quote from "./components/Quote.vue";
import Progress from "./components/Progress.vue";
import NewQuote from "./components/NewQuote.vue";
import Grid from "./components/Grid.vue";

Vue.component('quote', Quote);
Vue.component('quotesProgress', Progress);
Vue.component('newQuote', NewQuote);
Vue.component('quotesGrid', Grid);


export const eventBus = new Vue();

new Vue({
  el: '#app',
  render: h => h(App)
})
