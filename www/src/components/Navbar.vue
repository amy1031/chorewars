<template>
  <div class="navbar">
    <nav class="navbar navbar-light">
      <h1 class="navbar-brand mb-0"><img src="http://i.imgur.com/3Sa4hvL.png" style="width: 75px" class="img-responsive float-left"></h1>
      <span class="navbar-text">
        <h1 v-if="activeHousehold.name" class="text-center">{{activeHousehold.name}}</h1>
        <h1 v-else>Welcome to Chore Wars!</h1>
        </span>
        <form @submit.prevent="logout(user)">
          <button type="submit" class="btn btn-outline-danger float-right">Logout</button>
        </form>
    </nav>
  
  </div>
</template>


<script>
export default {
  name: 'navbar',
  data() {
    return {

    }

  },
  mounted() {

  },

  computed: {
    user() {
      return this.$store.state.user
    },
    activeHousehold() {
      return this.$store.state.activeHousehold
    }
  },
  methods: {
    logout() {
      debugger
      this.$store.dispatch('logout', this.user)
    }
  },
  components: {}
}
</script>


<style scoped>
h1 {
  font-family: helvetica;
  font-size: 40px;
  font-weight: bold;
  padding-top: 0px;
  margin-top: 0px;
}

.navbar-brand {
  padding-left: 20px
}
</style>