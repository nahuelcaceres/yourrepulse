<template>
  <div>
    <h2>{{ $t('appItemsList-title') }}</h2>
    <hr />
    <ul>
      <li 
        :class="{ 'sold-out': $store.getters.nearSoldOutItem(item.id)}"
        @click="selectItem(item)" 
        v-for="item in itemInStock" 
        :key="item.id"
        >
        
        {{ item.title }} | ${{ formatPrice(item.price) }} || 
        
        <i>{{ item.inventory }} </i>
        <button @click="addToCart(item)">{{$t('appItemsList-btn-add-to-cart')}}</button>
        
      </li>
    </ul>
  </div>
</template>

<script>

import { mapState, mapGetters, mapActions, mapMutations } from 'vuex'
import {currency} from '@/utils/currency.js';

export default {
  
    name: "AppItemsList",
    
    async created() {
        
        try {
            
            await this.$store.dispatch('getItems');

        } catch (error) {
            console.error(error);
        }   
    },

    methods:  {
        ...mapActions({
            addToCart: 'addItemToCart'
        }),
        ...mapMutations({
            selectItem: 'setSelectedItem'
        }),
        
        formatPrice(price){
          return currency(price, "");
        }
    },
    
    computed: {
        ...mapState(['selectedItem']),
        ...mapGetters(['itemInStock']),
    
        testingNull(){
            return null;
        }
    }
}
</script>

<style>
ul {
  text-align: left;
}
.sold-out {
  background-color: lightpink;
  border: 4px solid tomato;
  padding: 0.3rem;
  margin: 0.1rem;
}
</style>