<template>
      <b-container fluid>
        <b-row>

        <b-col cols="10">
            
    <!-- 
            <form @submit.prevent="login">
                <input type="text" v-model="usuario" placeholder="Usuario" >
                
                <input type="password" v-model="contrasena" placeholder="Contraseña">

                <input type="submit" value="Ingresar">
            </form>
            -->
            <b-form @submit.prevent="login">
                    <b-form-group id="usuarioGroup"
                        horizontal
                        :label-cols="3"
                        breakpoint="md"
                        >
                        <h2>Loguearse from master2</h2><br>

                        <b-form-input type="email"  id="usuario" v-model="usuario"  placeholder="Email"></b-form-input>
                        
                    </b-form-group>
                        
                    <b-form-group id="contrasenaGroup"
                        horizontal
                        :label-cols="3"
                        breakpoint = "md"
                        >
                        
                        <b-form-input type="password" id="contrasena" v-model="contrasena" placeholder="Contraseña"></b-form-input>

                        <br>
                        <b-button type="submit" variant="primary">Ingresar</b-button>    
                    </b-form-group>
    
                    
            </b-form>

            <!-- <pre>{{$data}}</pre> -->
        
        
        </b-col>
        
        </b-row>
      </b-container>
</template>

<script>
import firebase from '../Firebase'

export default {
    data() {
        return {
            usuario: '',
            contrasena: ''
        }
    },
    methods: {
        login(){
            var ingresar = this.usuario.length > 3 && this.contrasena.length > 3;
            
            if (ingresar){
                
                firebase.auth()
                .signInWithEmailAndPassword(this.usuario, this.contrasena)
                    .then(() => this.$router.replace('empanada-listado'), (error) => console.error(error));
            }
        }
    }
}
</script>

<style>

</style>