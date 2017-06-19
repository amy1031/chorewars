<template>
    <div class="household">
        <div class="text-center">
            <h1>{{activeHousehold.name}}</h1>
        </div>
        <div id="start-view">
            <button type="button" class='btn btn-primary' @click="searchFormToggle" v-show="addCollaboratorsButton">Search Users</button>
            <form class="form-inline find-user-form" @submit.prevent="searchUsers" v-show="newSearch">
                <div class="form-group">
                    <input type="text" class="form-control" v-model="username" name="userName" placeholder="Member Name" />
                    <button type="submit" class="btn btn-primary" id="search-user-button" @click="searchFormToggleBack">Add New Collabarators</button>
                </div>
            </form>
            <button type="button" class='btn btn-primary' @click="prizeFormToggle" v-show="addPrizeButton">Add Your Prize</button>
            <form class="form-inline find-user-form" @submit.prevent="addHouseholdPrize" v-show="newPrize">
                <div class="form-group">
                    <input type="text" class="form-control" v-model="prize.name" placeholder="Prize Name" />
                    <button type="submit" class="btn btn-primary" id="search-user-button" @click="prizeFormToggleBack">Add Your Prize</button>
                </div>
            </form>
        </div>

        <br>
        <router-link v-if="this.activeHousehold.choresList.length <= 0" :to="'/households/'+activeHousehold._id + '/chores'">Add Chores</router-link>
        <br>
        <router-link :to="'/households/'+activeHousehold._id + '/user'">User Profile</router-link>
        <hr>
        <h6>Household Completed Chores:</h6>
        <ul>
            <li v-for='completed in completedChores'>{{completed.name}}</li>
        </ul>
        <h6>Household Members:</h6>
        <ul>
            <li v-for='member in activeHousehold.members'>{{member.name}}</li>
        </ul>
        <h6>Scoreboard:</h6>
        {{scoreBoard}}
        <br>
        <router-link :to="'/start'">Back to Households</router-link>
    </div>
</template>


<script>
export default {
    name: 'household',
    data() {
        return {
            username: "",
            newSearch: false,
            addCollaboratorsButton: true,
            newPrize: false,
            addPrizeButton: true,
            prize: { name: '', creatorId: this.$store.state.user._id, householdId: this.$route.params.id }
        }
    },
    computed: {
        activeHousehold() {
            return this.$store.state.activeHousehold
        },
        completedChores() {
            return this.$store.state.activeHousehold.choreLog
        },
        user() {
            return this.$store.state.user
        },
        scoreBoard() {
            for (var i = 0; i < this.completedChores.length; i++) {
                var chore = this.completedChores[i]
                if (chore.householdId = this.activeHousehold._id) {
                    if (chore.completedBy == this.user._id) {
                        var points = chore.points
                        if (points > 0) {
                            points += points
                            return points
                        } else {
                            return points
                        }
                    }
                }
            }
        }

    },
    mounted() {
        this.$store.dispatch('getHousehold', this.$route.params.id)
    },
    methods: {
        searchFormToggle() {
            this.newSearch = true;
            this.addCollaboratorsButton = false;
        },
        searchFormToggleBack() {
            this.newSearch = false;
            this.addCollaboratorsButton = true;
        },
        prizeFormToggle() {
            this.newPrize = true;
            this.addPrizeButton = false;
        },
        prizeFormToggleBack() {
            this.newPrize = false;
            this.addPrizeButton = true;
        },
        searchUsers() {
            //debugger
            this.$store.dispatch("searchUsers", { user: this.username, householdId: this.$route.params.id })
        },
        addHouseholdPrize() {
            this.$store.dispatch("addHouseholdPrize", this.prize)
        }
        // memberScoreboard() {
        //     var scoreBoard = [];
        //     for (var i = 0; i < this.completedChores.length; i++) {
        //         var chore = this.completeChores[i];
        //         if (chore.email == this.user) {
        //             scoreBoard.push(chore);
        //         }
        //     } return scoreBoard;
        // }
    },
    components: {}
}
</script>


<style scoped>

</style>