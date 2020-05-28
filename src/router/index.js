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
import AddEmpanadaLista from '@/components/AddEmpanadaLista';

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


        {
            path: '/home',
            name: 'Home',
            component: Home
        },

        {
            path: '/listado',
            name: 'AddEmpanadaLista',
            component: AddEmpanadaLista
        },

        {
            path: '/',
            redirect: '/login'
        },
        { //Cualquier url no valida...envia a login
            path: '*',
            redirect: '/login'
        },
        {
            path: '/login',
            name: 'Login',
            component: Login
        },
        {
            path: '/empanada-listado',
            name: 'EmpanadaListado',
            component: EmpanadaListado,
            meta:{
                autentificado: true //Para poder acceder ..tienes que estar autenficado.
            }
        },
        {
            path: '/agregar-empanada',
            name: 'AgregarEmpanada',
            component: AgregarEmpanada,
            meta:{
                autentificado: true //Para poder acceder ..tienes que estar autenficado.
            }
        }
    ]
})

router.beforeEach((to, from, next) => {

    //Tengo un Usuario logueado
    let usuario = firebase.auth().currentUser;
    
    //Es una ruta que requiere estar autentificado
    let requiereAutorizacion = to.matched.some(record => record.meta.autentificado);

    if (requiereAutorizacion){
        if (usuario){
            next();
        } else {
            next('login');
        }
    
    } else {
        next();
    }

})

export default router;