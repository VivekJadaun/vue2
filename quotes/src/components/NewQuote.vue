<template>
    <div class="user-quote">
        <div class="form-group row justify-content-center">
            <label for="quote-input" class="col-md-12">Quote</label>
            <input id="quote-input" @keyup.enter="newQuote" v-model="quote" class="form-control" autofocus/>
            <button @click="addQuote(quote)" class="btn btn-primary" type="submit">Add Quote</button>
        </div>
    </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
    data() {
        return {
            quote: ''
        };
    },
    methods: {
        ...mapActions([
            'addQuote',
        ]),
        newQuote() {
            this.addQuote(this.quote);
            this.quote = ''
        },
    }
}
</script>

<style scoped>
.user-quote {
    display: flex;
    flex-direction: column;
    margin: 30px;
    align-items: center;
}

.user-quote label {
    text-align: center;

}

.btn {
    margin: 10px;
    padding: 8px;

}
</style>
