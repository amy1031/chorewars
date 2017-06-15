let Household = require('../models/household')
let Users = require('../models/user')

export default {
  household: {
    path: '/households',
    reqType: 'get',
    method(req, res, next) {
      let action = 'Get Household Information'
      Household.find({ creatorId: req.session.uid })
        .then(household => {
          res.send(handleResponse(action, household))
        }).catch(error => {
          return next(handleResponse(action, null, error))
        })
    }
  },
  findUsersByName: {
    path: '/findUsers',
    reqType: 'post',
    method(req, res, next) {
      let action = 'Find User and add them to the household members'
      Users.findOne({ name: req.body.user })
        .then(user => {
          if (!user) {
            res.sendStatus(404)({ error: "User Not Found" })
          } else {
            // Might need more validation to check if user is creator of household for stupid users
            Household.findById(req.body.householdId)
              .then(household => {
                for (var i = 0; i < household.members.length; i++) {
                  var member = household.members[i];
                  if(member.email == user.email){
                    res.send(handleResponse(action, "User is already part of the household"))
                    return;
                  }
                }
                if(true){
                    household.members.push(user)
                    household.save(household).then(() => {
                    res.send(handleResponse(action, req.body))
                  })
                }
              })
              .catch(error => {
                return next(handleResponse(action, null, error))
              })
          }
        })
    }
  },
    updateHouseholdMemberChore: {
    path: '/updateMemberChore',
    reqType: 'put',
    method(req, res, next) {
      let action = 'Update member completed chore list in active household'
      Users.findOne({ name: req.body.user })
        .then(user => {
          if (!user) {
            res.sendStatus(404)({ error: "User Not Found" })
          } else {
            // Might need more validation to check if user is creator of household for stupid users
            Household.findById(req.body.householdId)
              .then(household => {
                for (var i = 0; i < household.members.length; i++) {
                  var member = household.members[i];
                  if(member.email == user.email){
                    res.send(handleResponse(action, "User is already part of the household"))
                    return;
                  }
                }
                if(true){
                    household.members.push(user)
                    household.save(household).then(() => {
                    res.send(handleResponse(action, req.body))
                  })
                }
              })
              .catch(error => {
                return next(handleResponse(action, null, error))
              })
          }
        })
    }
  },
  addCreatorToHousehold: {
    path: '/addCreator',
    reqType: 'post',
    method(req, res, next) {
    // debugger
      let action = 'Add creator to newly created household'
      Users.findOne({ name: req.body.name })
        .then(user => {
        //  debugger
            Household.findOne({ creatorId: req.body._id })
              .then(household => {
               // debugger
                    household.members.push(user)
                    household.save(household).then(() => {
                    res.send(handleResponse(action, req.body))
              })
              .catch(error => {
                return next(handleResponse(action, null, error))
              })
        })
        })
    }
  },
    updateUserPoints: {
    path: '/updateUserPoints',
    reqType: 'put',
    method(req, res, next) {
      let action = 'Update user object'
      Users.findOne({ _id: req.body.userId })
        .then(user => {
          if (!user) {
            res.sendStatus(404)({ error: "User Not Found" })
          } else {
               user.points += req.body.chorePoints
               user.save(user).then(() => {
                  res.send(handleResponse(action, req.body))
                })
              .catch(error => {
                return next(handleResponse(action, null, error))
              })
          }
        })
    }
  },
  updateUserChore: {
    path: '/updateUserChore',
    reqType: 'put',
    method(req, res, next) {
      let action = 'Update user object'
      Users.findOne({ _id: req.body.userId })
        .then(user => {
          //
          if (!user) {
            res.sendStatus(404)({ error: "User Not Found" })
          } else {
               user.completedChores.push(req.body.chore)
               user.save(user).then(() => {
                  res.send(handleResponse(action, req.body))
                })
              .catch(error => {
                return next(handleResponse(action, null, error))
              })
          }
        })
    }
  },
   householdChores: {
    path: '/householdChores',
    reqType: 'put',
    method(req, res, next) {
      let action = 'Update household Chore Log array'
      Household.findOne({ _id: req.body.householdId })
        .then(household => {
          if (!household) {
            res.sendStatus(404)({ error: "Household Not Found" })
          } else {
               household.choreLog.push(req.body.chore)
               household.save(household).then(() => {
                  res.send(handleResponse(action, req.body))
                })
              .catch(error => {
                return next(handleResponse(action, null, error))
              })
          }
        })
    }
  }

}
// router.post('/findUsers', (req, res) => {
//
//   Users.findOne({userName: req.body.user})
//     .then(user=>{
//       if(!user){
//         res.sendStatus(404)({error: "User Not Found"})
//       }else{
//         Household.findByIdAndUpdate
//       }
//     })
// })

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