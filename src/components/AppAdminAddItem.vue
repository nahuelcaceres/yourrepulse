<template>
    <b-row>
        <b-col cols="12">
            <h2>
                {{ $t('appAdminAddItem-title') }}
                <b-link href="#/empanada-listado"> {{ $t('appAdminAddItem-link-listItems')}}</b-link>
            </h2>
            <b-jumbotron>
                <b-form @submit="onSubmit">
                    <b-form-group id="codeGroup"
                        horizontal
                        :label-cols="4"
                        breakpoint="md"
                        :label= "$t('appAdminAddItem-lbl-addCode')" >
 
                        <b-form-input id="code" v-model.trim="item.code" :placeholder="$t('appAdminAddItem-inp-addCode')"></b-form-input>
                    </b-form-group>
                         
                    <b-form-group id="descriptionGroup"
                        horizontal
                        :label-cols="4"
                        breakpoint = "md"
                        :label= "$t('appAdminAddItem-lbl-addDescription')">
                        
                        <b-form-textarea id="description"
                            v-model="item.description"
                            :placeholder= "$t('appAdminAddItem-inp-addDescription')"
                            :rows="2"
                            :max-rows="6">{{item.description}}
                        </b-form-textarea>
                    </b-form-group>
 
                    <b-button type="submit" variant="primary">{{ $t('appAdminAddItem-btn-save') }}</b-button>

                </b-form>
            </b-jumbotron>
        </b-col>
    </b-row>
</template>

<script>
import router from '../router'
import firebase from '../Firebase'

export default {
    name: 'AppAdminAddItem',
    data() {
        return {
            ref: firebase.firestore().collection('items'),
            item: {
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
                    name: 'AppAdminItemsList'
                })
            })
            .catch((error) => {
                alert(this.$i18n.t('appAdminAddItem-error-message-adding-item'), error);
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