<template> 
    <div class="card">
        <div class="card-header">What's {{question}}?
        </div>
        <div class="card-body">
            <app-option v-for="(option, index) in options" :key="index">
                <span slot="options">{{option}}</span>
            </app-option>
        </div>
    </div>
</template>

<script>
import Option from "./Option.vue";
import { eventBus } from '../main';

export default {
    props: {
        'options': {
            type: Array,
            required: true
        },
        'question': {
            type: String
        }
    },

    components: {
        appOption: Option
    },
}
</script>

<style scoped>
    .card-header, .card-body {
        text-align: center;
    }

    .card-body {
        display: flex;
        flex-flow: row wrap;
        justify-content: space-between;
    }
</style>
