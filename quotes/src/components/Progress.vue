<template>
    <div id="quote-progress" class="quotes-progress">
        <span>Quotes Added</span>
        <div class="progress">
            <div class="progress-bar bg-primary" role="progressbar" :style="progressBarStyle" aria-valuenow="1" aria-valuemin="0" aria-valuemax="100">
                {{ quote_count }}/{{ total_count }}
            </div>
        </div>
    </div>
</template>

<script>
export default {
    computed: {
        progressBarStyle() {
            return {
                width: this.quote_count * 10 + '%'
            }
        }
    },
    props: {
        'quote_count': {
            type: Number,
            required: true
        },
        'total_count': {
            type: Number,
            default: 10
        }
    }
}
</script>

<style scoped>
.progress-bar {
    font-size: 14px;
    min-width: 0;
    padding: 2px;
    text-shadow: 1px 1px 3px #888;
}

.progress-bar[aria-valuenow="1"] {
    color: black;
}
.quotes-progress {
    margin: 10px;
}

.progress-bar{
    padding: 5px;
}

</style>
