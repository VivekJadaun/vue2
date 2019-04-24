<template>
<div v-if="!getId" class="navbar navbar-dark bg-custom fixed-bottom justify-content-around">
  <ul class="navbar-nav mr-auto ">
    <li class="nav-item input-group mb-6 col-md-12">
      <input type="text" class="form-control" placeholder="Enter your name" ref="name" :value="getName" @keyup.enter="updateName($event.target.value)" autofocus>
      <div class="input-group-append">
        <button class="btn btn-outline-secondary" type="button" @click="updateName($refs.name.value)">Submit</button>
      </div>
    </li>
  </ul>
  <ul class="navbar-nav">
    <li class="nav-item">
      <button @click="launch()" class="btn btn-primary btn-lg">Launch</button>
    </li>
  </ul>
</div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  computed: {
    ...mapGetters([
      'getName',
      'getId',
      'getQuiz',
    ]),
  },
  methods: {
    ...mapActions([
      'updateName',
      'updateId',
    ]),
    
    launch() {    
      if (!this.getName) {
        this.updateName('John Doe');
      }
      if (!this.getId) {
        this.updateId(Date.now());        
      }
      if (!window.localStorage.getItem('quiz')) {
        window.localStorage.setItem('quiz', this.getQuiz);        
      }
    },
  }
}
</script>


<style scoped>
  * {
    font-size: 18px;
  }
  .nav-item {
    padding: 0; 
    margin-top: 15px;
    margin-bottom: 15px;
  }
  .navbar {
    color: #fff;
    /* text-shadow: 0 .05rem .1rem rgba(0, 0, 0, .5); */
    box-shadow: inset 0 0 5rem rgba(0, 0, 0, .5);
    padding-bottom: 0;
    padding-top: 0;
  }
  .bg-custom {
    background-color: #252830;
  }
</style>
