import Vue from "vue";
import serviceItems from "../api/serviceItems.js";

export default {
    state: {
        items: [],
        selectedItem: {}
    },
    mutations: {
        
        setItems(state, items){
            state.items = items;
        },
  
        setSelectedItem(state, item){
            state.selectedItem = item;
        },
  
        editItem(state, data){
            
            const index = state.items.findIndex(
                item => item.id === state.selectedItem.id
            );
  
            // Composing the item according to the changed properties.
            const item = Object.assign({}, state.items[index], data);
    
            // Update by activating reactivity.
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

        // It would be like a computed property but of the state,
        // when something changes, it is recalculated.
        itemInStock(state){
            // You can return a modified version of something from state.
            
            //Ex: Now we want the filterd items if they have stock.
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