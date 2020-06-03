import VueRouter from 'vue-router';
import firebase from '../Firebase'

import Home from '@/views/Home';
import AppLogin from '@/components/AppLogin';
import AppAdminAddItem from '@/components/AppAdminAddItem';
import AppAdminItemsList from '@/components/AppAdminItemsList';
import AppItemsList from '@/components/AppItemsList';

const router = new VueRouter({
    routes: [
        
        // any url doesn't validate, send to home
        { 
            path: '*',
            redirect: '/home'
        },
        
        {
            path: '/',
            redirect: '/home'
        },

        {
            path: '/home',
            name: 'Home',
            component: Home
        },

        {
            path: '/listado',
            name: 'AppItemsList',
            component: AppItemsList
        },
        
        {
            path: '/login',
            name: 'AppLogin',
            component: AppLogin
        },


        // routes that require authenticated user.
        {
            path: '/empanada-listado',
            name: 'AppAdminItemsList',
            component: AppAdminItemsList,
            meta:{
                authenticated: true
            }
        },
        {
            path: '/agregar-empanada',
            name: 'AppAdminAddItem',
            component: AppAdminAddItem,
            meta:{
                authenticated: true
            }
        }
    ]
})

router.beforeEach((to, from, next) => {

    let authenticatedUser = firebase.auth().currentUser;
    
    //'to' is a route that requires authentitcation?
    let requiereAutorizacion = to.matched.some(record => record.meta.authenticated);

    if (requiereAutorizacion){
       
        if (authenticatedUser){
            next();
        } else {
            next('login');
        }
    
    } else {
        next();
    }

})

export default router;