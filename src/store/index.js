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
    //TIP: SOLO LAS MUTACIONES PUEDEN MODIFICAR EL STATE DE NUESTRA APP
    setCheckoutItemError(state, error){
      state.checkoutItemError = error;
    }
  },
  actions: {
    
    checkoutItemsCart({ commit, state }){
      serviceItems.buyItems(
        
        state.cart.cart, () => {
          // Vaciar el cart (con una mutacion)
          commit('emptyItemsCart');
          
          // Manejar el error(Guardarlo para enviarlo a algun lugar, procesarlo)
          commit('setCheckoutItemError', false);

        }, () => {
          // Establecer que hay errores
          commit('setCheckoutItemError', true);

      })
    }
    
  },
  getters: {},
});
