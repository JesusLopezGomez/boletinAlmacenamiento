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
let enviar = document.querySelector("button[type='submit']");
//localStorage.removeItem("Users");

function comprobarRepetidos(usuario) {
    let hijosLista = lista.getElementsByTagName("li");
    let unico = true;
    for(let o = 0; o < hijosLista.length; o++) {
        let datosHijo = Array.from(hijosLista[o].textContent.split(":"));
        if(datosHijo[0].trim() == usuario.nombre && datosHijo[1].trim() == usuario.direccion && datosHijo[2].trim() == usuario.email){
            unico = false;
        }
    }
    return unico
}

function mostrarUsuarios(usuarios){
    if(usuarios != null && usuarios.length > 0){
        let usuariosSeparados = usuarios.split("|");
        usuariosSeparados.forEach(elemento => {
            let usuario = JSON.parse(elemento);
            if(comprobarRepetidos(usuario)){
                let li = document.createElement("li");
                li.appendChild(document.createTextNode(`${usuario.nombre} : ${usuario.direccion} : ${usuario.email} : `));

                let editar = document.createElement("button");
                editar.textContent = "Editar";
                editar.setAttribute("id","editar");
                li.appendChild(editar);

                let br = document.createElement("br");
                li.appendChild(br);

                let borrar = document.createElement("button");
                borrar.textContent = "Borrar";
                borrar.setAttribute("id","borrar");
                li.appendChild(borrar);

                lista.appendChild(li);
                document.body.appendChild(lista);
            }
        });
    }
}

enviar.addEventListener(`click`,function(){
    if(nombre.value != "" && direccion.value != "" && email.value != ""){    
        let usuario = {nombre:nombre.value,direccion:direccion.value,email:email.value};
        if(comprobarRepetidos(usuario)){
            if(localStorage.getItem("Users") == null || localStorage.getItem("Users").length == 0){
                localStorage.setItem("Users",[JSON.stringify(usuario)].join("|"));
            }else{
                let array = Array.from(localStorage.getItem("Users").split("|"));
                array.push(JSON.stringify(usuario));
                localStorage.setItem("Users",array.join("|"));
            }
        }
    }
});

mostrarUsuarios(localStorage.getItem("Users"));

let borrar = document.querySelectorAll("#borrar");
for(let i = 0; i < borrar.length; i++){
    borrar[i].addEventListener(`click`,function(event){ 
        event.target.parentNode.remove();
        let usuarios = Array.from(localStorage.getItem("Users").split("|"));
        usuarios.splice(i,1);
        localStorage.setItem("Users",usuarios.join("|"));
    });
};
