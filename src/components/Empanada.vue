<template>
  <div>
    
    <li 
    :class="{ 'sold-out': $store.getters.nearSoldOutEmpanada(empanada.id)}"
    @click="selectEmpanada(empanada)" 
    v-for="empanada in empanadasEnStock" 
    :key="empanada.id"
    >
    
    {{ empanada.title }} | {{ empanada.price }}
    
    <i>{{ empanada.inventory }} </i>
    <button @click="addToCarrito(empanada)">Add</button>
    
    </li>
    
  </div>
</template>

<script>
export default {

}
</script>

<style>

</style>