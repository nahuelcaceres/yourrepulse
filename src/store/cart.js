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
            // Hay inventario de la item?
            if (item.inventory === 0) return;
      
            // Existe ya en el cart?
            const localItem = context.state.cart.find(x => x.id === item.id);
      
            if (localItem) {
              // Si es asi, hay que añadir uno mas a la compra
              // Como tengo que tocar el state, se hace desde una mutacion
              context.commit('incrementItemQuantity', localItem);
            
            }else {
              // Si no es asi, añadir la item al cart
              context.commit('addItemToCart', item);
            }
      
            // Independientemente, restar al inventario de ese item
            context.commit('decrementItemInventory', item);
        },
      
        removeItemFromCart(context, index){
            const item = context.state.cart[index];
      
            // Eliminar el item del cart
            context.commit('removeItemFromCart', index);
            
            // Restaurar el inventario
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