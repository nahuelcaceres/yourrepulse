<template>
    <!-- Deberia ser: 
        [] Header (navbar) con visualizacion del carrito 
        
        [] Listado de Empanadas Disponibles
            [] Componente Empanada
        
        [] Listado de Empanadas NoDisponibles mencionandolas para marketing
        
        [] Footer con la informacion de la pyme, contacto, etc
    -->

    <b-card>
        <AppItemsList />
        <AppCart />
    </b-card>
    
</template>

<script>
import AppItemsList from '@/components/AppItemsList';
import AppCart from '@/components/AppCart';
export default {
    name: 'Home',
    components: {
            AppItemsList,
            AppCart
        }
}
</script>

<style>

</style>