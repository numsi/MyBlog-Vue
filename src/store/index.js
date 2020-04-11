import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    uid:'11',
    isLogin:false,
    user_name:'',
    token:'',
    user_img_url:''
  },
  mutations: {
    changeLogin(state){
      state.isLogin=!state.isLogin;
    }
  },
  actions: {
  },
  modules: {
  }
})
