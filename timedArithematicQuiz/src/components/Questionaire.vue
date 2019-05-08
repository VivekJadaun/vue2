<template>
  <div class="quiz card text-center col-5">
    <div class="card-header">
      Quiz #{{quizIndex + 1}}
    </div>

    <div class="card-body">

      <div v-if="getQuiz[quizIndex].expired">
        <div class="card text-white bg-dark mb-3">
          <div class="card-header">Score</div>
          <div class="card-body">
            <h5 class="card-title">{{ getQuiz[quizIndex].answers.score }}/{{ getQuiz[quizIndex].totalQues }}</h5>
          </div>
        </div>
        <ul class="list-group">
          <li class="alert alert-primary list-group-item d-flex justify-content-between align-items-center" role="alert">
            Total Questions
            <span class="badge badge-primary">{{ getQuiz[quizIndex].totalQues }}</span>
          </li>
          <li class="alert alert-success list-group-item d-flex justify-content-between align-items-center" role="alert">
            Correct Answers
            <span class="badge badge-success">{{ getQuiz[quizIndex].answers.correct }}</span>
          </li>
          <li class="alert alert-danger list-group-item d-flex justify-content-between align-items-center" role="alert">
            Incorrect Answers
            <span class="badge badge-danger">{{ getQuiz[quizIndex].answers.incorrect }}</span>
          </li>
          <li class="alert alert-secondary list-group-item d-flex justify-content-between align-items-center" role="alert">
            Unanswered Questions
            <span class="badge badge-secondary">{{ getQuiz[quizIndex].answers.unanswered }}</span>
          </li>
        </ul>
      </div>

      <div v-else>
        <br>
        <h5 class="card-title">
          <span class="bg-dark text-white timer">
            Seconds Left: <span>{{ getQuiz[quizIndex].interval - elapsed }}</span>
          </span>
        </h5>
        <br>
        <div class="input-group mb-3">
          <div class="input-group-prepend">
            <span class="input-group-text">Q {{ getQuiz[quizIndex].currentQues }}</span>
            <span class="input-group-text">{{ question }} =</span>
          </div>
          <input ref="answer" type="text" class="form-control" :placeholder="hint" @keyup.enter="submitAnswer()" autofocus>
          <div class="input-group-append">
            <button class="btn btn-outline-secondary" type="button" @click="submitAnswer()">Next</button>
          </div>
        </div>
      </div>

    </div>

    <div v-if="getLaunchTime && !getQuiz[quizIndex].expired" class="card-footer text-muted">
      <div class="alert alert-light" role="alert">
        <h4>Score: {{ getQuiz[quizIndex].answers.score }}</h4>
      </div>
      <div class="d-flex justify-content-around row">
        <div class="">
          <h5>Correct <span class="badge badge-success">{{ getQuiz[quizIndex].answers.correct }}</span></h5>
        </div>
        <div class="">
          <h5>Incorrect <span class="badge badge-danger">{{ getQuiz[quizIndex].answers.incorrect }}</span></h5>
        </div>
        <div class="">
          <h5>Unanswered <span class="badge badge-secondary">{{ getQuiz[quizIndex].answers.unanswered }}</span></h5>
        </div>
        <div class="">
          <h5>Total <span class="badge badge-primary">{{ getQuiz[quizIndex].totalQues }}</span></h5>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
export default {
  data() {
    return {
      question: '',
      hint: '',
    }
  },
  
  props: ['quizIndex', 'elapsed'],
  
  watch: {
    elapsed(elapsedSecs) {
      if (elapsedSecs > this.getQuiz[this.quizIndex].interval) {
        console.log('timeout');        
        this.submitAnswer();
      }
    },
  },
  
  computed: {
    ...mapGetters([
      'getHint',
      'getOperators',
      'getQuiz',
      'getLaunchTime',
      'getMinValue',
      'getMaxValue',
    ]),
  },
  
  methods: {
    ...mapActions([
      'incrementElapsed',
      'resetElapsed',
      'quizExpired',
      'incrementCurrentQues',
      'updateAnswers',
    ]),

    endTimer() {
      clearInterval(this.timerHandle);
    },

    evaluate(expression) {
      return Number (new Function('return ' + expression)());
    },
    
    getRandomOperand(minValue, maxValue) {
      return Math.trunc(Math.random() * (maxValue - minValue + 1)) + minValue;
    },
    
    checkAnswer() {
      let answer = Number (this.$refs.answer.value);
      if (answer) {
        if (answer == this.evaluate(this.question).toPrecision(3)) {
          this.updateAnswers({quizIndex: this.quizIndex, value: 1});
        } else {
          this.updateAnswers({quizIndex: this.quizIndex, value: -1});
        }
      } else {
          this.updateAnswers({quizIndex: this.quizIndex, value: 0});
      }
      this.incrementCurrentQues(this.quizIndex);
      this.$refs.answer.value = '';
    },
    
    setQuestion() {
      let firstOperand = this.getRandomOperand(this.getMinValue, this.getMaxValue);
      let secondOperand = this.getRandomOperand(this.getMinValue, this.getMaxValue);
      secondOperand = (secondOperand == 0) ? 1 : secondOperand;
      let operator = this.getOperators[Math.trunc(Math.random() * this.getOperators.length)];
      this.hint = (operator === '/') ? this.getHint : '';
      this.question = `${firstOperand} ${operator} ${secondOperand}`;
    },
    
    prepareQuestion() {
      if (this.getQuiz[this.quizIndex].currentQues > this.getQuiz[this.quizIndex].totalQues) {
        this.quizExpired(this.quizIndex);
      } else {
        this.setQuestion();
        this.timerHandle = setInterval(() => {
          this.incrementElapsed(this.quizIndex);
        }, 1000);
      }
    },

    submitAnswer() {
      this.endTimer();
      this.resetElapsed(this.quizIndex);
      this.checkAnswer();
      this.prepareQuestion();
    }
  },

  created() {
    if (!this.getQuiz[this.quizIndex].expired) {
      this.prepareQuestion();
    }
  },
}
</script>

<style scoped>
  .card {
    padding: 0;
    margin: 10px;
  }
  .timer {
    padding: 10px;
    border-radius: 5px;
  }
</style>
