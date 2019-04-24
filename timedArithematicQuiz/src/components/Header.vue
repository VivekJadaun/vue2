<template>
<div class="navbar navbar-expand-lg navbar-dark bg-custom fixed-top">
  <ul class="navbar-nav mr-auto">
    <li class="nav-item">
      <span class="navbar-brand">
        Timed Arithematic Quiz
      </span>
    </li>
  </ul>
  <ul class="nav nav-pills justify-content-between">
    <li v-if="!getId" class="nav-item">
      <button class="btn " @click="addQuiz()" >Add Quiz</button>
    </li>
    <li v-if="!getId" class="nav-item">
      <button class="btn " @click="removeQuiz()">Remove Quiz</button>
    </li>
    <li class="nav-item">
      <button @click="reset()" class="btn ">Reset</button>
    </li>
  </ul>
</div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import { quizInfo } from "../constants";

export default {
  data() {
    return {
      
    }
  },
  computed: {
    ...mapGetters([
      'getId',
    ]),
  },
  methods: {
    ...mapActions([
      'resetAll',
      'addQuiz',
      'removeQuiz',
    ]),
    reset() {
      window.localStorage.clear();
      this.$store.replaceState(quizInfo);
      location.reload();
    },
  }
}
</script>


<style scoped>
  * {
    font-size: 18px;
    vertical-align: middle;
  }
  .nav-item {
    padding-left: 12px; 
  }
  .nav-item span {
    /* cursor: pointer; */
  }
  .navbar {
    color: #fff;
    text-shadow: 0 .05rem .1rem rgba(0, 0, 0, .5);
    box-shadow: inset 0 0 5rem rgba(0, 0, 0, .5);
    /* position: fixed; */
    /* margin-top: 30px; */
    /* border: 1px solid #ccc; */
    /* border-radius: 4px; */
  }
  .navbar-brand {
    font-size: 24px;    
  }
  .bg-custom {
    background-color: #252830;
  }
  .btn {
    color: #fff;
    background-color: transparent;  

  }

  .btn:hover {
    /* background-color: #20c997;   */
    background-color: #007bff;  
  }
</style>
