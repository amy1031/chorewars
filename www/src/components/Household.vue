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

        {{activeHousehold.name}}<br>
        <router-link :to="'/households/'+activeHousehold._id + '/chores'">Add Chores</router-link><br>
        <router-link :to="'/households/'+activeHousehold._id + '/user'">User Profile</router-link>
        <hr>
        <h6>Household Completed Chores:</h6>
        <ul>
            <li v-for='completed in this.allCompletedChores'>{{completed.name}}</li>
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
            allCompletedChores: this.$store.state.activeHousehold.choreLog
        }
    },
    computed: {
        activeHousehold() {
            return this.$store.state.activeHousehold
        },
        chores() {
            return this.$store.state.activeHousehold.choresList
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
        searchUsers(){
            debugger
            this.$store.dispatch("searchUsers", {user: this.username, householdId: this.$route.params.id})
        }
    },
    components: {}
}
</script>


<style scoped>

</style>