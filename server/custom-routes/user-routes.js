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
                debugger
                household.members.push(user)
                household.save(household).then(() => {
                  res.send(handleResponse(action, req.body))
                })
              })
              .catch(error => {
                return next(handleResponse(action, null, error))
              })
          }
        })



    }
  },
    updateUser: {
    path: '/updateUser',
    reqType: 'put',
    method(req, res, next) {
      debugger
      let action = 'Update user object'
      Users.findById(req.body.userId)
        .then(user => {
          if (!user) {
            res.sendStatus(404)({ error: "User Not Found" })
          } else {
               user.points += chorePoints
               user.save(user).then(() => {
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
//   debugger
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