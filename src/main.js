import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import router from './router'
import store from './store'
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.config.productionTip = false
Vue.use(VueRouter)
Vue.use(BootstrapVue)

import firebase from './Firebase'

firebase.auth().onAuthStateChanged(function(){
  
  new Vue({
    router,
    store,
    render: h => h(App),
  }).$mount('#app')

})

