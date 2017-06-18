let Household = require('../models/household')
let Chores = require('../models/chore')
let Leaderboard = require('../models/leaderboard')
let Prize = require('../models/prize')

export default {
  getLeaderboardByHouseholdId: {
    path: '/households/:householdId/leaderboard',
    reqType: 'get',
    method(req, res, next) {
      let action = 'Return leaderboard by household id'
      Household.findById(req.params.householdId)
        .then(household => {
          Leaderboard.find({ householdId: req.params.householdId })
            .then(leaderboard => {
              household.leaderboard = leaderboard
              res.send(handleResponse(action, household.leaderboard))
            })
        }).catch(error => {
          return next(handleResponse(action, null, error))
        })
    }
  },
  getPrizeByHouseholdId: {
    path: '/households/:householdId/prize/:prizeId',
    reqType: 'get',
    method(req, res, next) {
      let action = 'Return prize by household id'
      Household.findById(req.params.householdId)
        .then(household => {
          Prize.find({ householdId: req.params.householdId })
            .then(prize => {
              household.prize = prize
              res.send(handleResponse(action, household.prize))
            })
        }).catch(error => {
          return next(handleResponse(action, null, error))
        })
    }
  },
  getChoresByHousehold: {
    path: '/households/:householdId/chores',
    reqType: 'get',
    method(req, res, next) {
      let action = 'Return chores associated with this household'
      Household.findById(req.params.householdId)
        .then(household => {
          Chores.find({ householdId: req.params.householdId })
            .then(chores => {
              household.choresList = chores
              res.send(handleResponse(action, chores))
            })
        }).catch(error => {
          return next(handleResponse(action, null, error))
        })
    }
  },
  addChoresByHousehold: {
    path: '/households/:householdId/chores',
    reqType: 'put',
    method(req, res, next){
     //
      let action = 'Updates the game chore list to the active household'
      Household.findById(req.params.householdId)
        .then(household =>{
          household.choresList = req.body
          household.save(household).then(() =>{
            res.send(handleResponse(action, req.body))
          })

        })
        .catch(error => {
          return next(handleResponse(action, null, error))
        })
    }
  },
    getWinnerByLeaderboard: {
        path: '/households/:householdId/leaderboard/:leaderboardId/winner',
        reqType: 'get',
        method(req, res, next) {
            let action = 'Return winner in the household'
            Household.findById(req.params.householdId)
                .then(household => {
                    Leaderboard.find({ leaderboardId: req.params.leaderboardId })
                        .then(winner => {
                            leaderboard.winner = winner
                            res.send(handleResponse(action, winner))
                        }).catch(error => {
                            return next(handleResponse(action, null, error))
                        })
                }).catch(error => {
                    return next(handleResponse(action, null, error))
                })
        }
    },
    updateStartAndEndDate: {
      path: 'post'
    }

    // getTasksAndAllComments: {
    //     path: '/boards/:boardId/lists/:listId/tasks/comments',
    //     reqType: 'get',
    //     method(req, res, next) {
    //         let action = 'Return list and all Tasks with their Comments'
    //         Lists.findById(req.params.listId)
    //             .then(list => {
    //                 //console.log('here?')
    //                 Tasks.find({ listId: req.params.listId })
    //                     .then(tasks => {
    //                         list.tasks = tasks
    //                         Promise.all(tasks.map(task => {
    //                             return Comments.find({ taskId: task._id })
    //                                 .then(comments => {
    //                                     task.comments = comments
    //                                 }).catch(error => {
    //                                     return next(handleResponse(action, null, error))
    //                                 })
    //                         })).then(() => {
    //                             res.send(handleResponse(action, list))
    //                         }).catch(error => {
    //                             return next(handleResponse(action, null, error))
    //                         })
    //                     }).catch(error => {
    //                         return next(handleResponse(action, null, error))
    //                     })
    //             }).catch(error => {
    //                 return next(handleResponse(action, null, error))
    //             })
    //     }
    // }
}

function handleResponse(action, data, error) {
  var response = {
    action: action,
    data: data
  }
  if (error) {
    response.error = error
  }
  return response
}