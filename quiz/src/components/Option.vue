<template>
    <div class="option">
        <button @click="checkOption" ref="choice" class="btn btn-primary btn-lg">
            <slot name="options"></slot>
        </button>
    </div>
</template>

<script>
import { eventBus } from "../main";

export default {
    data() {
        return {
            choice: ''
        };
    },
    methods: {
        checkOption() {
            eventBus.$emit('answered', this.$refs.choice.textContent);
        }
    }
}
</script>

<style scoped>
    .option {
        display: table;
        width: 50px;
        height: 50px;
        font-size: 24px;
        margin: 5px 15%;
        padding: 5px;
    }

    .btn {
        width: 60px;
        height: 60px;
    }
</style>
