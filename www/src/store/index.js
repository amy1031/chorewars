import axios from 'axios'
import router from '../router'
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

let api = axios.create({
  baseURL: 'http://localhost:3000/api/',
  timeout: 2000,
  withCredentials: true
})
let auth = axios.create({
  baseURL: 'http://localhost:3000/',
  timeout: 2000,
  withCredentials: true
})

let state = {
  user: {},
  error: {},
  households: [],
  activeHousehold: {},
  chores: {},
  prize: {}
}

let handleError = (err) => {
  state.error = err
}

export default new Vuex.Store({
  state,
  mutations: {
    setUser(state, user) {
      state.user = user
      router.push('/start')
    },
    setError(state) {
      state.error = {}
    },
    setLogin(state, user) {
      state.user = user
      router.push('/start')
    },
    setActiveHousehold(state, activeHousehold) {
     // debugger
      //state.activeHousehold = activeHousehold
      Vue.set(state, "activeHousehold", activeHousehold)
    },
    setHouseholds(state, households) {
      state.households = households
    },
    setPrize(state, prize) {
      state.prize = prize
    },
    setChores(state, chores) {
      state.chores = chores
    },
    setHouseholdChores(state, chores) {
      //state.activeHousehold.choresList = chores;
      Vue.set(state.activeHousehold, "choresList", chores)
    },
    setMembers(state, member) {
      debugger
      //state.activeHousehold.choresList = chores;

      //Vue.set(state.activeHousehold, "members", member)
      state.activeHousehold.members.push(member)
    },
    addCompletedChore(state, chore) {
      // //debugger
      //  state.user.completedChores.push(chore)
    },
    addNewChore(state, chore) {
      state.chores.push(chore)
    },
    memberCompletedChore(state, chore) {
      state.user.completedChores.push(chore)
    },
    setMemberPoints(state, member){
      debugger
      state.user.points = 0;
      for (var i  = 0; i < member.completedChores.length; i++) {
        var chore = member.completedChores[i];
        if(chore.householdId == state.activeHousehold._id){
          state.user.points += member.completedChores[i].pointsRewarded
        }
      }
    },
    addPointsToUser(state, chore) {
      if (!state.user.points[chore.householdId]) {
        Vue.set(state.user.points, chore.householdId, chore.chorePoints)
        // state.user.points[chore.householdId] += chore.chorePoints
      } else {

        state.user.points[chore.householdId] += chore.chorePoints
        Vue.set(state.user)
      }
      // state.user.points[this.activeHousehold._id] += chorePoints
      //Added points so they live on the household they were earned on!
    },
    householdChores(state, chore) {
      state.activeHousehold.choreLog.push(chore)
    },
    addHouseholdPrize(state, prize) {
      state.activeHousehold.prize = prize
    },
    setCreator(state, user) {
      debugger
      state.activeHousehold.members.push(user)
    }
  },
  actions: {
    register({ commit, dispatch }, user) {
      auth.post('register', user)
        .then(res => {
          commit('setLogin', res.data)
          if (res.data.error) {
            return handleError(res.data.error)
          }
        })
        .catch(handleError)
    },
    login({ commit, dispatch }, user) {
      auth.post('login', user)
        .then(res => {
          commit('setUser', res.data.data)
          router.push('/start')
        })
        .catch(handleError)
    },
    getAuth({ commit, dispatch }) {
      auth('authenticate')
        .then(res => {
          commit('setUser', res.data.data)
          //state.user = res.data.data
          if (state.user === null) {
            router.push('/')
          } else {
            router.push('/start')
          }
        }).catch(err => {
          router.push('/')
        })
    },
    clearError({ commit, dispatch }) {
      commit('setError')
    },
    getHouseholds({ commit, dispatch }) {
      api('households')
        .then(res => {
          commit('setHouseholds', res.data.data)
        })
        .catch(handleError)
    },
    getHousehold({ commit, dispatch }, id) {
      api('households/' + id)
        .then(res => {
          //for each member id in household, dispatch get member
          commit('setActiveHousehold', res.data.data)

        })
        .catch(handleError)
    },
    getMembers({ commit, dispatch }, id) {
      api('member/' + id)
        .then(res => {
          commit('setMembers', res.data.data)
        })
        .catch(handleError)
    },
    getPrize({ commit, dispatch }, prize) {
      api('households/' + prize.householdId + "/prize/" + prize._id)
        .then(res => {
          commit('setPrize', res.data.data)
        })
        .catch(handleError)
    },
    getChores({ commit, dispatch }) {
      api('chores')
        .then(res => {
          commit('setChores', res.data.data)
        })
        .catch(handleError)
    },
    createHousehold({ commit, dispatch }, household) {
      api.post('households', household)
        .then(res => {
          commit('setActiveHousehold', res.data.data)
          dispatch('addHouseholdIdToUser', {householdId: res.data.data._id, user: household.user})
        })
        .catch(handleError)
    },
    createChore({ commit, dispatch }, chore) {
      // //
      api.post('chores', chore)
        .then(res => {

          commit('addNewChore', res.data.data)
        })
        .catch(handleError)
    },
    addHouseholdIdToUser({ commit, dispatch }, householdData) {
      debugger
      auth.post('households/' + householdData.householdId + "/members",  householdData.user)
        .then(res => {
          debugger
          // commit('setCreator', user)
          dispatch('getHouseholds')
        })
        .catch(handleError)
    },
    createPrize({ commit, dispatch }, prize) {
      api.post('prize/', prize)
        .then(res => {
          dispatch('getPrize')
        })
        .catch(handleError)
    },
    addHouseholdPrize({ commit, dispatch }, prize) {
      api.post('households/' + prize.householdId + '/prize', prize)
        .then(res => {

          dispatch('addHouseholdPrize', prize)
        })
        .catch(handleError)
    },
    addChoresToHousehold({ commit, dispatch }, activeHousehold) {
      api.put('households/' + activeHousehold._id + '/chores', activeHousehold.choresList)
        .then(res => {
          commit('setHouseholdChores', res.data.data)
          router.push('/households/' + activeHousehold._id)
        })
        .catch(handleError)
    },
    completedChore({ commit, dispatch }, { chore, userId }) {
      api.put('updateUserChore', { chore, userId })
        .then(res => {
          commit('addCompletedChore', res.data.data)
        })
        .catch(handleError)
    },
    memberCompletedChore({ commit, dispatch }, { chore, householdId }) {
      api.put('updateMemberChore', { chore, householdId })
        .then(res => {
          debugger
          commit('memberCompletedChore', res.data.data)
        })
        .catch(handleError)
    },
    addPointsToUser({ commit, dispatch }, completedChore) {
      api.post('completed-chores', completedChore)
        .then(res => {
          debugger
          dispatch('getMemberPoints', completedChore.userId)
         // debugger
          //commit('addPointsToUser', { chorePoints, householdId })
        })
        .catch(handleError)
    },
    getMemberPoints({ commit, dispatch }, memberId) {
      api('member/' + memberId, memberId)
      .then(res => {
        commit('setMemberPoints', res.data.data)
      }) .catch(handleError)
    },
    householdChores({ commit, dispatch }, { chore, householdId }) {
      api.put('householdChores', { chore, householdId })
        .then(res => {
          commit('householdChores', res.data.data)
        })
        .catch(handleError)
    },
    searchUsers({ commit, dispatch }, data) {
      api.post("findUsers", data)
        .then(res => {
        })
        .catch(handleError)
    },
    logout({ commit, dispatch }, user) {
      auth.delete('logout/', user)
        .then(res => {

          router.push('/')
        })
        .catch(handleError)
    },
    startHousehold({commit, dispatch}, householdData){
      api.put('startHousehold', householdData)
        .then(res => {
          //probably send some notification to the user that the house has been started, create two week countdown
        })

    }
  }

})