import Vue from 'vue'
import App from './App.vue'
// import Question from "./components/Question.vue";
// import Answer from "./components/Answer.vue";
// import Option from "./components/Option.vue";

// Vue.component('appOption', Option);
// Vue.component('question', Question);
// Vue.component('answer', Answer);

export const eventBus = new Vue;

new Vue({
  el: '#app',
  render: h => h(App)
})
