import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store'
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
import AdminLogin from '../views/admin/AdminLogin'
import AdminHome from '../views/admin/AdminHome'
import AdminBlog from '../views/admin/AdminBlog'
import AdminKind from '../views/admin/AdminKind'
import AdminUser from '../views/admin/AdminUser'
import AdminInfo from '../views/admin/AdminInfo'


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
              component: MyBlog,
              meta: {
                  requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
              },
          },
          {
              path:'/detail',
              name:'Detail',
              component:Detail,
              meta: {
                  requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
              },
          },
          {
              path:'/editor',
              name:'ArticleEditor',
              component:ArticleEditor,
              meta: {
                  requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
              },
          },
          {
              path:'/showuser',
              name:'ShowUser',
              component:ShowUser,
              meta: {
                  requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
              },
          },
          {
              path:'/usersetting',
              name:'UserSetting',
              component:UserSetting,
              meta: {
                  requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
              },
              redirect:'/usersetting/profile',
              children:[
                  {
                      path:'profile',
                      name:'InfoManagement',
                      component:InfoManagement,
                      meta: {
                          requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
                      },
                  },
                  {
                      path:'my_blog',
                      name:'BlogManagement',
                      component:BlogManagement,
                      meta: {
                          requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
                      },
                  },
                  {
                      path:'my_follow',
                      name:'MyFollow',
                      component:MyFollow,
                      meta: {
                          requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
                      },
                  },
                  {
                      path:'my_tag',
                      name:'TagManagement',
                      component:TagManagement,
                      meta: {
                          requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
                      },
                  },
                  {
                      path:'my_comment',
                      name:'CommentManagement',
                      component:CommentManagement,
                      meta: {
                          requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
                      },
                  },
                  {
                      path:'password_update',
                      name:'PasswordUpdate',
                      component:PasswordUpdate,
                      meta: {
                          requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
                      },
                  },
              ]
          },
          {
              path:'/search',
              name:'Search',
              component:Search,
              meta: {
                  requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
              },
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
    {
        path: '/adminLogin',
        name: 'AdminLogin',
        component: AdminLogin
    },
    {
        path: '/adminHome',
        name: 'AdminHome',
        component: AdminHome,
        meta: {
            requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
        },
        redirect:'/adminHome/user',
        children:[
            {
                path: 'blog',
                name: 'AdminBlog',
                component: AdminBlog,
                meta: {
                    requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
                },
            },
            {
                path: 'user',
                name: 'AdminUser',
                component: AdminUser,
                meta: {
                    requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
                },
            },
            {
                path: 'kind',
                name: 'AdminKind',
                component: AdminKind,
                meta: {
                    requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
                },
            },
            {
                path: 'info',
                name: 'AdminInfo',
                component: AdminInfo,
                meta: {
                    requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
                },
            },


        ]
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


router.beforeEach((to, from, next) => {
    //
    // if(to.path === '/login') {
    //     next();
    // } else {
    //     let token = localStorage.getItem('token');
    //     if(token === 'null' || token === '') {
    //         next('/login');
    //     }else {
    //         next();
    //     }
    // }

    if (to.meta.requireAuth) { // 判断该路由是否需要登录权限
        if (store.state.token) { // 通过vuex state获取当前的token是否存在
            next();
        }
        else {
            next({
                path: '/login',
                query: {redirect: to.fullPath} // 将跳转的路由path作为参数，登录成功后跳转到该路由
            })
        }
    }
    else {
        next();
    }

})

export default router
