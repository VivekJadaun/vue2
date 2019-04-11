<template>
    <div>
        <quotes-progress></quotes-progress>
        <new-quote></new-quote>
        <quotes-grid></quotes-grid>
        <div v-if="getQuotesCount" @click="emptyQuotes" class="alert alert-info footer" role="alert">
				Click on a <b>Quote</b> to delete it or click here to <i><b> clear all quotes </b></i>.
        </div>
    </div>
</template>

<script>
import Progress from "./components/Progress.vue";
import NewQuote from "./components/NewQuote.vue";
import Grid from "./components/Grid.vue";
import { mapGetters, mapActions } from "vuex";

export default {
    computed: {
        ...mapGetters([
            'getQuotesCount',
        ]),
    },
    components: {
        quotesProgress: Progress,
        newQuote: NewQuote,
        quotesGrid: Grid,
    },
    methods: {
        ...mapActions([
            'emptyQuotes',
        ]),
    }
}
</script>

<style scoped>
    .alert {
        cursor: pointer;
    }

    .alert:hover {
        color: #721c24;
        background-color: #f8d7da;
        border-color: #f5c6cb;
    }
</style>
