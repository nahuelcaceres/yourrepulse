<template>
   <b-container fluid>
   <b-row>
    <b-col cols="12">
        <a href="#" @click="logout">SALIR</a>
        <h2>
            Empanadas Listado
            <b-link href="#/agregar-empanada">(Agregar Empanada)</b-link>
        </h2>
        <b-table striped hover :items="items" :fields="fields" caption-top>
            <template v-slot:table-caption>This is a table caption at the top.</template>
            <template v-slot:cell(actions)="data">
                <b-button @click.stop="edit(data.item)" variant="primary">Editar</b-button>
                <b-button @click.stop="suspendActivate(data.item)">Inactivar</b-button>
                <b-button @click.stop="remove(data.item)" variant="danger">Borrar</b-button>
            </template>
        </b-table>
    </b-col>
  </b-row>
  </b-container>
</template>

<script>
import firebase from '../Firebase'
//import router from '../router'

export default {
    name: 'EmpanadaListado',
    data (){
        return {
            fields: [
                { key: 'code', label: 'Codigo', sortable: true, 'class': 'text-left'},
                { key: 'description', label: 'Descripcion', sortable: true, 'class': 'text-left'},
                { key: 'actions', label: 'Acciones', 'class': 'text-center'},
            ],
            items: [],
            errors: [],
            ref: firebase.firestore().collection('items'),
        }
    },
    created(){
        this.ref.onSnapshot((querySnapshot) => {
            this.items = [];

            querySnapshot.forEach((doc) => {
                
                this.items.push({
                    key: doc.id,
                    code: doc.data().code,
                    description: doc.data().description
                });
                
            });
        });
    },
    methods: {
        edit(item){
            //router.push({name: 'MostrarEmpanada', params: {id: item.key}})
            console.log(item);
            window.open(`https://api.whatsapp.com/send?phone=541165645467&text='hola viejo'`,
                            "_blank");
        },

        suspendActivate(item){
            alert("toggle supender/activar" + item);
        },

        remove(item){
            
            if (confirm(`Esta seguro de borrar ${item.code} - ${item.description}`)){
                
                firebase.firestore().collection('items').doc(item.key).delete().then(function(){
                    
                }).catch(function(error){
                    alert("No se pudo borrar!!! " + error);
                });
            }
            
        },

        logout(){
            
            firebase.auth().signOut().then(() => this.$router.replace('login'));

        }
    }
}
</script>

<style>
    .table {
        width: 96%;
        margin: 0 auto;
    }
</style>