<template>
    <div class="user">
    {{user.name}} - {{user.points}}
    <!--{{activeHousehold.name}}-->
    <ul>
        <li v-for='chore in this.choresList'>{{chore.name}} <button class="delete" @click="addPointsToUser(chore)">x</button></li>
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
    methods:{
        addPointsToUser(chore) {
            //debugger
            this.$store.dispatch('addPointsToUser', {chorePoints: chore.points, userId: this.user._id})
            this.completedChore(chore)
        },
        completedChore(chore) {
            this.$store.dispatch('completedChore', {chore: chore, userId: this.user._id})
        }
    },
    components:{}
}
</script>


<style>

</style>