<template>
    <div class="grid col-12 justify-content-between">
        <stock v-for="stock in getPortfolioListing()" :key="stock.name" :name="stock.name" :quantity="stock.quantity" :price="stock.price" :mode="mode"></stock>
    </div>
</template>

<script>
import Stock from "./stocks/Stock.vue";
import { mapGetters } from 'vuex';

export default {
    data() {
        return {
            mode: 'SELL',
        }
    },
    components: {
        stock: Stock,
    },
    methods: {
        ...mapGetters([
            'getPortfolioListing'
        ])
    }
}
</script>


<style scoped>
    .grid {
        display: flex;
        flex-flow: row wrap;
    }

    /* .card-header {
        background-color: aquamarine;
    } */

    .btn {
        color: white;
        background-color: #c82333;
    }
</style>
