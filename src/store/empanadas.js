import Vue from "vue";
import tienda from "../api/tienda.js";

export default {
    state: {
        empanadas: [],
        selectedEmpanada: {}
    },
    mutations: {
        //TIP: SIEMPRE EL PRIMER PARAMETRO ES EL STATE, LUEGO EL PAYLOAD(OPCIONAL)
        setEmpanadas(state, empanadas){
            state.empanadas = empanadas;
        },
  
        setSelectedEmpanada(state, empanada){
            state.selectedEmpanada = empanada;
        },
  
        editEmpanada(state, data){
            // Buscar el indice del producto
            const index = state.empanadas.findIndex(
                empanada => empanada.id === state.selectedEmpanada.id
            );
  
            // Componer la empanada en base a la props cambiadas
            const empanada = Object.assign({}, state.empanadas[index], data);
    
            // Actualizar activando la reactividad
            Vue.set(state.empanadas, index, empanada);
      },
  
      decrementEmpanadaInventory(state, empanada){
        empanada.inventory--;
      },
  
      incrementEmpanadaInventory(state, item){
        const empanada = state.empanadas.find(empanada => empanada.id === item.id);
  
        empanada.inventory += item.quantity; //Le sumo lo que tenga el inventory
  
      },
    },
    actions: {
        //TIP: EL PRIMER PARAMETRO ES EL CONTEXTO, PERO LO PODEMOS DESECTRUCTURAR
        getEmpanadas({commit}){
            return new Promise((resolve) => {
            tienda.getEmpanadas( empanadas => {
                commit("setEmpanadas", empanadas);
    
                resolve();
            });
        })
      },
    },
    getters: {
        //TIP: seria una propiedad computada pero del state, cuando algo cambie...se recalcula
        empanadasEnStock(state){
            //Puede devolver una version modificada de algo de state.
            //Ej: Ahora queremos las empanadas filtradas por si tienen stock
            return state.empanadas.filter(empanada => {
              return empanada.inventory > 0;
            })
        },

        selectedEmpanada(state){
            return state.selectedEmpanada;
        },
      
        nearSoldOutEmpanada(state){
            return (id) => {
              return state.empanadas.find(empanada => empanada.id === id).inventory < 2;
            };
        }
    }
};