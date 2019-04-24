import Vue from "vue";
import Vuex from "vuex";
import { quizInfo } from "../constants";
Vue.use(Vuex);

const DEFAULT_STATE = quizInfo.quiz;

export const store = new Vuex.Store({
  state: {
    ...quizInfo,
    ...window.localStorage,
  },
  getters: {
    getName: (state) => state.name,
    getId: (state) => state.id,
    getQuiz: (state) => state.quiz,
    getParsedQuiz: (state) => JSON.parse(state.quiz),
    getMinValue: (state) => state.minValue,
    getMaxValue: (state) => state.maxValue,
    getOperators: (state) => state.operators,
    getHint: (state) => state.hint,
    getQuizIds: (state) => JSON.parse(state.quiz).map(({ id }) => id),
    getInterval: (state) => (id) => JSON.parse(state.quiz).find(quiz_item => quiz_item.id == id).interval,
    getElapsed: (state) => (id) => JSON.parse(state.quiz).find(quiz_item => quiz_item.id == id).elapsed,
    getTotalQues: (state) => (id) => JSON.parse(state.quiz).find(quiz_item => quiz_item.id == id).totalQues,
    getCurrentQues: (state) => (id) => JSON.parse(state.quiz).find(quiz_item => quiz_item.id == id).currentQues,
    getNegativeMarkingStatus: (state) => (id) => JSON.parse(state.quiz).find(quiz_item => quiz_item.id == id).negativeMarking,
    getCorrect: (state) => (id) => JSON.parse(state.quiz).find(quiz_item => quiz_item.id == id).correct,
    getIncorrect: (state) => (id) => JSON.parse(state.quiz).find(quiz_item => quiz_item.id == id).incorrect,
    getNotAnswered: (state) => (id) => JSON.parse(state.quiz).find(quiz_item => quiz_item.id == id).notAnswered,
  },
  
  mutations: {
    updateName: (state, payload) => {
      state.name = payload;
      window.localStorage.setItem('name', payload);
    },
    updateId: (state, payload) => {
      state.id = payload;
      window.localStorage.setItem('id', payload);
    },
    updateQuiz: (state) => {
      window.localStorage.setItem('quiz', state.quiz);
    },
    addQuiz: (state) => {
      let quiz = JSON.parse(state.quiz);
      let temp_quiz = JSON.parse(DEFAULT_STATE)[0];
      temp_quiz.id = quiz.length + 1;
      quiz.push(temp_quiz);
      state.quiz = JSON.stringify(quiz);
    },
    removeQuiz: (state) => {
      if (JSON.parse(state.quiz).length > 1) {
        let quiz = JSON.parse(state.quiz);
        quiz.pop();
        state.quiz = JSON.stringify(quiz);
      } else {
        window.alert('Can\'t remove the last quiz');
      }
    },
    incrementCurrentQues: (state, payload) => {
      let quiz = JSON.parse(state.quiz);
      quiz.find(el => el.id == payload).currentQues += 1;
      state.quiz = JSON.stringify(quiz);
    },
    updateTotalQues: (state, payload) => {
      let quiz = JSON.parse(state.quiz);
      quiz.find(el => el.id == payload.id).totalQues = payload.totalQues;
      state.quiz = JSON.stringify(quiz);
    },
    updateInterval: (state, payload) => {
      let quiz = JSON.parse(state.quiz);
      quiz.find(el => el.id == payload.id).interval = payload.interval;
      state.quiz = JSON.stringify(quiz);
    },
    toggleNegativeMarking: (state, payload) => {
      let quiz = JSON.parse(state.quiz);
      quiz.find(el => el.id == payload).negativeMarking = !quiz.find(el => el.id == payload).negativeMarking;
      state.quiz = JSON.stringify(quiz);
    },
    resetElapsed: (state, payload) => {
      let quiz = JSON.parse(state.quiz);
      quiz.find(el => el.id == payload).elapsed = 0;
      state.quiz = JSON.stringify(quiz);
    },
    incrementElapsed: (state, payload) => {
      let quiz = JSON.parse(state.quiz);
      quiz.find(el => el.id == payload).elapsed += 1;
      state.quiz = JSON.stringify(quiz);
    },
    updateAnswers: (state, { id, answer }) => {
      let quiz = JSON.parse(state.quiz);      
      if (answer == 0) {
        quiz.find(el => el.id == id).notAnswered += 1;
      } else if (answer > 0) {
        quiz.find(el => el.id == id).correct += 1;
      } else {
        quiz.find(el => el.id == id).incorrect += 1;
      }
      state.quiz = JSON.stringify(quiz);
    },
  },

  actions: {
    updateName: ({ commit }, payload) => commit('updateName', payload),
    updateId: ({ commit }, payload) => commit('updateId', payload),
    addQuiz: ({ commit }, payload) => {
      commit('addQuiz', payload);
      commit('updateQuiz');  
    },
    removeQuiz: ({ commit }) => {
      commit('removeQuiz')
      commit('updateQuiz');        
    },
    incrementCurrentQues: ({ commit }, payload) => {
      commit('incrementCurrentQues', payload);
      commit('updateQuiz');
    },
    updateTotalQues: ({ commit }, payload) => {
      commit('updateTotalQues', payload);
      commit('updateQuiz');  
    },
    updateInterval: ({ commit }, payload) => {
      commit('updateInterval', payload);
      commit('updateQuiz');  
    },
    toggleNegativeMarking: ({ commit }, payload) => {
      commit('toggleNegativeMarking', payload);
      commit('updateQuiz');  
    },
    resetElapsed: ({ commit }, payload) => {
      commit('resetElapsed', payload);
      commit('updateQuiz');  
    },
    incrementElapsed: ({ commit }, payload) => {
      commit('incrementElapsed', payload);
      commit('updateQuiz');  
    },
    updateAnswers: ({ commit }, payload) => {
      commit('updateAnswers', payload);
      commit('updateQuiz');  
    },
  },
});