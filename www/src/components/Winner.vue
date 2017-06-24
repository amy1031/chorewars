<template>
  <div class="winner">
    <h1>{{this.activeHousehold.name}}</h1>
    
  </div>
</template>


<script>
export default {
  name: 'winner',
  data(){
    return {

    }
  },
  mounted() {
      this.$store.dispatch('getHouseholds')
  },
  computed:{
    user(){
      return this.$store.state.user
    },
    activeHousehold() {
      return this.$store.state.activeHousehold
    }
  },
  methods:{},
  components:{}
}
</script>


<style scoped>

</style>