<template>
    <div class="user-quote">
        <form>
            <div class="form-group">
                <label for="quote-input" class="col-md-12">Quote</label>
                <textarea id="quote-input" v-model="quote" class="form-control" rows="3" cols="20"></textarea>
            </div>
            <div class="form-group">
                <button @click.prevent="addQuote" class="btn btn-primary" type="submit">Add Quote</button>
            </div>
        </form>
    </div>
</template>

<script>
import { eventBus } from "../main";

export default {
    data() {
        return {
            quote: ''
        };
    },
    props: {
        'quote_count': {
            type: Number,
            required: true
        },
        'total_count': {
            type: Number,
            required: true
        },
        'quotes': {
            type: Array
        }
    },
    methods: {
        addQuote() {
            eventBus.$emit('quoteAdded', this.quote);
            this.quote = '';
        }
    }
}
</script>

<style scoped>
.user-quote {
    display: flex;
    /* text-align: center; */
    flex-direction: column;
    margin: 30px;
    /* padding: 5px; */
    align-items: center;
}

.user-quote label {
    text-align: center;

}

textarea {
    border-radius: 5px;
    /* padding: 10px; */
    text-align: center;
    vertical-align: middle;
    border: 2px solid #ccc;
    overflow: auto;
}

.btn {
    margin: 10px;
    padding: 8px;

}
</style>
