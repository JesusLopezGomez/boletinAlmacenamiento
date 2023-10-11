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

let usuarios = localStorage.getItem("users") == null ? [] :JSON.parse(localStorage.getItem("users"));
let copiaUsuariosString = localStorage.getItem("users") == null ? [] : localStorage.getItem("users");


enviar.addEventListener(`click`,function(){
    if(nombre.value != "" && direccion.value != "" && email.value != ""){
        let usuario = {nombre:nombre.value, direccion:direccion.value, email:email.value};
        if(usuarioUnico(usuario)){
            usuarios.push(usuario);
            localStorage.setItem("users",JSON.stringify(usuarios));    
        }
    }
});

function mostrarUsuarios(){
    usuarios.forEach(usuario => {
        let li = document.createElement("li");        
        li.appendChild(document.createTextNode(`${usuario.nombre} : ${usuario.direccion} : ${usuario.email} : `));

        let editar = document.createElement("button");
        editar.textContent = "Editar";
        editar.setAttribute("id","mod");

        let br = document.createElement("br");

        let borrar = document.createElement("button");
        borrar.textContent = "Borrar";
        borrar.setAttribute("id","del");

        li.appendChild(editar);
        li.appendChild(br);
        li.appendChild(borrar);
        lista.appendChild(li);
    });
}

function usuarioUnico(usuario){
    let unico = true;
    if(copiaUsuariosString.indexOf(JSON.stringify(usuario)) != -1){
        unico = false;
    }
    return unico;
}

mostrarUsuarios();

let borrar = document.querySelectorAll("#del");
for(let i = 0; i < borrar.length; i++){
    borrar[i].addEventListener(`click`,function(event){ 
        event.target.parentNode.remove();
        usuarios.splice(i,1);
        localStorage.setItem("users",JSON.stringify(usuarios));
    });
}

let editar = document.querySelectorAll("#mod");
for(let o = 0; o < editar.length ; o++){
    editar[o].addEventListener(`click`,function(event){
        let usuarioRecuperado = usuarios[o];
        event.target.parentNode.remove();
        //falta borra de la lista
        nombre.value = usuarioRecuperado.nombre;
        direccion.value = usuarioRecuperado.direccion;
        email.value = usuarioRecuperado.email;
        enviar.textContent = "Editar usuario";
    })
}

//localStorage.removeItem("users");
