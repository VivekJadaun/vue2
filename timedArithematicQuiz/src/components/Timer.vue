<template>
  <span>{{ secsLeft }}</span>
</template>

<script>
export default {
  data() {
    return {
      secsLeft: -1,
    }
  },
  props: {
    'interval': {
      type: [String, Number],
      required: true,
    },
  },
  created() {
    this.secsLeft = this.interval;
    setInterval(() => {
      this.secsLeft = (this.secsLeft - 1 > 0) ? --this.secsLeft : this.interval;
    }, 1000);
  }
}
</script>

<style scoped>
  span {
    /* padding: 10px; */
    /* margin: 10px; */
  }
</style>
