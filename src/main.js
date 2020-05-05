import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
import axios from 'axios'
import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import './assets/iconfont/iconfont.css'


axios.defaults.baseURL = 'http://localhost:6001'
axios.defaults.headers.post['Content-Type'] = "application/json"
axios.defaults.withCredentials = true
axios.defaults.headers.common['token'] = store.state.token

//组件使用
Vue.use(mavonEditor)
Vue.use(Element)
//全局注册组件
Vue.prototype.$axios = axios;



// 建立中转站，实现组件与组件之间的传值
let bus = new Vue()
Vue.prototype.bus = bus


Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

axios.interceptors.request.use(config => {
// 在发送请求之前做些什么
//判断是否存在token，如果存在将每个页面header都添加token
    if(store.state.token){
        config.headers.common['token']=store.state.token
    }

    return config;
}, error => {
// 对请求错误做些什么
    return Promise.reject(error);
});

// http response 拦截器
axios.interceptors.response.use(
    response => {

        console.log(response);
        return response;
    },
    error => {
        console.log(error.response);
        if (error.response) {

            switch (error.response.status) {
                case 666:
                    this.$store.commit('loginOut');
                    router.replace({
                        path: '/login',
                        query: {redirect: router.currentRoute.fullPath}//登录成功后跳入浏览的当前页面
                    })
            }
        }
        return Promise.reject(error.response.data)
    });





