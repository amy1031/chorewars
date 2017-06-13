<template>
    <div class="user">
    {{user.name}}
    <!--{{activeHousehold.name}}-->
    <ul>
        <li v-for='chore in this.choresList'>{{chore.name}} <button class="delete" @click="completedChore(chore)">x</button></li>
    </ul>
    </div>
</template>


<script>
export default {
    name: 'user',
    data () {
        return {
            choresList: this.$store.state.activeHousehold.choresList
        }
    },
    computed:{
        user() {
            return this.$store.state.user
        },
        activeHousehold() {
            return this.$store.state.activeHousehold
        } 
    },
    // mounted() {
    //     this.$store.dispatch('getHousehold', this.$route.params.id)
    // },
    methods:{
        completedChore(chore) {
            this.$store.dispatch('completedChore', chore)
        }
    },
    components:{}
}
</script>


<style>

</style>