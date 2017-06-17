<template>
    <div class="user">
        <h3>Household: {{activeHousehold.name}}</h3>
        <h4>User: {{user.name}}</h4>
        <h5 v-if="user.points[this.activeHousehold._id]">Points: {{user.points[this.activeHousehold._id]}}</h5> 
        <hr>
        <h6>Chores to Complete:</h6>
        <ul>
            <li v-for='chore in this.choresList'>{{chore.name}} <button class="delete" @click="addPointsToUser(chore)">X</button></li>
        </ul>
        <h6>Completed:</h6>
        <ul>
            <span v-for='chore in this.completedChores'>
                <li v-if="chore.householdId == activeHouseholdId">{{chore.name}}</li>
            </span>
        </ul>
    </div>
</template>


<script>
export default {
    name: 'user',
    data () {
        return {
            choresList: this.$store.state.activeHousehold.choresList
            // completedChores: this.$store.state.user.completedChores
        }
    },
    computed:{
        user() {
            return this.$store.state.user
        },
        activeHousehold() {
            return this.$store.state.activeHousehold
        },
        activeHouseholdId(){
            return this.$store.state.activeHousehold._id
        },
        completedChores() {
            return this.$store.state.user.completedChores
        }
    },
    methods:{
        addPointsToUser(chore) {
           // //debugger
            chore.householdId = this.activeHousehold._id
            chore.completedBy = this.user._id;
            this.$store.dispatch('addPointsToUser', {chorePoints: chore.points, userId: this.user._id, householdId: this.activeHousehold._id})
            this.completedChore(chore)
        },
        completedChore(chore) {
          //  //debugger
            this.$store.dispatch('completedChore', {chore: chore, userId: this.user._id})
            this.householdChores(chore, this.activeHousehold._id)
        },
        householdChores(chore, householdId) {
            ////debugger
            this.$store.dispatch('householdChores', {chore: chore, householdId: householdId})
            this.memberCompletedChore(chore, this.activeHousehold._id)
        },
        memberCompletedChore(chore, householdId) {
           // //debugger
            this.$store.dispatch('memberCompletedChore', {chore: chore, householdId: householdId})
        }
    },
    components:{}
}
</script>


<style>

</style>