<template>
    <div @click="removeQuote" class="card bg-light mb-3 col-sm-6 col-md-4 col-lg-3">
        <div class="card-body">
            <p class="card-text" ref="quote"><slot name="content"></slot></p>
        </div>
    </div>
</template>

<script>
import { eventBus } from "../main";

export default {
    data() {
        return {
            quote: ''
        }
    },
    methods: {
        removeQuote() {
            eventBus.$emit('quoteRemoved', this.$refs.quote.querySelector('span').textContent);
        }
    }
}
</script>

<style scoped>
div.card {
    max-width: 18rem;
    cursor: pointer;
    margin: 10px;
    text-align: center;
    /* color: white; */
}


.card-text {
    font-size: 20px;
    text-shadow: 1px 1px 3px #ccc;    
    font-family: 'Arizonia', cursive;
}
</style>
