<template>
    <div class="card col col-md-5 form-group text-white border-success mb-3">
        <div class="card-header row ">
            <h5 class="">{{ name }}</h5>
            <hr>
            <p class="align-text-left">
                (
                <span class="card-subtitle">Price: {{ price }}</span>
                <span v-if="quantity" class="card-subtitle">| Quantity: {{ quantity }}</span>
                )
            </p>
        </div>
        <div class="card-body row justify-content-between">
            <input type="text" class="input-group form-control col-sm-5" placeholder="Quantity" ref="qty">
            <button class="btn btn-warning" @click="updatePortfolio()">{{ mode }}</button>
        </div>
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
export default {
    props: ['name', 'mode', 'price', 'quantity'],
    methods: {
        ...mapActions([
            'buy',
            'sell'
        ]),
        updatePortfolio($event) {
            let stock = {
                quantity: Number(this.$refs.qty.value),
                name: this.name,
                price: this.price,
                mode: this.mode,
            };
            if (this.mode == 'BUY') {
                this.buy(stock);
            } else {
                this.sell(stock);
            }
            this.$refs.qty.value = '';
        },
    },
}
</script>

<style scoped>
    .card {
        margin: 10px;
    }

    .card-header {
        background-color: #218838;
    }

    /* .card-header p , .card-header span{
        color: white;
    } */
</style>
