<template>
  <div class="homepage">
    <nav class="navbar fixed-top navbar-light bg-faded">
      <a class="navbar-brand" href="">
        <img src="/assets/brand/bootstrap-solid.svg" width="30" height="30" class="d-inline-block align-top" alt=""> Bootstrap
      </a>
    </nav>

    <h1>{{ msg }}</h1>
    <router-link to="/login">Login</router-link>
    </button>
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
