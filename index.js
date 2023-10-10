//Ejercicio 1: Introducción a localStorage

//a) ¿Qué es localStorage y cuál es su propósito en el desarrollo web?
//Es un memoria que almacena informacion en el navegador, su proposito es almacenar datos que nosotros decidimos para que cuando refresquen la web o se salgan sigan ahí una vez que vuelvan.
//b) Explica la diferencia clave entre localStorage y sessionStorage.
//La diferencia clave es que en la session cuando refrescas ya no están los datos almacenado y en el localStorage si.

//Ejercicio 2: Almacenando Datos Primitivos

//a) Utilizando localStorage, almacena tu nombre en el navegador bajo la clave "nombre". 
localStorage.setItem("nombre","jesus lopez gomez");
//b) Recupera el nombre almacenado en localStorage y muestra su valor en la consola.
console.log(localStorage.getItem("nombre"));

//Ejercicio 3: Eliminando Datos Primitivos

//a) Utilizando localStorage, almacena tu edad bajo la clave "edad". 
localStorage.setItem("edad",19);
//b) Utiliza la función adecuada para eliminar la clave "edad" de localStorage. 
//c) Verifica si la clave "edad" aún existe en localStorage.
localStorage.removeItem("edad");

//Ejercicio 4: Almacenando y Recuperando Objetos

//a) Crea un objeto JavaScript que represente una persona con propiedades como "nombre", "edad" y "ciudad". 
const persona = {
    nombre : "jesus",
    edad : 19,
    ciudad : "Villanueva del rio y minas"
}
//b) Utiliza JSON.stringify para convertir este objeto en una cadena JSON. 
//c) Almacena la cadena JSON en localStorage bajo la clave "persona". 
localStorage.setItem("persona",JSON.stringify(persona));
//d) Recupera la cadena JSON de localStorage y utiliza JSON.parse para convertirla de nuevo en un objeto JavaScript. 
//e) Muestra en la consola alguna propiedad del objeto recuperado.
console.log(JSON.parse(localStorage.getItem("persona")));

//Ejercicio 5: Eliminando Objetos

//a) Utilizando localStorage, almacena un objeto cualquiera bajo una clave de tu elección. 
localStorage.setItem("locotron","123");
//b) Utiliza la función adecuada para eliminar la clave que contiene el objeto.
//c) Verifica si la clave que contiene el objeto aún existe en localStorage.
localStorage.removeItem("locotron");

//Ejercicio 6
let lista = document.getElementById("userList");

let nombre = document.getElementById("name");
let direccion = document.getElementById("address");
let email = document.getElementById("email");
let enviar = document.querySelector("button");

if(localStorage.getItem("cont") == null){
    localStorage.setItem("cont",0)
}
enviar.addEventListener(`click`,function(){

    if(nombre.value != "" && direccion.value != "" && email.value != ""){
        localStorage.setItem("cont", parseInt(localStorage.getItem("cont"))+1);
        let li = document.createElement("li").appendChild(document.createTextNode(JSON.stringify({nombre:nombre.value,direccion:direccion.value,email:email.value})));
        lista.appendChild(li);
        document.body.appendChild(lista);
        localStorage.setItem(localStorage.getItem("cont"),[JSON.stringify({nombre:nombre.value,direccion:direccion.value,email:email.value})]);
    }
});

