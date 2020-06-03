<template>
      <b-container fluid>
        <b-row>

        <b-col cols="10">
            
            <b-form @submit.prevent="login">
                    <b-form-group id="userGroup"
                        horizontal
                        :label-cols="3"
                        breakpoint="md"
                        >
                        <h2>{{$t('appLogin-title')}}</h2><br>

                        <b-form-input type="email"  id="user" v-model="user" :placeholder="$t('appLogin-inp-addEmail')"></b-form-input>
                        
                    </b-form-group>
                        
                    <b-form-group id="passwordGroup"
                        horizontal
                        :label-cols="3"
                        breakpoint = "md"
                        >
                        
                        <b-form-input type="password" id="password" v-model="password" :placeholder="$t('appLogin-inp-addPassword')"></b-form-input>

                        <br>
                        <b-button type="submit" variant="primary">{{$t('addLogin-btn-login')}}</b-button>    
                    </b-form-group>
    
                    
            </b-form>

        </b-col>
        
        </b-row>
      </b-container>
</template>

<script>
import firebase from '../Firebase'

export default {
    name: 'AppLogin',
    data() {
        return {
            user: '',
            password: ''
        }
    },
    methods: {
        login(){
            
            var tryLogin = this.user.length > 3 && this.password.length > 3;
            
            if (tryLogin){
                
                firebase.auth().signInWithEmailAndPassword(this.user, this.password)
                    .then(() => this.$router.replace('empanada-listado'), (error) => console.error(error));
            }
        }
    }
}
</script>

<style>

</style>