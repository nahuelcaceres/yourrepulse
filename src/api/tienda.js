const _empanadas = [
    { id: 1, title: "[CS] CARNE SUAVE", price: 45, inventory: 50 },
    { id: 2, title: "[PO] POLLO", price: 45, inventory: 10 },
    { id: 3, title: "[RJ] ROQUEFORT JAMON", price: 45, inventory: 10 }
  ];

//TIP: exportar funciones de este modulo
export default {
   
    getEmpanadas(cb) {
      //setTimeout(()=> cb(_empanadas), 100);
      cb(_empanadas);
    },
  
    buyEmpanadas(empanadas,cb, errorCb){
      setTimeout(() => {
        
        //TIP: simulate random checkout failure.
        Math.random() > 0.5 || navigator.userAgent.indexOf("PhantomJS") > -1
          ? cb()
          : errorCb();
      }, 100);
    }
    
};
  