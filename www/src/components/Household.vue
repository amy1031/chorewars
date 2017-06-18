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
        </div>
    
        {{activeHousehold.name}}
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
            {{memberPoints}} </li>
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
        memberPoints() {
          //  debugger
            // for(var i = 0; i < this.$store.state.activeHousehold.members.length; i++) {
            //     var member = this.$store.state.activeHousehold.members[i]
            //     for(var j = 0; j < member.completedChores.length; j++){
            //         var h = member.completedChores[j]
            //         if(h.householdId = this.activeHousehold._id) {
            //             var points = h.points
            //             points += points
            //             return points
            //         }
            //     }
            // }
            for (var i = 0; i < this.$store.state.activeHousehold.choreLog.length; i++) {
                var chore = this.$store.state.activeHousehold.choreLog[i]
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
            searchUsers() {
                //debugger
                this.$store.dispatch("searchUsers", { user: this.username, householdId: this.$route.params.id })
            }
        },
        components: {}
    }
</script>


<style scoped>

</style>