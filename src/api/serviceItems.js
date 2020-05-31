let _items = [
  { id: 1, title: "[CS] CARNE SUAVE", price: 45, inventory: 50 },
  { id: 2, title: "[PO] POLLO", price: 45, inventory: 10 },
  { id: 3, title: "[RJ] ROQUEFORT JAMONs", price: 45, inventory: 10 }
];

import firebase from '../Firebase.js';

export default {

  getItems(cb) {
    
    firebase.firestore().collection('items').onSnapshot((querySnapshot) => {
      //this.items = [];
      
      querySnapshot.forEach((doc) => {
        //if (doc.data().estado == 'alta') {
          _items.push({
            
            key: doc.id,
            codigo: doc.data().code,
            descripcion: doc.data().description, 

            id: this.key,
            title: `[${doc.data().code}] ${doc.data().description}` ,
            price: doc.data().price,
            inventory: doc.data().inventory

          });
        });
      
      
      cb(_items);

    });


  },

  buyItems(items, cb, errorCb) {
    //TODO: open chrome tab for whatsapp using items object.
    
    setTimeout(() => {

      //TIP: simulate random checkout failure.
      Math.random() > 0.5 || navigator.userAgent.indexOf("PhantomJS") > -1
        ? cb()
        : errorCb();
    }, 100);
  }

};
