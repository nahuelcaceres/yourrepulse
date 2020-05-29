import Vue from "vue";
import items from "../api/items.js";

export default {
    state: {
        items: [],
        selectedItem: {}
    },
    mutations: {
        //TIP: SIEMPRE EL PRIMER PARAMETRO ES EL STATE, LUEGO EL PAYLOAD(OPCIONAL)
        setItems(state, items){
            state.items = items;
        },
  
        setSelectedItem(state, item){
            state.selectedItem = item;
        },
  
        editEmpanada(state, data){
            // Buscar el indice del producto
            const index = state.items.findIndex(
                empanada => empanada.id === state.selectedItem.id
            );
  
            // Componer la empanada en base a la props cambiadas
            const empanada = Object.assign({}, state.items[index], data);
    
            // Actualizar activando la reactividad
            Vue.set(state.items, index, empanada);
         },
  
        decrementEmpanadaInventory(state, empanada){
            empanada.inventory--;
        },
    
        incrementEmpanadaInventory(state, item){
            const empanada = state.items.find(empanada => empanada.id === item.id);
    
            empanada.inventory += item.quantity; //Le sumo lo que tenga el inventory
    
        },
    },
    actions: {
        //TIP: EL PRIMER PARAMETRO ES EL CONTEXTO, PERO LO PODEMOS DESECTRUCTURAR
        getItems({commit}){
            return new Promise((resolve) => {
            items.getItems( items => {
                commit("setItems", items);
    
                resolve();
            });
        })
      },
    },
    getters: {
        //TIP: seria una propiedad computada pero del state, cuando algo cambie...se recalcula
        itemInStock(state){
            //Puede devolver una version modificada de algo de state.
            //Ej: Ahora queremos las empanadas filtradas por si tienen stock
            return state.items.filter(item => {
              return item.inventory > 0;
            })
        },

        selectedItem(state){
            return state.selectedItem;
        },
      
        nearSoldOutEmpanada(state){
            return (id) => {
              return state.items.find(item => item.id === id).inventory <= 5;
            };
        }
    }
};