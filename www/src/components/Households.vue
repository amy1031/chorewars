<template>
  <div class="household">
    {{household.name}}
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