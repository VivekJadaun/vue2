<template>
    <div class="grid row">
        <div v-for="(item, index) in getQuotes" :key="index" @click="removeQuote(index)" class="card bg-light mb-3 col-sm-6 col-md-4 col-lg-3">
            <div class="card-body">
                <p class="card-text">{{ item }}</p>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
    computed: {
        ...mapGetters([
            'getQuotes',
        ]),
    },
    methods: {
        ...mapActions([
            'removeQuote',
        ]),
    }
}
</script>

<style scoped>
    .grid {
        display: flex;
        flex-flow: row wrap;
    }

    div.card {
        max-width: 18rem;
        cursor: pointer;
        margin: 10px;
        text-align: center;
        /* color: white; */
    }

    div.card:hover {
        color: white;
        background-color: #f19199 !important;
    }

    .card-text {
        font-size: 20px;
        text-shadow: 1px 1px 3px #ccc;    
        font-family: 'Arizonia', cursive;
    }
</style>
