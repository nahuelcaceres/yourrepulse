<template>
    <b-row>
        <b-col cols="12">
            <h2>
                Agregar empanadas
                <b-link href="#/empanada-listado">(Listado de Empanadas)</b-link>
            </h2>
            <b-jumbotron>
                <b-form @submit="onSubmit">
                    <b-form-group id="codeGroup"
                        horizontal
                        :label-cols="4"
                        breakpoint="md"
                        label="Ingresar Codigo">

                        <b-form-input id="code" v-model.trim="item.code"></b-form-input>
                    </b-form-group>
                    
                    <b-form-group id="descriptionGroup"
                        horizontal
                        :label-cols="4"
                        breakpoint = "md"
                        label="Ingresar Descripcion">
                        
                        <b-form-textarea id="description"
                            v-model="item.description"
                            placeholder="Descripcion"
                            :rows="2"
                            :max-rows="6">{{item.description}}
                        </b-form-textarea>
                    </b-form-group>
 
                    <b-button type="submit" variant="primary">Guardar</b-button>

                </b-form>
            </b-jumbotron>
        </b-col>
    </b-row>
</template>

<script>
import router from '../router'
import firebase from '../Firebase'
export default {
    name: 'AgregarEmpanada',
    data() {
        return {
            ref: firebase.firestore().collection('items'),
            item: {
                estado: 'alta'
            }
        }
    },
    methods: {
        onSubmit(evt){
            evt.preventDefault();
            this.ref.add(this.item).then(() =>{
                this.item.code = ''
                this.item.description = ''
                
                router.push({
                    name: 'EmpanadaListado'
                })
            })
            .catch((error) => {
                alert("Error agregando documento: ", error)
            })
        }
    }
}
</script>

<style>
    .jumbotron {
        padding: 2rem;
    }
</style>