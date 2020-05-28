<template>
  <div>
    <h2>Listado de empanadas</h2>
    <hr />
    <ul>
      <li 
        :class="{ 'sold-out': $store.getters.nearSoldOutEmpanada(empanada.id)}"
        @click="selectEmpanada(empanada)" 
        v-for="empanada in empanadasEnStock" 
        :key="empanada.id"
        >
        
        {{ empanada.title }} | {{ empanada.price }} || 
        
        <i>{{ empanada.inventory }} </i>
        <button @click="addToCarrito(empanada)">Add</button>
        
      </li>
    </ul>
  </div>
</template>

<script>

//Vamos a utilizar esta api desde el state 
//import api from '../api/shop.js'
import { mapState, mapGetters, mapActions, mapMutations } from 'vuex'
export default {
    name: "AddEmpanadaLista",
    
    async created() {
        //1ºPido las empanadas a la api, y las envio al state mediante mutatcion setEmpanadas
        // api.getEmpanadas(empanadas => {
        //     this.$store.commit("setEmpanadas", empanadas);
        // })
        try {
            //Llamamos a la action getEmpanadas de Vuex
            await this.$store.dispatch('getEmpanadas');

        } catch (error) {
            console.error(error);
        }   
    },

    methods:  {
        ...mapActions({
            addToCarrito: 'addEmpanadaToCarrito'
        }),
        ...mapMutations({
            selectEmpanada: 'setSelectedEmpanada'
        })
    },
    // methods: {
    //     addToCarrito(empanada){
    //         //dispatch es directo a la accion
    //         this.$store.dispatch('addEmpanadaToCarrito', empanada);
    //     },

    //     selectEmpanada(empanada){
    //         //Commit es directo a la Mutacion
    //         this.$store.commit('setSelectedEmpanada', empanada);
    //     }
    // },

    // computed: {
    //     empanadas(){
    //         //2ºLa funcion computada recupera las empanadas seteadas al state
    //         //return this.$store.state.empanadas;
    //         return this.$store.getters.empanadasEnStock;
    //     }
    // }
    computed: {
        ...mapState(['selectedEmpanada']),
        ...mapGetters(['empanadasEnStock']),
        //Hacemos el map del nombre al getter en el store porque
        //empanadas: 'empanadasEnStock'

        //Pero se podria hacer resumido si son iguales.
        //en lugar de un objeto en mapGetters se pondria un array con el nombre del getter en el store
        // mapGetters(['empanadasOnStock'])  y en nuestro html seria ese nombre, en lugar de empanadas
        
        //Vemos como podemos tener las computed mapeadas a nuestros getters en store 
        //y tambien una funcion computada local.
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