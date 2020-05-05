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
import UserSetting from '../views/user/UserSetting'
import Search from '../views/user/Search'
import UserAction from '../views/user/UserAction'

import InfoManagement from '../components/InfoManagement'
import BlogManagement from '../components/BlogManagement'
import PasswordUpdate from '../components/PasswordUpdate'
import TagManagement from '../components/TagManagement'
import MyFollow from '../components/MyFollow'
import CommentManagement from '../components/CommentManagement'

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
              path:'/editor',
              name:'ArticleEditor',
              component:ArticleEditor
          },
          {
              path:'/showuser',
              name:'ShowUser',
              component:ShowUser
          },
          {
              path:'/usersetting',
              name:'UserSetting',
              component:UserSetting,
              redirect:'/usersetting/profile',
              children:[
                  {
                      path:'profile',
                      name:'InfoManagement',
                      component:InfoManagement
                  },
                  {
                      path:'my_blog',
                      name:'BlogManagement',
                      component:BlogManagement
                  },
                  {
                      path:'my_follow',
                      name:'MyFollow',
                      component:MyFollow
                  },
                  {
                      path:'my_tag',
                      name:'TagManagement',
                      component:TagManagement
                  },
                  {
                      path:'my_comment',
                      name:'CommentManagement',
                      component:CommentManagement
                  },
                  {
                      path:'password_update',
                      name:'PasswordUpdate',
                      component:PasswordUpdate
                  },
              ]
          },
          {
              path:'/search',
              name:'Search',
              component:Search
          },
          {
              path:'/action',
              name:'UserAction',
              component:UserAction
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
