<template>
    <div class="household">

        {{household.name}}
    </div>
</template>


<script>
export default {
    name: 'household',
    computed:{
        household(){
            return this.$store.state.activeHousehold
    }
    },
    mounted() {
      this.$store.dispatch('getHousehold', this.$route.params.id)
    },
    methods:{},
    components:{}
}
</script>


<style scoped>

</style>