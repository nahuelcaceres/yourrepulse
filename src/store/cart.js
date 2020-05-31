export default {
    state: {
        cart: []
    },
    mutations: {
        incrementItemQuantity(state, item){
          item.quantity ++;
        },

        addItemToCart(state, item){
          state.cart.push({
            id: item.id,
            quantity: 1
          })
        },
        
        removeItemFromCart(state, index){
          state.cart.splice(index, 1);
        },

        emptyItemsCart(state){
          state.cart = [];
        },
    },
    actions: {
        addItemToCart(context, item){
            
            if (item.inventory === 0) return;
      
            // Do we have the item in te cart?
            const localItem = context.state.cart.find(x => x.id === item.id);
      
            if (localItem) {
              // If so, one more must be added to the cart.
              // As it is necessary to modify the 'state', it is done from a mutation.
              context.commit('incrementItemQuantity', localItem);
            
            }else {
              // If not, add the item to the cart.
              context.commit('addItemToCart', item);
            }
      
            // However, subtract from the inventory of this item.
            context.commit('decrementItemInventory', item);
        },
      
        removeItemFromCart(context, index){
            const item = context.state.cart[index];
      
            // Delete the item from the cart.
            context.commit('removeItemFromCart', index);
            
            // Restores item inventory.
            context.commit('incrementItemInventory', item);
        },
    },
    getters: {
        totalCart(state, getters) {
            
            return getters.itemsInCart.reduce(
              (total, current) => total + current.price * current.quantity,
              0);
        },
  
        itemsInCart(state, getters, rootState){
            return state.cart.map(item => {
              
              const localItem = rootState.items.items.find(x => x.id === item.id );
      
              return {
                  title: localItem.title,
                  price: localItem.price,
                  quantity: item.quantity
              }
           })
        },
  
    }
};