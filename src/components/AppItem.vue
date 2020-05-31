<template>
  <div>
    
    <li 
    :class="{ 'sold-out': $store.getters.nearSoldOutItem(item.id)}"
    @click="selectItem(item)" 
    v-for="item in itemsInStock" 
    :key="item.id"
    >
    
    {{ item.title }} | {{ item.price }}
    
    <i>{{ item.inventory }} </i>
    <button @click="addToCart(item)">Add</button>
    
    </li>
    
  </div>
</template>

<script>
export default {
  name: 'AppItem'
}
</script>

<style>

</style>