<template>
   <b-container fluid>
   <b-row>
    <b-col cols="12">
        <a href="#" @click="logout">SALIR</a>
        <h2>
            Empanadas Listado
            <b-link href="#/agregar-empanada">(Agregar Empanada)</b-link>
        </h2>
        <b-table striped hover :items="empanadas" :fields="fields" caption-top>
            <template v-slot:table-caption>This is a table caption at the top.</template>
            <template v-slot:cell(actions)="data">
                <b-button @click.stop="editar(data.item)" variant="primary">Editar</b-button>
                <b-button @click.stop="supenderActivar(data.item)">Inactivar</b-button>
                <b-button @click.stop="borrar(data.item)" variant="danger">Borrar</b-button>
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
                { key: 'codigo', label: 'Codigo', sortable: true, 'class': 'text-left'},
                { key: 'descripcion', label: 'Descripcion', sortable: true, 'class': 'text-left'},
                { key: 'actions', label: 'Acciones', 'class': 'text-center'},
            ],
            empanadas: [],
            errors: [],
            ref: firebase.firestore().collection('empanadas'),
        }
    },
    created(){
        this.ref.onSnapshot((querySnapshot) => {
            this.empanadas = [];
            querySnapshot.forEach((doc) => {
                if (doc.data().estado == 'alta'){
                    this.empanadas.push({
                        key: doc.id,
                        codigo: doc.data().codigo,
                        descripcion: doc.data().descripcion
                    });
                }
            });
        });
    },
    methods: {
        editar(empanada){
            //router.push({name: 'MostrarEmpanada', params: {id: empanada.key}})
            console.log(empanada);
            window.open(`https://api.whatsapp.com/send?phone=541165645467&text='hola viejo'`,
                            "_blank");
        },
        supenderActivar(empanada){
            alert("toggle supender/activar" + empanada);
        },
        borrar(empanada){
            
            if (confirm(`Esta seguro de borrar ${empanada.codigo} - ${empanada.descripcion}`)){
                
                firebase.firestore().collection('empanadas').doc(empanada.key).delete().then(function(){
                    
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