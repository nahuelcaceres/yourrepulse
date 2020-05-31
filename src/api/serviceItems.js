let _empanadas = [
  { id: 1, title: "[CS] CARNE SUAVE", price: 45, inventory: 50 },
  { id: 2, title: "[PO] POLLO", price: 45, inventory: 10 },
  { id: 3, title: "[RJ] ROQUEFORT JAMONs", price: 45, inventory: 10 }
];

import firebase from '../Firebase.js';

//TIP: exportar funciones de este modulo
export default {

  getItems(cb) {
    
    firebase.firestore().collection('empanadas').onSnapshot((querySnapshot) => {
      //this.empanadas = [];
      
      querySnapshot.forEach((doc) => {
        //if (doc.data().estado == 'alta') {
          _empanadas.push({
            
            key: doc.id,
            codigo: doc.data().codigo,
            descripcion: doc.data().descripcion, 

            id: this.key,
            title: `[${doc.data().codigo}] ${doc.data().descripcion}` ,
            price: 40,
            inventory: 10

          });
        });
      
      
      cb(_empanadas);

    });


  },

  buyItems(items, cb, errorCb) {
    setTimeout(() => {

      //TIP: simulate random checkout failure.
      Math.random() > 0.5 || navigator.userAgent.indexOf("PhantomJS") > -1
        ? cb()
        : errorCb();
    }, 100);
  }

};
