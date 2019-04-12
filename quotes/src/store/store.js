import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export const store = new Vuex.Store({
    state: {
        quotes: [],
        max_quotes: 10,   
    },

    getters: {
        getQuotes: ({ quotes }) => quotes,
        getQuotesCount: ({ quotes }) => quotes.length,
        getMaxQuotes: ({ max_quotes }) => max_quotes,
    },

    mutations: {
        addQuote: ({ quotes }, payload) => quotes.unshift(payload),
        
        removeQuote: ({ quotes }, payload) => quotes.splice(payload, 1),
        
        emptyQuotes: ({ quotes }) => quotes.splice(0, quotes.length),               // b'cos { quotes = [] } was not working here
    },

    actions: {
        addQuote: ({ commit, state }, payload) => {
            let quote = payload.trim();
            if (quote.length > 0) {
                if (state.quotes.length < state.max_quotes) {
                    commit('addQuote', quote);
                } else {
                    window.alert('Quote capacity reached! Please remove existing quotes before adding new ones.');
                }
            } else {
                window.alert('Please enter a \'readable\' Quote!');
            }
        },

        removeQuote: ({ commit }, payload) => commit('removeQuote', payload),

        emptyQuotes: ({ commit }) => commit('emptyQuotes'),

    }
});