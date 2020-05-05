import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLogin:localStorage.getItem('isLogin') ? localStorage.getItem('isLogin') : false,
    uid:localStorage.getItem('uid') ? localStorage.getItem('uid') : '',
    user_nickName:localStorage.getItem('user_nickName') ? localStorage.getItem('user_nickName') : '',
    token: localStorage.getItem('token') ? localStorage.getItem('token') : '',
    user_img_url:localStorage.getItem('user_img_url') ? localStorage.getItem('user_img_url') : '',
    username:localStorage.getItem('username') ? localStorage.getItem('username') : '',
  },
  mutations: {
    getUid(state,data){
      state.uid=data;
      localStorage.setItem("uid",data);
    },
    getToken(state,data){
      state.token=data;
      state.isLogin=true;
      localStorage.setItem("isLogin",state.isLogin);
      localStorage.setItem("token",data);
    },
    getNickname(state,data){
      state.user_nickName=data;
      localStorage.setItem("user_nickName",data);
    },
    getImg(state,data){
      state.user_img_url=data;
      localStorage.setItem("user_img_url",data);
    },
    getUserName(state,data){
        state.username=data;
        localStorage.setItem("username",data);
    },
    loginOut(state){
      // state.uid='';
      // state.user_img_url='';
      // state.user_nickName='';
      // state.token='';
      // state.isLogin=false;
      localStorage.removeItem("token");
      localStorage.removeItem("isLogin");
      localStorage.removeItem("uid");
      localStorage.removeItem("user_nickName");
      localStorage.removeItem("user_img_url");
      localStorage.removeItem("username");
    }
  },
  actions: {
  },
  modules: {
  }
})
