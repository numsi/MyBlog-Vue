import Vue from 'vue'
import VueRouter from 'vue-router'
import Index from '../views/Index'
import Home from '../views/Home'
import Login from '../views/Login'
import Register from '../views/Register'
import ShowAll from '../components/ShowAll'
import MyBlog from '../views/user/MyBlog'
import Detail from '../views/user/ArticleDetails'


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Index',
    component: Index,
     redirect:'/home',
      children:[
          {
              path: '/home',
              name: 'Home',
              component: Home,
          },
          {
              path: '/blog',
              name: 'MyBlog',
              component: MyBlog
          },
          {
              path:'/detail',
              name:'Detail',
              component:Detail
          }
      ]
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
