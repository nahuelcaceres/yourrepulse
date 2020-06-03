import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import router from './router'
import store from './store'
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import firebase from './Firebase'
import i18n from './i18n'

Vue.config.productionTip = false
Vue.use(VueRouter)
Vue.use(BootstrapVue)

i18n.locale = 'es';

firebase.auth().onAuthStateChanged(function(){
  
  new Vue({
    router,
    store,
    i18n,
    render: h => h(App),
  }).$mount('#app')

})

