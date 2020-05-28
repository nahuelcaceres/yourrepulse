<template>
    <!-- Deberia ser: 
        [] Header (navbar) con visualizacion del carrito 
        
        [] Listado de Empanadas Disponibles
            [] Componente Empanada
        
        [] Listado de Empanadas NoDisponibles mencionandolas para marketing
        
        [] Footer con la informacion de la pyme, contacto, etc
    -->

    <b-card>
        <AddEmpanadaLista />
        <AddEmpanadaCarrito />
    </b-card>
    
</template>

<script>
import AddEmpanadaLista from '@/components/AddEmpanadaLista';
import AddEmpanadaCarrito from '@/components/AddEmpanadaCarrito';
export default {
    name: 'Home',
    components: {
            AddEmpanadaLista,
            AddEmpanadaCarrito
        }
}
</script>

<style>

</style>