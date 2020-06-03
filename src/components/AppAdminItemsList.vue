<template>
   <b-container fluid>
   <b-row>
    <b-col cols="12">
        <a href="#" @click="logout">{{ $t('appAdminItemsList-link-logout') }}</a>
        <h2>
            {{ $t('appAdminItemsList-title') }}
            <b-link href="#/agregar-empanada"> {{ $t('appAdminItemsList-link-addItem')}} </b-link>
        </h2>
        <b-table striped hover :items="items" :fields="fields" caption-top>
            
            <template v-slot:table-caption>{{ $t('appAdminItemsList-table-caption')}}</template>
            
            <template v-slot:cell(actions)="data">
                <b-button @click.stop="edit(data.item)" variant="primary">{{$t('appAdminItemsList-btn-edit')}}</b-button>
               
                <!-- TODO verify item's state to set correct label for toogle -->
                <b-button @click.stop="suspendActivate(data.item)">{{$t('appAdminItemsList-btn-toogle-inactivate')}}</b-button>
                
                <b-button @click.stop="remove(data.item)" variant="danger">{{$t('appAdminItemsList-btn-delete')}}</b-button>
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
    name: 'AppAdminItemsList',
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
            // TODO feature edit Item
            console.log(item);
            window.open(`https://api.whatsapp.com/send?phone=541165645467&text='hola viejo'`,
                            "_blank");
        },

        suspendActivate(item){
            // TODO feature toggle suspend/activate item
            console.log(item);
        },

        remove(item){
            
            if (confirm(this.$i18n.t('appAdminItemsList-confirm-delete-message' + ' ' + item.code - item.description))){
                
                firebase.firestore().collection('items').doc(item.key).delete().then(function(){
                    
                }).catch(function(error){
                    alert(this.$i18n.t('appAdminItemsList-error-message-deleting-item') + ' ' + error);
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