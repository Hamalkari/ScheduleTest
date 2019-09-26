<template>
  <div id="app">
    <Schedule />
  </div>
</template>

<script>
import Schedule from '@/views/Schedule';

export default {
  name: 'app',
  components: {
    Schedule,
  },
};
</script>

<style lang="scss">
@import './assets/style.scss';
</style>
