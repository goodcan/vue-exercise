import Vue from 'vue'
import Router from 'vue-router'
import Main from '../views/Main'
import CreateOrder from '../components/order/CreateOrder'
import SelfOrderList from '../components/order/SelfOrderList'
import DptOrderList from '../components/order/DptOrderList'
import Register from '../components/user/Register'
import Login from '../components/user/Login'
import CreateClass from '../components/order/CreateClass'
import CreateCustomer from '../components/order/CreateCustomer'
import CreateDpt from '../components/order/CreateDpt'
import CreateContact from '../components/order/CreateContact'
import UserList from '../components/user/UserList'
import EditUser from '../components/user/EditUser'
import SummaryAllOrder from '../components/summaryOrder/SummaryAllorder'

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Main',
      component: Main,
      children: [
        {
          path: '/summaryAllOrder',
          name: 'SummaryAllOrder',
          component: SummaryAllOrder
        },
        {
          path: '/editUser/:userId',
          name: 'EditUser',
          component: EditUser
        },
        {
          path: '/createOrder',
          name: 'CreateOrder',
          component: CreateOrder
        },
        {
          path: '/selfOrderList',
          name: 'SelfOrderList',
          component: SelfOrderList
        },
        {
          path: '/dptOrderList',
          name: 'DptOrderList',
          component: DptOrderList
        },
        {
          path: '/createClass',
          name: 'CreateClass',
          component: CreateClass
        },
        {
          path: '/createCustomer',
          name: 'CreateCustomer',
          component: CreateCustomer
        },
        {
          path: '/createContact',
          name: 'CreateContact',
          component: CreateContact
        },
        {
          path: '/createDpt',
          name: 'CreateDpt',
          component: CreateDpt
        },
        {
          path: '/userList',
          name: 'UserList',
          component: UserList
        }
      ]
    },
    {
      path: '/register',
      name: 'Register',
      component: Register
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    }
  ]
})
