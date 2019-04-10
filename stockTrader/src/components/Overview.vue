<template>
    <div class="card col-12 border-primary ">
        <div class="card-body">
            <h1 class="card-title">Trade or View your Portfolio</h1>
            <p class="card-text">
                You may Save & Load your Data
                <br>
                Click on 'End Day' to refresh Stock Prices & begin a new day
            </p>
        </div>
        <div class="card-footer row bg-primary text-white"><span><b>Your Funds:</b> {{ getFunds }}</span></div>
    </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
    computed: {
        ...mapGetters([
            'getFunds'
        ]),
        funds() {
            return this.$store.state.funds;
        }
    },
    methods: {
    }
}
</script>
