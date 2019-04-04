<template>
    <div class="card text-white bg-success mb-3">
        <div class="card-body">
            <h2>That's Correct</h2>
            <hr>
            <button @click="next()" class="btn btn-primary btn-lg">Next Question</button>
        </div>
    </div>
</template>

<script>
import { eventBus } from "../main";

export default {
    methods: {
        next() {
            eventBus.$emit('nextQuestion');
        }
    }
}
</script>

<style scoped>
    .card-body {
        text-align: center;
        text-shadow: 2px 2px 8px black;
    }

    hr {
        color: black;
    }

    button {
        text-shadow: 1px 1px 2px black;
    }
</style>
