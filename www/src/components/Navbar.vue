<template>
  <div class="navbar">
    <nav class="navbar fixed-top navbar-light bg-faded">
      <a class="navbar-brand" href="">
        <img src="" width="30" height="30" class="d-inline-block align-top" alt=""> Bootstrap
          <form @submit.prevent="logout(user)">
            <button type="submit" class="btn btn-outline-danger">Logout</button>
          </form>
      </a>
    </nav>
  </div>
</template>


<script>
export default {
  name: 'navbar',
  data(){
    return {

    }

  },
  mounted(){

  },

  computed:{
    user(){
      return this.$store.state.user
    },

  },
  methods:{
    logout(){
      debugger
      this.$store.dispatch('logout', this.user)
    }
  },
  components:{}
}
</script>


<style scoped>

</style>