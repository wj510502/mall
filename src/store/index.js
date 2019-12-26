import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    cartList: []
  },
  mutations: {

      /* let oldPruduct = null
      for(let item of state.cartList) {
        if(item.iid === payload.iid) {
          oldPruduct = item
        }
      } */

      /* let oldPruduct = state.cartList.find(function(item){
        return item.iid === payload.iid
      }) */
      addCounter(state,payload) {
        payload.count++
      },
      addToCart(state,payload){
        payload.checked = true
        state.cartList.push(payload)
      }

  },
  actions: {
    addCart(context,payload) {
      return new Promise((resolve,reject) =>{
        const oldPruduct = context.state.cartList.find(item => item.iid === payload.iid)
        if (oldPruduct) {
          //oldPruduct.count += 1
          context.commit('addCounter',oldPruduct)
          resolve('当前商品+1')
        } else {
          payload.count = 1
          //context.state.cartList.push(payload)
          context.commit('addToCart',payload)
          resolve('添加了新商品')
        }
      })
    }
  },
  modules: {
  }
})
