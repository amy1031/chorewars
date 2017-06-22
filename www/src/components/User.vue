<template>
    <div class="user">
        <h3>Household: {{activeHousehold.name}}</h3>
        <h4>User: {{user.name}}</h4>
            <h5>Points: {{this.addUpUserPoints}}</h5>
        
        <hr>
        <h6>Chores to Complete:</h6>
        <ul>
            <li v-for='chore in this.choresList'>{{chore.name}}
                <button class="delete" @click="updateUserCompletedChore(chore)">X</button>
            </li>
        </ul>
        <h6>Completed:</h6>
        <ul>
            <span v-for='chore in this.activeHousehold.completedChores'>
                <li v-if="chore.userId == user._id">{{chore.name}}</li>
            </span>
        </ul>
        <router-link :to="'/households/'+activeHousehold._id">Back to Household</router-link>
    </div>
</template>


<script>
export default {
    name: 'user',

    data() {
        return {
            choresList: this.$store.state.activeHousehold.choresList
        }
    },
    mounted() {
    this.$store.dispatch('getUserChores', this.user._id)
    },
    computed: {
        user() {
            return this.$store.state.user
        },
        activeHousehold() {
            return this.$store.state.activeHousehold
        },
        allCompletedChores() {
            return this.$store.state.allCompletedChores
        },
         addUpUserPoints(){
            let userPoints = 0;
            let completedChores = this.$store.state.allCompletedChores
            for (var i = 0; i < completedChores.length; i++) {
                var chore = completedChores[i];
                if(chore.userId == this.user._id && chore.householdId == this.activeHousehold._id){
                    userPoints += chore.pointsRewarded
                }
            }
            return userPoints
        }

    },
    methods: {
        updateUserCompletedChore(chore) {
            // updates user.completedChores
            chore.householdId = this.activeHousehold._id
            chore.completedBy = this.user._id;
            this.$store.dispatch('updateUserCompletedChore', { name: chore.name, choreId: chore._id, pointsRewarded: chore.points, userId: this.user._id, householdId: this.activeHousehold._id })
            this.addPointsToUser(chore)
        },
        addPointsToUser(chore) {
            // updates user.points
            this.$store.dispatch('addPointsToUser', { chore: chore, userId: this.user._id })
            this.householdChores(chore, this.activeHousehold._id)
        },
        householdChores(chore, householdId) {
            // updates activehousehold.choreLog
            this.$store.dispatch('householdChores', { chore: chore, householdId: householdId })
          //  this.getAllUserChores()
        },
        getAllUserChores() {
            this.$store.dispatch('getUserChores', this.user._id)
        }
    },
    components: {}
}
</script>


<style>

</style>