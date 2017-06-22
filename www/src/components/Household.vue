<template>
    <div class="household">
        <div class="text-center">
            <h1>{{activeHousehold.name}}</h1>
        </div>
        <div class="text-center">
            <!--  <h2 v-if='activeHousehold.prize != "" || activeHousehold.prize != undefined || activeHousehold.prize != null'>Prize: {{activeHousehold.prize.name}}</h2>
                    <h2 v-else> </h2> -->
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
            <div>
                <button type="submit" class="btn btn-danger" id="start-household-button" @click="householdStartEndDate">Start your Household</button>
            </div>
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
        <!--<h6>Household Members:</h6>
                <div v-for='member in activeHousehold.members'>{{member.name}}
                </div>-->
        <h6>Scoreboard:</h6>
        <ul>
            <li v-for='member in scoreBoard'>{{member.name}} - {{member.points}}
            </li>
        </ul>
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
            let pointsDictionary = {}
            for (var i = 0; i < this.activeHousehold.members.length; i++) {

                var member = this.activeHousehold.members[i];
                for (var j = 0; j < this.activeHousehold.completedChores.length; j++) {

                    var chore = this.activeHousehold.completedChores[j];
                    if (member._id == chore.userId) {
                        if (!pointsDictionary[member._id]) {
                            pointsDictionary[member._id] = { name: '', points: '' }
                            pointsDictionary[member._id].name = member.name
                            pointsDictionary[member._id].points = chore.pointsRewarded
                        } else {
                            pointsDictionary[member._id].points += chore.pointsRewarded
                        }
                    }
                }
            }
            return pointsDictionary
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
            //
            this.$store.dispatch("searchUsers", { user: this.username, householdId: this.$route.params.id })
        },
        addHouseholdPrize() {
            this.$store.dispatch("addHouseholdPrize", this.prize)
        },
        householdStartEndDate() {
            let date = new Date();
            let startMonth = date.getMonth() + 1;
            let startDay = date.getDate()
            let startHour = date.getHours();
            let startMinutes = date.getMinutes();
            let startDate = {
                startMonth: startMonth,
                startDay: startDay,
                startHour: startHour,
                startMinutes: startMinutes
            }
            if (startMonth == 1 || startMonth == 3 || startMonth == 5 || startMonth == 7 || startMonth == 8 || startMonth == 10 || startMonth == 12) {
                if (startDay + 14 > 31) {
                    let overDays = startDay + 14;
                    let realDays = overDays - 31;
                    let endDate = {
                        endMonth: startMonth + 1,
                        endDay: realDays,
                        endHour: startHour,
                        endMinutes: startMinutes
                    }
                    this.$store.dispatch('startHousehold', { startDate: startDate, endDate: endDate, householdId: this.$route.params.id })
                    return
                } else {
                    let endDate = {
                        endMonth: startMonth,
                        endDay: startDate + 14,
                        endHour: startHour,
                        endMinutes: startMinutes
                    }
                    this.$store.dispatch('startHousehold', { startDate: startDate, endDate: endDate, householdId: this.$route.params.id })
                    return

                }
            }
            if (startMonth == 4 || startMonth == 6 || startMonth == 9 || startMonth == 11) {
                if (startDay + 14 > 30) {
                    let overDays = startDay + 14;
                    let realDays = overDays - 30;
                    let endDate = {
                        endMonth: startMonth + 1,
                        endDay: realDays,
                        endHour: startHour,
                        endMinutes: startMinutes
                    }
                    this.$store.dispatch('startHousehold', { startDate: startDate, endDate: endDate, householdId: this.$route.params.id })
                    return
                } else {
                    let endDate = {
                        endMonth: startMonth,
                        endDay: realDays + 14,
                        endHour: startHour,
                        endMinutes: startMinutes
                    }
                    this.$store.dispatch('startHousehold', { startDate: startDate, endDate: endDate, householdId: this.$route.params.id })
                    return
                }
            }
            if (startMonth == 2) {
                if (startDay + 14 > 28) {
                    let overDays = startDay + 14;
                    let realDays = overDays - 28;
                    let endDate = {
                        endMonth: startMonth + 1,
                        endDay: realDays,
                        endHour: startHour,
                        endMinutes: startMinutes
                    }
                    this.$store.dispatch('startHousehold', { startDate: startDate, endDate: endDate, householdId: this.$route.params.id})
                    return
                } else {
                    let endDate = {
                        endMonth: startMonth,
                        endDay: startDate + 14,
                        endHour: startHour,
                        endMinutes: startMinutes
                    }
                    this.$store.dispatch('startHousehold', { startDate: startDate, endDate: endDate, householdId: this.$route.params.id })
                    return

                }
            }
        },
        memberScoreboard() {
            var scoreBoard = [];
            for (var i = 0; i < this.completedChores.length; i++) {
                var chore = this.completeChores[i];
                if (chore.email == this.user) {
                    scoreBoard.push(chore);
                }
            } return scoreBoard;
        }
    },
    components: {}
}
</script>


<style scoped>

</style>