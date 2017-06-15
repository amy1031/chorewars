<template>
  <div class="homepage">

    <h1>{{ msg }}</h1>
    <router-link to="/login">Login</router-link>
    <router-link to='/register'>Register</router-link>
  </div>
</template>

<script>
import Login from './Login'

export default {
  name: 'homepage',
  data() {
    return {
      msg: 'Welcome to ChoreWars'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1,
h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
