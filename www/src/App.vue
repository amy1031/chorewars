<template>
  <div id="app">
    <div class="container-fluid">
      <router-view></router-view>
    </div>
  <error></error>
  </div>
</template>

<script>
import Error from './components/Error'
export default {
  name: 'app',
  mounted() {
    this.$store.dispatch('getAuth')
  },
  components: {
    Error,
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}
</style>
