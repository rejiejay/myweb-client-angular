import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
const store = new Vuex.Store({
  state: {
    
  },
  getters: {},
  mutations: {
    /**
     * 更改 Vuex 的 store 中的状态的唯一方法是提交 mutation。
     */
      // sName (states, sName) { // 服务项目名
      //   states.sName = sName
      // },
      // Img (states, Img) { // 服务图片
      //   states.Img = Img
      // },
      initLocation (states, position) { // 初始化定位
        states.position = position;
      },


  },
  actions: {}
})
export default store
