const actions = {
  create: 'Create',
  update: 'Update',
  remove: 'Remove',
  find: 'Find',
  findAll: 'Find All'
}

const models = {
  household: {
    name: 'Household',
    endpoint: 'households',
    useCustomRoutes: true
  },
  chore: {
    name: 'Chore',
    endpoint: 'chores'
  },
  leaderboard: {
    name: 'Leaderboard',
    endpoint: 'leaderboard'
  },
  prize: {
    name: 'Prize',
    endpoint: 'prize'
  },
  completedChore:{
    name: 'completedChore',
    endpoint: 'completed-chores'
  },
  user: {
    name: 'User',
    endpoint: 'users',
    preventDefaultApi: true,
    useCustomRoutes: true
  }
}

export  {
  actions,
  models
}