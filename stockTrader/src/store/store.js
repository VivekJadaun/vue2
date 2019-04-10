import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

const getRandomPrice = (min = 50, max = 150) => Math.round(Math.random() * (max - min) + min);

export const store = new Vuex.Store({
    state: {
        funds: 10000,
        minAmount: 0,
        transaction: true,
        stocks: [
            { name: 'Apple', price: 100 },             
            { name: 'Google', price: 110 },           
            { name: 'Facebook', price: 120 },        
            { name: 'Tesla', price: 130 },             
        ],
        portfolio: [],
    },

    getters: {
        getFunds: state => state.funds,
        getStocks: state => {
            return state.stocks;
        },
        getPortfolioListing: state => {
            let portfolio = state.portfolio;
            for (let stock of portfolio) {
                stock.price = state.stocks.find((stockItem) => stockItem.name == stock.name).price;
            }
            return portfolio;
        },
        getPortfolio: state => state.portfolio,
    },

    mutations: {
        updateFunds: (state, payload) => {
            if (state.transaction) {
                if (payload.mode.trim().toLowerCase() === 'buy') {
                    if ((state.funds - payload.amount) > 0) {
                        state.funds -= payload.amount;
                    } else {
                        window.alert('Insufficient Funds');
                    }
                } else {
                    state.funds += payload.amount;
                }  
            }
            state.transaction = true;
        },

        updateStockPrices: (state, payload) => {
            state.stocks.forEach( (stock, index) => {
                stock.price = payload[index];
            });
        },

        updatePortfolio: (state, payload) => {
            let currentStock = state.portfolio.find(stock => (stock.name == payload.name));

            if (currentStock) {
                if (payload.mode.trim().toLowerCase() === 'buy') {
                    currentStock.quantity += payload.quantity;
                } else {
                    if (payload.quantity <= currentStock.quantity) {
                        currentStock.quantity -= payload.quantity;
                    } else {
                        state.transaction = false;
                        window.alert(`You can only sell ${currentStock.quantity} shares of this stock`);
                    }
                }
            } else {
                state.portfolio.push({name: payload.name, quantity: payload.quantity});                
            }
            state.portfolio = state.portfolio.filter(stock => (stock.quantity > 0));
        },

        reloadFunds: (state, payload) => {
            state.funds = payload;
        },
        reloadPortfolio: (state, payload) => {
            state.portfolio = payload;
        }
    },

    actions: {
        updateStockPrices: ({ commit }) => {
            let prices = [];
            for (const i in [1,2,3,4]) {
                prices[i] = getRandomPrice();
            }
            commit('updateStockPrices', prices);
        }, 

        buy: ({ commit }, payload) => {
            commit('updatePortfolio', payload);
            commit('updateFunds', { amount: payload.price * payload.quantity, mode: payload.mode});
        },
        
        sell: ({commit}, payload) => {
            commit('updatePortfolio', payload);
            commit('updateFunds', { amount: payload.price * payload.quantity, mode: payload.mode});
        }
    }
})