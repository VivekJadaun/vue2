<template>
    <div class="">
        <nav class="navbar navbar-expand-lg navbar-light bg-light">
            <ul class="navbar-nav mr-auto">
                <router-link class="nav-item nav-link" to="/" tag="li" active-class="active" exact>
                    <span >Stock Trader</span>
                </router-link>
                <router-link class="nav-item nav-link" to="/portfolio" tag="li" active-class="active" exact>
                    <span>PortFolio</span>
                </router-link>
                <router-link class="nav-item nav-link" to="/stocks" tag="li" active-class="active" exact>
                    <span>Stocks</span>
                </router-link>
            </ul>
            <ul class="navbar-nav">
                <li class="nav-item">
                    <span @click="updateStockPrices">End Day</span>
                </li>
                <li class="nav-item dropdown">
                    <span class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Save & Load</span>
                    <div class="dropdown-menu">
                        <span @click="save" class="dropdown-item">Save Data</span>
                        <span @click="load" class="dropdown-item">Load Data</span>
                    </div>
                </li>
                <li class="nav-item">
                    <span style="cursor: default;"><b>Funds:</b> ₹​ {{ getFunds() }}</span>
                </li>
            </ul>
        </nav>
    </div>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from "vuex";
export default {
    computed: {
        },
    methods: {
        ...mapGetters([
            'getFunds',
            'getPortfolio',
        ]),
        ...mapActions([
            'updateStockPrices',
            'updatePortfolio',
        ]),
        ...mapMutations([
            'reloadFunds',
            'reloadPortfolio',
        ]),

        save() {
            let stocksData = {
                funds: this.getFunds(),
                portfolio: this.getPortfolio()
            };
            this.$http.put('stockMarketState.json', stocksData)
                .then(
                    response => window.alert('Portfolio and Funds data saved successfully'), 
                    error => {
                        window.alert('Error while saving data to firebase cloud, check console output for error details');
                        console.error('Error while saving data to firebase cloud: ', error);
                    }
                );
        },

        load() {
            this.$http.get('stockMarketState.json')
            .then(response => {
                this.reloadFunds(response.body.funds);
                this.reloadPortfolio(response.body.portfolio);
                window.alert('Portfolio and Funds data loaded successfully')
            }, error => {
                window.alert('Error while loading data from firebase cloud, check console output for error details');
                console.error('Error while loading data from firebase cloud: ', error);
            })
        }
    }
}
</script>

<style scoped>
    * {
        padding: 5px;
        vertical-align: middle;
        font-size: 16px;
    }

    .nav-item span {
        cursor: pointer;
    }

    .navbar {
        border: 1px solid #ccc;
        border-radius: 4px;
    }

</style>
