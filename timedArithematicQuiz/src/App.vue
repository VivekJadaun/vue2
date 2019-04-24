<template>
  <div id="app" class="container-fluid">
    <header-nav></header-nav>
    <div id="quiz-container" class="container col-12 justify-content-around d-flex ">
      <quiz v-for="(quiz_id, index) in getQuizIds" :key="index" :quiz_id="quiz_id"></quiz>
    </div>
    <footer-nav></footer-nav>
  </div>
</template>

<script>
import headerNav from "./components/Header.vue";
import footerNav from "./components/Footer.vue";
import quiz from "./components/Quiz.vue";
import { mapGetters } from 'vuex';


export default {
  computed: {
    ...mapGetters([
      'getQuizIds'
    ]),
  },
  components: {
    headerNav,
    footerNav,
    quiz,
  }
}
</script>

<style>
  body {
    margin: auto;
    margin-top: 90px;
    margin-bottom: 110px;
    background-color: #252830;
  }

  .container {
    padding: 0;
    margin-top: 15px;
    margin-bottom: 20px;
    flex-flow: row wrap;
  }

</style>
