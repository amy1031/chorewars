<template>
    <div class="household">
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
                    <button type="submit" class="btn btn-danger" id="start-household-button" @click="startHousehold">Start your Household</button>
                </div>
        </div>

        {{activeHousehold.name}}<br>
        <router-link v-if="this.activeHousehold.choresList.length <= 0" :to="'/households/'+activeHousehold._id + '/chores'">Add Chores</router-link><br>
        <router-link  :to="'/households/'+activeHousehold._id + '/user'">User Profile</router-link>
        <hr>
        <h6>Household Completed Chores:</h6>
        <ul>
            <li v-for='completed in completedChores'>{{completed.name}}</li>
        </ul>
        <h6>Household Members:</h6>
        <ul>
            <li v-for='member in activeHousehold.members'>{{member.name}}</li>
        </ul>


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
            prize: {name: '', creatorId: this.$store.state.user._id, householdId: this.$route.params.id}
        }
    },
    computed: {
        activeHousehold() {
            return this.$store.state.activeHousehold
        },
        completedChores() {
            return this.$store.state.activeHousehold.choreLog
        },
        user(){
            return this.$store.state.user
        }
        // members() {
        //     return this.$store.state.activeHousehold.members
        // }
    },
    mounted() {
        this.$store.dispatch('getHousehold', this.$route.params.id)
      //  this.$store.dispatch('getMembers', this.$route.params.id)
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
        searchUsers(){
            //debugger
            this.$store.dispatch("searchUsers", {user: this.username, householdId: this.$route.params.id})
        },
        addHouseholdPrize(){
            this.$store.dispatch("addHouseholdPrize", this.prize)
        },
        householdStartEndDate(){
            let date = new Date();
            let startMonth = date.getMonth();
            let startDay = date.getDate()
            let startHour = date.getHours();
            let startMinutes = date.getMinutes();
            let startDate = {
                startMonth:startMonth,
                startDay: startDate,
                startHour: startHour,
                startMinutes: startMinutes
            }
            if(startMonth == 1 || startMonth == 3 || startMonth == 5 || startMonth == 7 || startMonth == 8 || startMonth == 10 || startMonth == 12){
                if(startDay + 14 > 31){
                    let overDays = startDay + 14;
                    let realDays = overDays - 31;
                    let endDate = {
                        endMonth: startMonth + 1,
                        endDay: realDays,
                        endHour: startHour,
                        endMinutes: startMinutes
                    }
                    this.$store.dispatch('startHousehold', {startDate: startDate, endDate: endDate , householdId: this.req.params.id})
                    return
                }else{
                    let endDate = {
                        endMonth :startMonth,
                        endDay: startDate + 14,
                        endHour: startHour,
                        endMinutes: startMinutes
                    }
                    this.$store.dispatch('startHousehold', {startDate: startDate, endDate: endDate, householdId: this.req.params.id})
                    return

                }
            }
            if(startMonth == 4 || startMonth == 6 || startMonth == 9 || startMonth == 11 ) {
                if(startDay + 14 > 30){
                  let overDays = startDay + 14;
                  let realDays = overDays - 30;
                }else{

                }
            }
        }

    },
    components: {}
}
</script>


<style scoped>

</style>