import Vue from 'vue'
import VueRouter from 'vue-router'
import Index from '../views/Index'
import Home from '../views/Home'
import Login from '../views/Login'
import Register from '../views/Register'
import ShowAll from '../components/ShowAll'


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Index',
    component: Index,
    children:[
        {
            path:'/',
            name:"",
            component:ShowAll,

        },
        {
            path:'new',
            name:"New",
            component:ShowAll
        },
        {
            path:'java',
            name:"Java",
            component:ShowAll
        },
        {
            path:'python',
            name:"Python",
            component:ShowAll
        },
        {
            path:'c',
            name:"C",
            component:ShowAll
        },
        {
            path:'cpp',
            name:"C++",
            component:ShowAll
        }
    ]
  },
  {
      path: '/home',
      name: 'Home',
      component: Home
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
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
