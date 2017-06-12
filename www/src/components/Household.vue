<template>
    <div class="household">

        {{activeHousehold.name}}
      <!--  {{chores.name}} -->
    </div>
</template>


<script>
export default {
    name: 'household',
    computed:{
        activeHousehold(){
            return this.$store.state.activeHousehold
    },
    chores() {
        return this.$store.state.activeHousehold.choresList
    }
    },
    mounted() {
      this.$store.dispatch('getHousehold', this.$route.params.id),
      this.checkChores(this.$store.state.activeHousehold)
    },
    methods:{
        checkChores(activeHousehold){
            debugger
                this.$store.dispatch("checkChores", activeHousehold)
            
        }
    },
    components:{}
}
</script>


<style scoped>

</style>