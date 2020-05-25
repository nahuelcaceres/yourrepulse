<template>
  <div>
      <h2>Carrito</h2>
      <hr/>
      <ul>
        <li v-for="(item, $index) in carritoItems" :key="item.id">
            {{item.title}} ({{ item.quantity}})

            <button @click="removeItem($index)"> X </button>
        </li>
      </ul>
      <button v-if="carritoItems.length" @click="checkout">Comprar</button>
      <hr>
      <h4>Total {{carritoTotal || 0}}</h4>
      
      <div v-if="$store.state.checkoutErrorEmpanadas">
          <p>Error procesando el pedido</p>
      </div>
  </div>
</template>

<script>
import {currency} from '@/utils/currency.js';
export default {
    name: 'AppEmpanadaCarrito',
    methods: {
        removeItem(index){
            this.$store.dispatch('removeEmpanadaFromCarrito', index);
        },

        checkout(){
            //Aqui hacer mostrar el WhatsApp
            this.$store.dispatch('checkoutCarritoEmpanadas')
        }
    },
    computed: {
        carritoItems(){
            return this.$store.getters.empanadasEnCarrito;
        },

        carritoTotal(){
            return currency(this.$store.getters.carritoTotal, " $");
        }
    }
}
</script>

<style>
ul {
  text-align: left;
}
</style>