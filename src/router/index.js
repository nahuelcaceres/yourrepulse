import VueRouter from 'vue-router';
import BoardList from '@/components/BoardList';
import ShowBoard from '@/components/ShowBoard';
import AddBoard from '@/components/AddBoard';
import EditBoard from '@/components/EditBoard';

import firebase from '../Firebase'
import Login from '@/components/Login';
import EmpanadaListado from '@/components/EmpanadaListado';
import AgregarEmpanada from '@/components/AgregarEmpanada';

import Home from '@/views/Home';
import AppItemsList from '@/components/AppItemsList';

const router = new VueRouter({
    routes: [
        {
            path:'/board-list',
            name: 'BoardList',
            component: BoardList
        },
        {
            path: '/show-board/:id',
            name: 'ShowBoard',
            component: ShowBoard
        },
        {
            path: '/add-board',
            name: 'AddBoard',
            component: AddBoard
        },
        {
            path: '/edit-board/:id',
            name: 'EditBoard',
            component: EditBoard
        },
        


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
            name: 'Login',
            component: Login
        },


        // routes that require authenticated user.
        {
            path: '/empanada-listado',
            name: 'EmpanadaListado',
            component: EmpanadaListado,
            meta:{
                authenticated: true
            }
        },
        {
            path: '/agregar-empanada',
            name: 'AgregarEmpanada',
            component: AgregarEmpanada,
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