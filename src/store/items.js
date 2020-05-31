import Vue from "vue";
import serviceItems from "../api/serviceItems.js";

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
  
        editItem(state, data){
            // Buscar el indice del producto
            const index = state.items.findIndex(
                item => item.id === state.selectedItem.id
            );
  
            // Componer el item segun las props cambiadas
            const item = Object.assign({}, state.items[index], data);
    
            // Actualizar activando la reactividad
            Vue.set(state.items, index, item);
         },
  
        decrementItemInventory(state, item){
            item.inventory--;
        },
    
        incrementItemInventory(state, item){
            const localItem = state.items.find(x => x.id === item.id);
    
            localItem.inventory += item.quantity; 
        },
    },
    actions: {
        //TIP: EL PRIMER PARAMETRO ES EL CONTEXTO, PERO LO PODEMOS DESECTRUCTURAR
        getItems({commit}){
            return new Promise((resolve) => {
                serviceItems.getItems( items => {
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
            //Ej: Ahora queremos los items filtrados por si tienen stock
            return state.items.filter(item => {
              return item.inventory > 0;
            })
        },

        selectedItem(state){
            return state.selectedItem;
        },
      
        nearSoldOutItem(state){
            return (id) => {
              return state.items.find(item => item.id === id).inventory <= 5;
            };
        }
    }
};