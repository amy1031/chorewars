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
      state.activeHousehold = activeHousehold
     //Vue.set(state, "activeHousehold", activeHousehold)
    },
    setHouseholds(state, households) {
      state.households = households
    },
    setPrize(state, prize) {
      state.prize = prize
    },
    setChores(state, chores){
      state.chores = chores
    },
    setHouseholdChores(state, chores){
      //state.activeHousehold.choresList = chores;
      Vue.set(state.activeHousehold, "choresList", chores)
    },
    addCompletedChore(state, chore){
      state.user.completedChores.push(chore)
    },
    addPointsToUser(state, chorePoints) {
      state.user.points += chorePoints
    },
    householdChores(state, chore) {
      state.activeHousehold.choreLog.push(chore)
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
      .then( res => {
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
     //debugger
      api('households')
        .then(res => {
          commit('setHouseholds', res.data.data)
        })
        .catch(handleError)
    },
    getHousehold({ commit, dispatch }, id) {
      api('households/' + id)
        .then(res => {
          commit('setActiveHousehold', res.data.data)
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
    getChores({commit, dispatch}){
      api('chores')
        .then(res => {
          commit('setChores', res.data.data)
        })
        .catch(handleError)
    },
    createHousehold({ commit, dispatch }, household) {
     // debugger
      api.post('households', household)
        .then(res => {
          commit('setActiveHousehold', household)
          dispatch('getHouseholds')
        })
        .catch(handleError)
    },
    addCreatorToMembers({commit, dispatch}, user) {
      api.post('addCreator', user)
      .then(res => {

      })
    },
    createPrize({ commit, dispatch }, prize) {
      api.post('prize/', prize)
        .then(res => {
          dispatch('getPrize')
        })
        .catch(handleError)
    },
    addChoresToHousehold({commit, dispatch}, activeHousehold){
      api.put('households/' + activeHousehold._id + '/chores', activeHousehold.choresList)
        .then(res => {
          commit('setHouseholdChores', activeHousehold.choresList)
          router.push('/households/' + activeHousehold._id)
        })
        .catch(handleError)
    },
    completedChore({commit, dispatch}, {chore, userId}){
      api.put('updateUserChore', {chore, userId})
      .then(res => {
        commit('addCompletedChore', chore)
      })
        .catch(handleError)
    },
    addPointsToUser({commit, dispatch}, {chorePoints, userId}){
        api.put('updateUserPoints', {chorePoints, userId})
        .then(res => {
          commit('addPointsToUser', chorePoints)
        })
        .catch(handleError)
    },
    householdChores({commit, dispatch}, {chore, householdId}){
      api.put('householdChores', {chore, householdId})
      .then(res => {
        commit('householdChores', chore)
      })
      .catch(handleError)
    },
    searchUsers({commit, dispatch}, data){
      debugger
      api.post("findUsers", data)
        .then(res => {
       //   debugger
        })
        .catch(handleError)
    }
  }

})