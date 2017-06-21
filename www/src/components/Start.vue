<template>
  <div class="start">
    <!-- <navbar></navbar> -->
    <div class="container-fluid">
      <div id='myHouseholds'>
        <div class="row">
          <div class="col-12">
            <h2 class="float-left">Your Households:</h2>
          </div>
        </div>
        <div class='row'>
          <div class="col-sm-6" v-for="household in households">
            <h6>
              <router-link :to="'/households/'+household._id">
                <button class="household">{{household.name}}</button>
              </router-link>
            </h6>
          </div>
        </div>
      </div>
      <div class="add">
        <div class="row">
          <div class="col-12">
            <h2 class="float-left">Add a household:</h2>
          </div>
        </div>
        <div class="row">
          <div class="col-12">
            <form class="form-inline" @submit.prevent="createHousehold">
              <div class="col-12 col-sm-6">
                <input type="text" class="form-control" v-model="name" name="name" placeholder="Household Name" /> &nbsp;
              </div>
              <div class="col-12 col-sm-6">
                <button type="submit" class="btn btn-primary create" @click="householdFormToggleBack">Create New Household</button>
              </div>
            </form>
          </div>
        </div>

        <!--<button type="button" class='btn btn-primary' @click="householdFormToggle" v-show="addHouseholdButton">Add a Household</button>
                  <form class="form-inline create-household-form" @submit.prevent="createHousehold" v-show="newHousehold">
                    <div class="form-group">
                      <input type="text" class="form-control" v-model="name" name="name" placeholder="Household Name" />
                      <button type="submit" class="btn btn-primary" id="create-household-button" @click="householdFormToggleBack">Create New Household</button>
                    </div>
                  </form> -->
      </div>
    </div>
  </div>
</template>


<script>
import Navbar from '@/components/Navbar'
export default {
  name: 'start',
  data() {
    return {
      name: '',
      creatorId: this.$store.state.user._id,
      newHousehold: false,
      addHouseholdButton: true
    }
  },
  mounted() {
    this.$store.dispatch('getHouseholds')
  },
  computed: {
    households() {
      return this.$store.state.households
    },
    user() {
      return this.$store.state.user
    }
  },
  methods: {
    createHousehold() {
      this.$store.dispatch("createHousehold", { name: this.name, creatorId: this.$store.state.user._id, user: this.user })
      // this.addHouseholdIdToUser();
    },
    addHouseholdIdToUser() {
      this.$store.dispatch('addHouseholdIdToUser', {user: this.user, householdId: this.$store.state.activeHousehold._id} )
    },
    householdFormToggle() {
      this.newHousehold = true;
      this.addHouseholdButton = false;
    },
    householdFormToggleBack() {
      this.newHousehold = false;
      this.addHouseholdButton = true;
    }
  },
  components: {
    Navbar
  }
}


</script>


<style scoped>
h2 {
  font-weight: bold;
  font-family: Fjalla One;
  text-transform: uppercase;
  color: #247BA0;
}

.add {
  margin-top: 30px;
}

button.household {
  font-size: 25px;
  color: #FF1654;
  font-weight: bold;
  font-family: helvetica;
  background-color: #fff;
  border-radius: 5px;
  border: 0px;
  padding: 10px;
  width: 100%;
  margin-bottom: 5px;
  transition-duration: 0.4s;
}

button.household:hover {
  background-color: #FF1654;
  color: #fff;
}

button.create {
  font-size: 18px;
  color: #fff;
  font-weight: bold;
  font-family: helvetica;
  background-color: #FF1654;
  border-radius: 5px;
  border: 0px;
  padding: 10px;
  width: 100%;
  margin-bottom: 22px;
  transition-duration: 0.4s;
}

button.create:hover {
  background-color: #fff;
  color: #FF1654;
}

input[type=text] {
  width: 100%;
  height: 43px;
  float: left;
}
</style>