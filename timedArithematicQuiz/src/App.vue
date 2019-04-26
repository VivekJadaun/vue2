<template>
  <div id="app" class="">
    <!-- HEADER -->
    <div class="navbar navbar-expand-lg navbar-dark bg-custom fixed-top">
      <ul class="navbar-nav mr-auto">
        <li class="nav-item">
          <span class="navbar-brand">
            Timed Arithematic Quiz
          </span>
        </li>
      </ul>
      <ul class="nav nav-pills justify-content-between">
        <template v-if="!getLaunchTime">
          <li class="nav-item">
            <button class="btn btn-success" @click="addQuiz()" >Add Quiz</button>
          </li>
          <li class="nav-item">
            <button class="btn btn-danger" @click="removeQuiz()">Remove Quiz</button>
          </li>
        </template>
        <li class="nav-item">
          <button @click="resetState()" class="btn btn-light">Reset</button>
        </li>
      </ul>
    </div>

    <!-- QUIZ QUESTIONAIRE -->
    <div class="container col-12 justify-content-around d-flex">
      <template v-if="getLaunchTime" >     <!-- ADD CONDITION TO GET QUIZ DATA FROM URL -->
        <questionaire v-for="(quiz, index) in getQuiz" :key="index" :quizIndex="index" :elapsed="getQuiz[index].elapsed"></questionaire>
      </template>

      <!-- QUIZ FORM -->
      <template v-else >             
        <quiz-form v-for="(quiz, index) in getQuiz" :key="index" :quizIndex="index"></quiz-form>
      </template>
    </div>

    <!-- FOOTER -->
    <div v-if="!getLaunchTime" class="navbar navbar-dark bg-custom fixed-bottom justify-content-around">
      <ul class="navbar-nav mr-auto ">
        <li class="nav-item input-group mb-6 col-md-12">
          <input ref="name" type="text" class="form-control" placeholder="Enter your name" @input="setName()" autofocus>
          <div class="input-group-append">
            <button class="btn btn-outline-secondary" type="button" @click="setName()"  >Submit</button>
          </div>
        </li>
      </ul>
      <ul class="navbar-nav">
        <li class="nav-item">
          <button @click="launch()" class="btn btn-primary">Launch</button>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import { sampleQuiz } from "./constants";
import Questionaire from './components/Questionaire.vue';
import QuizForm from './components/QuizForm.vue';
export default {
  computed: {
    ...mapGetters([
      'getLaunchTime',
      'getQuiz',
    ]),
  },

  components: {
    questionaire: Questionaire,
    quizForm: QuizForm,    
  },

  methods: {
    ...mapActions([
      'addQuiz',
      'removeQuiz',
      'updateLaunchTime',
      'updateName',
      'resetState',
      'loadState',
    ]),

    setName() {
      this.updateName(this.$refs.name.value);
    },

    launch() {
      this.updateLaunchTime(Date.now());
    },
  },
  
  created() {
    if (window.location.hash) {
      this.loadState(JSON.parse(decodeURI(window.location.hash.substring(1))));
    }
  }
}
</script>

<style>
  * {
    font-size: 18px;
    vertical-align: middle;
  }
  body {
    margin: 90px 20px 110px 20px;
    background-color: #252830;
  }
  .container {
    padding: 0;
    margin-top: 15px;
    margin-bottom: 20px;
    flex-flow: row wrap;
  }
  .nav-item {
    padding-left: 12px; 
  }
  .navbar {
    color: #fff;
    box-shadow: inset 0 0 5rem rgba(0, 0, 0, .5);
    padding-bottom: 10px;
    padding-top: 10px;
  }
  .navbar-brand {
    font-size: 24px;    
  }
  .bg-custom {
    background-color: #252830;
  }
</style>
