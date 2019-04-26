import Vue from "vue";
import Vuex from "vuex";
import { sampleQuiz } from "../constants";

Vue.use(Vuex);

const INITIAL_STATE = {
  name: '',
  launchTime: undefined,
  quiz: [sampleQuiz],
  minValue: 0,
  maxValue: 10,
  operators: ['-', '+', '/', '*'],
  hint: 'Round off your answer to 2 decimal places.',
};

export const store = new Vuex.Store({
  state: {
    name: '',
    launchTime: undefined,
    quiz: [{...sampleQuiz}],
    minValue: 0,
    maxValue: 10,
    operators: ['-', '+', '/', '*'],
    hint: 'Round off your answer to 2 decimal places.',
  },
  
  getters: {
    getName: ({ name }) => name,
    getLaunchTime: ({ launchTime }) => launchTime, 
    getQuiz: ({ quiz }) => quiz,
    getMinValue: ({ minValue }) => minValue,
    getMaxValue: ({ maxValue }) => maxValue,
    getOperators: ({ operators }) => operators,
    getHint: ({ hint }) => hint,

  },

  mutations: {
    resetState: (state) => {
      Object.assign(state, { ...INITIAL_STATE });
      window.location.hash = '';
    },

    loadState: (state, intermediateState) => {
      Object.assign(state, { ...intermediateState }); 
    },

    updateName: (state, value) => {
      state.name = value;
    },

    updateLaunchTime: (state, value) => {
      state.launchTime = value;
    },

    addQuiz: ({ quiz }) => quiz.push({...sampleQuiz}),
    
    removeQuiz: ({ quiz }) => {
      if (quiz.length > 1) {
        return quiz.pop();
      } else {
        return window.alert('Can\'t remove the last quiz!');
      }
    },
    
    updateTotalQues: ({ quiz }, {quizIndex, value}) => {
      quiz[quizIndex].totalQues = value;
    },
    
    incrementCurrentQues: ({ quiz }, quizIndex) => {
      quiz[quizIndex].currentQues += 1;
    },
    
    updateInterval: ({ quiz }, {quizIndex, value}) => {
      quiz[quizIndex].interval = value;
    },
    
    updateElapsed: ({ quiz }, {quizIndex, value}) => {
      quiz[quizIndex].elapsed = value;
    },

    updateAnswers: ({ quiz }, {quizIndex, value}) => {
      let answers = quiz[quizIndex].answers;
      
      if (value) {

        if (value > 0) {
          answers.correct += 1;
          answers.score += 1;
        } else {
          answers.incorrect += 1;
          if (quiz[quizIndex].negativeMarking) {
            answers.score -= 1;
          }
        }
        
      } else {
        answers.unanswered += 1;
      }
    },
    
    toggleNegativeMarking: ({ quiz }, quizIndex) => {
      quiz[quizIndex].negativeMarking = !quiz[quizIndex].negativeMarking;
    },
    
    incrementElapsed: ({ quiz }, quizIndex) => {
      quiz[quizIndex].elapsed += 1;
    },
    
    resetElapsed: ({ quiz }, quizIndex) => {
      quiz[quizIndex].elapsed = 0;
    },
    
    quizExpired: ({ quiz }, quizIndex) => {
      quiz[quizIndex].expired = true;
    }
  },
  
  actions: {
    resetState: ({ commit }) => commit('resetState'),
    loadState: ({ commit }, payload) => commit('loadState', payload),
    updateName: ({ commit }, payload) => commit('updateName', payload),
    updateLaunchTime: ({ commit }, payload) => commit('updateLaunchTime', payload),
    addQuiz: ({ commit }) => commit('addQuiz'),
    removeQuiz: ({ commit }) => commit('removeQuiz'),
    updateTotalQues: ({ commit }, payload) => commit('updateTotalQues', payload),
    incrementCurrentQues: ({ commit }, payload) => commit('incrementCurrentQues', payload),
    updateInterval: ({ commit }, payload) => commit('updateInterval', payload),
    updateElapsed: ({ commit }, payload) => commit('updateElapsed', payload),
    updateAnswers: ({ commit }, payload) => commit('updateAnswers', payload),
    toggleNegativeMarking: ({ commit }, payload) => commit('toggleNegativeMarking', payload),
    incrementElapsed: ({ commit }, payload) => commit('incrementElapsed', payload),
    resetElapsed: ({ commit }, payload) => commit('resetElapsed', payload),
    quizExpired: ({ commit }, payload) => commit('quizExpired', payload),
  },
});

store.subscribeAction((action, state) => {
  if (state.launchTime) {
    location.hash = JSON.stringify(state);
  }
})