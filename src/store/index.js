import Vue from "vue";
import Vuex from "vuex";

import items from "../api/items.js";
import carrito from "./carrito.js";
import empanadas from "./empanadas.js";

Vue.use(Vuex);

export default new Vuex.Store({
  strict: true,
  
  modules: {
    carrito,
    empanadas
  },

  state: {
    checkoutErrorEmpanadas: false,
  },

  mutations: {
    //TIP: SOLO LAS MUTACIONES PUEDEN MODIFICAR EL STATE DE NUESTRA APP
    setCheckoutErrorEmpanada(state, error){
      state.checkoutErrorEmpanadas = error;
    }
  },
  actions: {
    
    checkoutCarritoEmpanadas({ commit, state }){
      items.buyEmpanadas(
        state.carrito.carrito, () => {
        // Vaciar el carrito (con una mutacion)
        commit('emptyCarritoEmpanadas');
        
        // Manejar el error(Guardarlo para enviarlo a algun lugar, procesarlo)
        commit('setCheckoutErrorEmpanada', false);

      }, () => {
        // Establecer que hay errores
        commit('setCheckoutErrorEmpanada', true);

      })
    }
    
  },
  getters: {},
});
