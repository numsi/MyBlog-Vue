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


