export default {
    state: {
        carrito: []
    },
    mutations: {
        incrementEmpanadaQuantity(state, empanada){
          empanada.quantity ++;
        },

        addEmpanadaToCarrito(state, empanada){
          state.carrito.push({
            id: empanada.id,
            quantity: 1
          })
        },
        
        removeEmpanadaFromCarrito(state, index){
          state.carrito.splice(index, 1);
        },

        emptyCarritoEmpanadas(state){
          state.carrito = [];
        },
    },
    actions: {
        addEmpanadaToCarrito(context, empanada){
            // Hay inventario de la empanada?
            if (empanada.inventory === 0) return;
      
            // Existe ya en el carrito?
            const item = context.state.carrito.find(item => item.id === empanada.id);
      
            if (item) {
              // Si es asi, hay que añadir uno mas a la compra
              // Como tengo qeu tocar el state, se hace desde una mutacion
              context.commit('incrementEmpanadaQuantity', item);
            
            }else {
              // Si no es asi, añadir la empanada al carrito
              context.commit('addEmpanadaToCarrito', empanada);
            }
      
            // Independientemente, restar al inventario de esa empanada
            context.commit('decrementEmpanadaInventory', empanada);
        },
      
        removeEmpanadaFromCarrito(context, index){
            const item = context.state.carrito[index];
      
            // Eliminar la empanada del carrito
            context.commit('removeEmpanadaFromCarrito', index);
            
            // Restaurar el inventario
            context.commit('incrementEmpanadaInventory', item);
        },
    },
    getters: {
        carritoTotal(state, getters) {
            //Array.Reduce
            return getters.empanadasEnCarrito.reduce(
              (total, current) => total + current.price * current.quantity,
              0);
        },
  
        empanadasEnCarrito(state, getters, rootState){
            return state.carrito.map(item => {
              const empanada = rootState.empanadas.items.find(empanada => empanada.id === item.id );
      
              return {
                  title: empanada.title,
                  price: empanada.price,
                  quantity: item.quantity
              }
           })
        },
  
    }
};