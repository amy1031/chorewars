<template>
  <div class="chores">
    <form @submit.prevent="addChoresToHousehold(checkedChores)">
      <div class="loop" v-for="chore in chores">
        <label class="custom-control custom-checkbox">
          <input type="checkbox" class="custom-control-input" :value="chore" v-model="checkedChores"/>
          <span class="custom-control-indicator"></span>
          <span class="custom-control-description">Chore: {{chore.name}} - </span>
        </label>
        <span>Value</span>
        <input  type="number" v-model.number="chore.points" :placeholder="chore.points"/>
      </div>
      <button type="submit" class="btn btn-success">Submit Chore List</button>
    </form>
  </div>
</template>


<script>
  export default {
    name: 'chores',
    data() {
      return {
        checkedChores: [],


      }

    },
    mounted() {
      this.$store.dispatch('getChores')
      this.$store.dispatch('getHousehold', this.$route.params.id)
    },
    computed: {
      chores(){
        return this.$store.state.chores
      },
      activeHousehold() {
        return this.$store.state.activeHousehold
      }
    },
    methods: {
      addChoresToHousehold(chores){
        this.activeHousehold.choresList = chores
        this.$store.dispatch('addChoresToHousehold', this.activeHousehold)

      }
    },
    components: {}
  }

</script>


<style scoped>

</style>