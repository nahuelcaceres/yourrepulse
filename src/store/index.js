import Vue from "vue";
import Vuex from "vuex";

import serviceItems from "../api/serviceItems.js";
import cart from "./cart.js";
import items from "./items.js";

Vue.use(Vuex);

export default new Vuex.Store({
  strict: true,
  
  modules: {
    cart,
    items
  },

  state: {
    checkoutItemError: false,
  },

  mutations: {
    
    setCheckoutItemError(state, error){
      state.checkoutItemError = error;
    }

  },
  actions: {
    
    checkoutItemsCart({ commit, state }){
      serviceItems.buyItems(
        
        state.cart.cart, () => {
          
          commit('emptyItemsCart');
          
          commit('setCheckoutItemError', false);

        }, () => {
          
          commit('setCheckoutItemError', true);

      })
    }
    
  },
  getters: {},
});
