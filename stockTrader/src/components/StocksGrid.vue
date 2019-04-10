<template>
    <div class="grid col-12 justify-content-between">
        <stock v-for="stock in getStocks()" :key="stock.name" :name="stock.name" :price="stock.price" :mode="mode" ></stock>
    </div>
</template>

<script>
import Stock from "./stocks/Stock.vue";
import { mapGetters } from 'vuex';

export default {
    data() {
        return {
            mode: 'BUY',
        }
    },
    components: {
        stock: Stock,
    },   
    computed: {},
    methods: {
        ...mapGetters([
            'getStocks'
        ])
    }
}
</script>

<style scoped>
    .grid {
        display: flex;
        flex-flow: row wrap;
        /* background-color: azure; */
        /* height: 500px; */
    }

    .card-header {
        /* background-color: green; */
    }

    .btn {
        /* color: white; */
    }

    /* [data-mode="BUY"] .btn { */
        /* background-color: #c82333; */
    /* } */

    /* [data-mode="SELL"] .btn { */
        /* background-color: #218838; */
    /* } */


</style>