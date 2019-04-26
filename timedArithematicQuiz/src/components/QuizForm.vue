<template>
  <div class="quiz card text-center col-5">
    <div class="card-header">
      Quiz {{ quizIndex + 1 }}
    </div>

    <div class="card-body">
      <form class="form-group text-left">
        <div class="form-row ">
          <label :for="`questionsCount-${quizIndex}`" class="col-sm-6 col-form-label">Total questions</label>
          <input :id="`questionsCount-${quizIndex}`" type="number" class="form-control col-6" :value="getQuiz[quizIndex].totalQues" @input="updateTotalQues({quizIndex, value: $event.target.value})" required autofocus>
        </div>
        <div class="form-row ">
          <label :for="`interval-${quizIndex}`" class="col-sm-6 col-form-label">Timer interval</label>
          <div class="input-group col-6">
            <input :id="`interval-${quizIndex}`" type="number" class="form-control" :value="getQuiz[quizIndex].interval" @input="updateInterval({quizIndex, value: $event.target.value})" required >
            <div class="input-group-append">
              <span class="input-group-text" id="seconds">seconds</span>
            </div>
          </div>
        </div>
        <div class="form-check">
          <input :id="`checkBox${quizIndex}`" type="checkbox" class="form-check-input" required :checked="getQuiz[quizIndex].negativeMarking" @input="toggleNegativeMarking(quizIndex)">
          <label class="form-check-label" :for="`checkBox${quizIndex}`">Negative marking</label>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
export default {
  data() {
    return {
    //   quiz: null,
    }
  },
  props: ['quizIndex'],
  computed: {
    ...mapGetters([
      'getQuiz'
    ])
  },
  methods: {
    ...mapActions([
      'updateTotalQues',
      'updateInterval',
      'toggleNegativeMarking',
    ]),
  },
  created() {
    // console.log(this.quizIndex, this.getQuiz[this.quizIndex]);
  },
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
</style>
