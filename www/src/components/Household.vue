<template>
    <div class="household">

        {{activeHousehold.name}}
       <h6> <router-link :to="'/households/'+activeHousehold._id+'/chores'">Add Chores</router-link></h6>
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
      //  debugger
        this.$store.dispatch('getHousehold', this.$route.params.id)
    },
    methods:{},
    components:{}
}
</script>


<style scoped>

</style>