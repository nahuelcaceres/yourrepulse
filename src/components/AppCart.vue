<template>
  <div>
      <h2>{{$t('appCart-title')}}</h2>
      <hr/>
      <ul>
        <li v-for="(item, $index) in itemsCart" :key="item.id">
            {{item.title}} ({{ item.quantity}})

            <button @click="removeItem($index)"> X </button>
        </li>
      </ul>
      
      <h4>{{$t('appCart-lbl-total')}} ${{totalCart || 0}}</h4>

      <button v-if="itemsCart.length" @click="checkout">{{$t('appCart-btn-buy-item')}}</button>
      <hr>
      
      <div v-if="$store.state.checkoutItemError">
          <p>{{ $t('appCart-error-message') }}</p>
      </div>
  </div>
</template>

<script>
import {currency} from '@/utils/currency.js';

export default {
    name: 'AppCart',
    methods: {
        removeItem(index){
            this.$store.dispatch('removeItemFromCart', index);
        },

        checkout(){
            
            this.$store.dispatch('checkoutItemsCart')
        }
    },
    computed: {
        itemsCart(){
            return this.$store.getters.itemsInCart;
        },

        totalCart(){
            return currency(this.$store.getters.totalCart, "");
        }
    }
}
</script>

<style>
ul {
  text-align: left;
}
</style>