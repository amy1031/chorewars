<template>
    <div class="user">
        <h3>Household: {{activeHousehold.name}}</h3>
        <h4>User: {{user.name}}</h4>
        <h5 v-if="user.points != undefined">Points: {{this.userPoints}}</h5>
        <h5 v-else>Points: 0</h5>
        <hr>
        <h6>Chores to Complete:</h6>
        <ul>
            <li v-for='chore in this.choresList'>{{chore.name}} <button class="delete" @click="updateUserCompletedChore(chore)">X</button></li>
        </ul>
        <h6>Completed:</h6>
        <ul>
            <span v-for='chore in this.completedChores'>
                <li v-if="chore.householdId == activeHouseholdId">{{chore.name}}</li>
            </span>
        </ul>
        <router-link  :to="'/households/'+activeHousehold._id">Back to Household</router-link>
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
        },
        activeHouseholdId(){
            return this.$store.state.activeHousehold._id
        },
        completedChores() {
            return this.$store.state.user.completedChores
        }
    },
    methods:{
        updateUserCompletedChore(chore) {
            // updates user.completedChores
            chore.householdId = this.activeHousehold._id
            chore.completedBy = this.user._id;
            this.$store.dispatch('updateUserCompletedChore', {choreId: chore._id, pointsRewarded: chore.points, userId: this.user._id, householdId: this.activeHousehold._id})
            this.addPointsToUser(chore)
        },
        addPointsToUser(chore) {
            // updates user.points
            this.$store.dispatch('addPointsToUser', {chore: chore, userId: this.user._id})
            //this.householdChores(chore, this.activeHousehold._id)
        },
        householdChores(chore, householdId) {
            // updates activehousehold.choreLog
            this.$store.dispatch('householdChores', {chore: chore, householdId: householdId})
            this.memberCompletedChore(chore, this.activeHousehold._id, this.user.email)
        },
        memberCompletedChore(chore, householdId, userEmail) {
            // updates activehousehold.members
            chore.creatorEmail = userEmail
            this.$store.dispatch('memberCompletedChore', {chore: chore, householdId: householdId})
            this.addUserPoints()
        },
        addUserPoints(){
            let userPoints = 0;
            for (var i  = 0; i < member.completedChores.length; i++) {
                var chore = member.completedChores[i];
                if(chore.householdId == state.activeHousehold._id){
                    userPoints += member.completedChores[i].pointsRewarded

        }
      }
      return userPoints
        }
    },
    components:{}
}
</script>


<style>

</style>