<template>
  <div id="app">
    <div class="container">
      <router-view></router-view>
    </div>
  </div>
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
  color: #2c3e50;
  margin-top: 10px;
}

body {
  background-color: #F3FFBD;
}
</style>
