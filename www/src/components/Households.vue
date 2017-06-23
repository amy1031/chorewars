<template>
  <div class="household">
    <h1>{{household.name}}</h1>
  </div>
</template>


<script>
export default {
  name: 'household',
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
    household() {
      return this.$store.state.household
    }
  },
  methods:{},
  components:{}
}
</script>


<style scoped>

</style>