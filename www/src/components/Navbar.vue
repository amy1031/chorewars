<template>
  <div class="navbar">
    <nav class="navbar fixed-top navbar-light bg-faded">
      <a class="navbar-brand" href="">
        <img src="/assets/brand/bootstrap-solid.svg" width="30" height="30" class="d-inline-block align-top" alt=""> Bootstrap
        <button type="button" class="btn btn-outline-danger" @click="logout">Logout</button>
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

    },
  methods:{
    logout(){
      debugger
      this.$store.dispatch('logout')
    }
  },
  components:{}
}
</script>


<style scoped>

</style>