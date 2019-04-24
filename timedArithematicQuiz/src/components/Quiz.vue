<template>
  <div class="quiz card text-center col-5">
    <div class="card-header">
      Quiz #{{quiz_id}}
    </div>

    <div class="card-body">
      <div v-if="getId && getName && !quiz_over">
        <br>
        <h5 class="card-title">
          <span class="bg-dark text-white timer">
            Seconds Left: <span>{{ getInterval(quiz_id) - getElapsed(quiz_id) }}</span>
          </span>
        </h5>
        <br>
        <div class="input-group mb-3">
          <div class="input-group-prepend">
            <span class="input-group-text">Q {{ getCurrentQues(quiz_id) }}</span>
            <span class="input-group-text">{{ question }} =</span>
          </div>
          <input ref="answer" type="text" class="form-control" :placeholder="hint" @keyup.enter="prepareNextQues()" autofocus>
          <div class="input-group-append">
            <button class="btn btn-outline-secondary" type="button" @click="prepareNextQues()">Next</button>
          </div>
        </div>
      </div>

      <div v-if="!getId && !quiz_over">
        <div class="form-group text-left">
          <div class="form-row ">
            <label for="questionsCount" class="col-sm-6 col-form-label">Total questions</label>
            <input id="questionsCount" type="number" class="form-control col-6" :value="getTotalQues(quiz_id)" @input="updateTotalQues({id:quiz_id, totalQues:$event.target.value})">
          </div>
          <div class="form-row ">
            <label for="interval" class="col-sm-6 col-form-label">Timer interval</label>
            <div class="input-group col-6">
              <input id="interval" type="number" class="form-control" :value="getInterval(quiz_id)" @input="updateInterval({id:quiz_id, interval:$event.target.value})" >
              <div class="input-group-append">
                <span class="input-group-text" id="seconds">seconds</span>
              </div>
            </div>
          </div>
          <div class="form-check">
            <input type="checkbox" class="form-check-input" :checked="getNegativeMarkingStatus(quiz_id)" @input="toggleNegativeMarking(quiz_id)">
            <label class="form-check-label" for="exampleCheck1">Negative marking</label>
          </div>
        </div>
      </div>

      <div v-if="quiz_over">
        <ul class="list-group">
          <li class="list-group-item d-flex justify-content-between align-items-center">
            Total Questions
            <span class="badge badge-primary">{{ getTotalQues(quiz_id) }}</span>
          </li>
          <li class="list-group-item d-flex justify-content-between align-items-center">
            Correct Answers
            <span class="badge badge-success">{{ getCorrect(quiz_id) }}</span>
          </li>
          <li class="list-group-item d-flex justify-content-between align-items-center">
            Incorrect Answers
            <span class="badge badge-danger">{{ getIncorrect(quiz_id) }}</span>
          </li>
          <li class="list-group-item d-flex justify-content-between align-items-center">
            Unanswered Questions
            <span class="badge badge-secondary">{{ getNotAnswered(quiz_id) }}</span>
          </li>
        </ul>
      </div>
    </div>

    <div v-if="getId && !quiz_over" class="card-footer text-muted">
        <div class="d-flex justify-content-around row">
          <div class="">
            <h5>Correct <span class="badge badge-success">{{ getCorrect(quiz_id) }}</span></h5>
          </div>
          <div class="">
            <h5>Incorrect <span class="badge badge-danger">{{ getIncorrect(quiz_id) }}</span></h5>
          </div>
          <div class="">
            <h5>Unanswered <span class="badge badge-secondary">{{ getNotAnswered(quiz_id) }}</span></h5>
          </div>
          <div class="">
            <h5>Total <span class="badge badge-primary">{{ getTotalQues(quiz_id) }}</span></h5>
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
      quiz_over: false,
      question: '',
      hint: '',
    }
  },
  watch: {
    getId() {
      this.setQuestion();
      this.stopTimer = setInterval(() => {
          this.incrementElapsed(this.quiz_id);
        }, 1000);
    },
    elapsed(elapsedTime) {
      if (elapsedTime >= this.getInterval(this.quiz_id)) {
        this.prepareNextQues();
      }
    }
  },
  props: {
    'quiz_id': {
      type: [Number, String],
      required: true,
    },
    'elapsed': {
      type: [Number, String],
      required: true, 
    }
  },
  computed: {
    ...mapGetters([
      'getId',
      'getName',
      'getQuiz',
      'getInterval',
      'getElapsed',
      'getTotalQues',
      'getNegativeMarkingStatus',
      'getMinValue',
      'getMaxValue',
      'getOperators',
      'getHint',
      'getCurrentQues',
      'getCorrect',
      'getIncorrect',
      'getNotAnswered',
    ]),
  },
  methods: {
    ...mapActions([
      'toggleNegativeMarking',
      'updateTotalQues',
      'updateInterval',
      'incrementCurrentQues',
      'updateAnswers',
      'resetElapsed',
      'incrementElapsed',
    ]),
    endTimer() {
      clearInterval(this.stopTimer);
    },
    evaluate(expression) {
      return new Function('return ' + expression)();
    },
    getRandomOperand() {
      return Math.trunc(Math.random() * (this.getMaxValue - this.getMinValue + 1)) + this.getMinValue;
    },
    setQuestion() {
      let index = Math.trunc(Math.random() * this.getOperators.length);  
      index = (index < this.getOperators.length) ? index : 0;
      let operator = this.getOperators[index];
      this.hint = (operator === '/') ? this.getHint : '';
      let firstOperand = this.getRandomOperand();
      let secondOperand = this.getRandomOperand();
      this.question = `${firstOperand} ${operator} ${secondOperand}`;
      return this.question;    
    },
    checkAnswer() {
      let answer = this.$refs.answer.value.trim();
      if (answer) {

        if (answer == this.evaluate(this.question)) {
          this.updateAnswers({answer: 1, id: this.quiz_id});
        } else {
          this.updateAnswers({answer: -1, id: this.quiz_id});
        }
        
      } else {
        this.updateAnswers({answer: 0, id: this.quiz_id});
      }
      this.$refs.answer.value = '';
      this.incrementCurrentQues(this.quiz_id);
    },
    prepareNextQues() {
      if (this.getCurrentQues(this.quiz_id) < this.getTotalQues(this.quiz_id)) {
        this.endTimer();
        this.resetElapsed(this.quiz_id);
        this.checkAnswer();
        this.setQuestion();
        this.stopTimer = setInterval(() => {
          this.incrementElapsed(this.quiz_id);
        }, 1000);
      } else {
        this.quiz_over = true;
        this.endTimer();
        this.resetElapsed(this.quiz_id);
        this.checkAnswer();
      }
    }
  },
  created() {
    if (this.getCurrentQues(this.quiz_id) > this.getTotalQues(this.quiz_id)) {
      this.quiz_over = true;
    }    
  }
}
</script>


<style scoped>
/* Hide HTML5 Up and Down arrows. */
  input[type="number"]::-webkit-outer-spin-button, input[type="number"]::-webkit-inner-spin-button {
      -webkit-appearance: none;
      margin: 0;
  }
  input[type="number"] {
      -moz-appearance: textfield;
  }

  .card {
    padding: 0;
    margin: 10px;
  }
  .form-row, .form-check {
    margin-top: 15px;
    margin-bottom: 15px;
  }
  .timer {
    padding: 10px;
    border-radius: 5px;
  }
</style>
