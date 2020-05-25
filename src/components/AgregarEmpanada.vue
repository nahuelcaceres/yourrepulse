<template>
    <b-row>
        <b-col cols="12">
            <h2>
                Agregar empanadas
                <b-link href="#/empanada-listado">(Listado de Empanadas)</b-link>
            </h2>
            <b-jumbotron>
                <b-form @submit="onSubmit">
                    <b-form-group id="codigoGroup"
                        horizontal
                        :label-cols="4"
                        breakpoint="md"
                        label="Ingresar Codigo">

                        <b-form-input id="codigo" v-model.trim="empanada.codigo"></b-form-input>
                    </b-form-group>
                    
                    <b-form-group id="descripcionGroup"
                        horizontal
                        :label-cols="4"
                        breakpoint = "md"
                        label="Ingresar Descripcion">
                        
                        <b-form-textarea id="descripcion"
                            v-model="empanada.descripcion"
                            placeholder="Descripcion"
                            :rows="2"
                            :max-rows="6">{{empanada.descripcion}}
                        </b-form-textarea>
                    </b-form-group>
 
                    <b-button type="submit" variant="primary">Guardar</b-button>

                </b-form>
            </b-jumbotron>
        </b-col>
    </b-row>
</template>

<script>
import firebase from '../Firebase'
import router from '../router'
export default {
    name: 'AgregarEmpanada',
    data() {
        return {
            ref: firebase.firestore().collection('empanadas'),
            empanada: {
                estado: 'alta'
            }
        }
    },
    methods: {
        onSubmit(evt){
            evt.preventDefault();
            this.ref.add(this.empanada).then(() =>{
                this.empanada.codigo = ''
                this.empanada.descripcion = ''
                
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