import Vue from 'vue'
import Router from 'vue-router'
import Homepage from '@/components/Homepage'
import Login from '@/components/Login'
import Register from '@/components/Register'
import Start from '@/components/Start'
import Chores from '@/components/Chores'
import Households from '@/components/Households'
import Household from '@/components/Household'
import User from '@/components/User'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Homepage',
      component: Homepage
    },
    {
      path: '/login',
      name: 'Login',
      component: Login

    },
    {
      path: '/register',
      name: 'Register',
      component: Register
    },
    {
      path:'/start',
      name: 'Start',
      component: Start
    },
    {
      path: '/households',
      name: 'Households',
      component: Households
    },
    {
      path: '/households/:id',
      name: 'Household',
      component: Household
    },
    {
      path: '/households/:id/chores',
      name: 'Chores',
      component: Chores
    },
    {
      path: '/households/:id/user',
      name: 'User',
      component: User
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
