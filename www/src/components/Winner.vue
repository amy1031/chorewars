<template>
  <div class="winner">
    <h1>{{this.activeHousehold.name}}</h1>
    <h6>Scoreboard:</h6>
        <ul>
            <li v-for='member in scoreBoard'>{{member.name}} - {{member.points}}
            </li>
        </ul>
        <button type="button" class="btn btn-success" @click="resetHousehold">End Household</button>
  </div>
</template>


<script>
export default {
  name: 'winner',
  data(){
    return {

    }
  },
  mounted() {
      this.$store.dispatch('getHouseholds')
  },
  computed:{
    user(){
      return this.$store.state.user
    },
    activeHousehold() {
      return this.$store.state.activeHousehold
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
  methods:{
    resetHousehold() {
          this.$store.dispatch("resetHousehold", this.activeHousehold)
        }
  },
  components:{}
}
</script>


<style scoped>

</style>