<template>
    <div class="grid row">
        <quote v-for="item in quotes" :key="item" >
            <span slot="content">{{ item }}</span>
        </quote>
    </div>
</template>

<script>
export default {
    props: {
        'quotes': {
            type: Array
        }
    }    
}
</script>

<style scoped>
    .grid {
        display: flex;
        flex-flow: row wrap;
    }
</style>
