import Vue from 'vue'
import VueRouter from 'vue-router'
import Index from '../views/Index'
import Home from '../views/Home'
import Login from '../views/Login'
import Register from '../views/Register'
import MyBlog from '../views/user/MyBlog'
import Detail from '../views/user/ArticleDetails'
import ArticleEditor from '../views/user/ArticleEditor'
import Error from '../views/Error404'
import ShowUser from '../views/user/ShowUser'
import UserInfo from '../views/user/UserInfo'

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
          },
          {
              path:'/article/editor',
              name:'ArticleEditor',
              component:ArticleEditor
          },
          {
              path:'/showuser',
              name:'ShowUser',
              component:ShowUser
          },
          {
              path:'/userinfo',
              name:'UserInfo',
              component:UserInfo
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

    // {
    //     path: "/404",
    //     name: "notFound",
    //     component: Error
    // },
    // {
    //     path: "*",
    //     redirect: "/404"
    // }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
