<template>
  <div>
    <h2>Listado de empanadas</h2>
    <hr />
    <ul>
      <li 
        :class="{ 'sold-out': $store.getters.nearSoldOutEmpanada(item.id)}"
        @click="selectItem(item)" 
        v-for="item in itemInStock" 
        :key="item.id"
        >
        
        {{ item.title }} | {{ item.price }} || 
        
        <i>{{ item.inventory }} </i>
        <button @click="addToCarrito(item)">Add</button>
        
      </li>
    </ul>
  </div>
</template>

<script>

import { mapState, mapGetters, mapActions, mapMutations } from 'vuex'

export default {
    name: "AddEmpanadaLista",
    
    async created() {
        
        try {
            
            await this.$store.dispatch('getItems');

        } catch (error) {
            console.error(error);
        }   
    },

    methods:  {
        ...mapActions({
            addToCarrito: 'addEmpanadaToCarrito'
        }),
        ...mapMutations({
            selectItem: 'setSelectedItem'
        })
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