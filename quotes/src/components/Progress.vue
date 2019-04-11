<template>
    <div id="quote-progress" class="quotes-progress">
        <span>Quotes Added</span>
        <div class="progress">
            <div class="progress-bar bg-primary" role="progressbar" :style="progressBarStyle" aria-valuenow="1" aria-valuemin="0" aria-valuemax="100">
                {{ getQuotesCount }}/{{ getMaxQuotes }}
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
    computed: {
        ...mapGetters([
            'getQuotesCount',
            'getMaxQuotes',
        ]),
        progressBarStyle() {
            return {
                width: this.getQuotesCount * 10 + '%'
            }
        }
    },
    methods: {
    }
}
</script>

<style scoped>
.progress-bar {
    font-size: 14px;
    min-width: 0;
    text-shadow: 1px 1px 3px #888;
    color: black;
}

.quotes-progress {
    margin: 10px;
}

</style>
