<template>
    <div>
        <quotes-progress :quote_count="quote_count" :total_count="max_quotes"></quotes-progress>
        <new-quote :quote_count="quote_count" :total_count="max_quotes" :quotes="quotes"></new-quote>
        <quotes-grid :quotes="quotes"></quotes-grid>
    </div>
</template>

<script>
import { eventBus } from "./main";

export default {
    data () {
        return {
            quote_count: 1,
            max_quotes: 10,
            quotes: ['Just a random Quote to start with.']
        }
    },
    methods: {
        
    },
    created() {
        eventBus.$on('quoteAdded', (quote) => {
            if (quote.length > 0) {
                if (this.quote_count < this.max_quotes) {
                    this.quotes.push(quote);
                    ++this.quote_count;   
                } else {
                    window.alert('Quote capacity reached! Please remove existing quotes before adding new ones.');
                }
            }
        });
        eventBus.$on('quoteRemoved', (quote) => {
            this.quotes.splice(this.quotes.indexOf(quote), 1);
            --this.quote_count;
        });
    }
}
</script>

<style scoped>


</style>
