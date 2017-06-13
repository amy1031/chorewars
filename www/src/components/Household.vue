<template>
    <div class="household">
        <div id="start-view">
            <button type="button" class='btn btn-primary' @click="searchFormToggle" v-show="addCollabaratorsButton">Search Users</button>
            <form class="form-inline find-user-form" @submit.prevent="searchUsers" v-show="newSearch">
                <div class="form-group">
                    <input type="text" class="form-control" v-model="username" name="userName" placeholder="Household Name" />
                    <button type="submit" class="btn btn-primary" id="search-user-button" @click="searchFormToggleBack">Add New Collabarators</button>
                </div>
            </form>
        </div>

        {{activeHousehold.name}}
        <!--  {{chores.name}} -->
    </div>
</template>


<script>
export default {
    name: 'household',
    data() {
        return {
            username: "",
            newSearch: false,
            addCollabaratorsButton: true
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
            this.addCollabaratorsButton = false;
        },
        searchFormToggleBack() {
            this.newSearch = false;
            this.addCollabaratorsButton = true;
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