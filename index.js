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
let lista = document.getElementById("userList"); //Recupero la lista <ul>

let nombre = document.getElementById("name"); //Recupero el input que tiene de id name
let direccion = document.getElementById("address"); //Recupero el input que tiene de id direccion
let email = document.getElementById("email"); //Recupero el input que tiene de id email
let enviar = document.querySelector("button[type='submit']"); //Recupero el boton de tipo submit

let usuarios = []; //Si el localStorage de users es nulol le asigno un array vacío y si no le asigno lo que tenga el localStorage pero lo paso a JSON

const urlApi = "http://localhost:3000/users";

function getUsuariosApi(){
    const peticion = new XMLHttpRequest();
    peticion.open("GET",urlApi);
    peticion.setRequestHeader('Content-type', 'application/json');
    peticion.send();

    peticion.addEventListener("load",function(){
        if(peticion.status == 200){
            usuarios = JSON.parse(peticion.responseText);
            usuarios.forEach(usuario => {
                mostrarUsuarios(usuario);
            })
        }
    })
}
getUsuariosApi();

function deleteUserApi(id){
    const peticion = new XMLHttpRequest();
    peticion.open("DELETE",urlApi + "/" + id);
    peticion.setRequestHeader('Content-type', 'application/json');
    peticion.send();
}

function addUserApi(user){
    const peticion = new XMLHttpRequest();
    peticion.open("POST",urlApi);
    peticion.setRequestHeader('Content-type', 'application/json');
    peticion.send(JSON.stringify(user));

    peticion.addEventListener("load",function(){
        if(peticion.status == 201){
            let newUser = JSON.parse(peticion.responseText);
            usuarios.push(newUser);
            usuarios.forEach(usuario => {
                mostrarUsuarios(usuario);
            })
        }
    })
}

function editApi(id,usuario){
    const peticion = new XMLHttpRequest();
    peticion.open("PUT",urlApi + "/" + id);
    peticion.setRequestHeader('Content-type', 'application/json');
    peticion.send(JSON.stringify(usuario));

    peticion.addEventListener("load",function(){
        if(peticion.status == 200){
            console.log("200OK");
        }
    })

}


enviar.addEventListener(`click`,function(event){ //Cuando le de a enviar
    if(nombre.value != "" && direccion.value != "" && email.value != ""){ //Compruebo que ningun campo está vacío
        let usuario = {name:nombre.value, address:direccion.value, email:email.value}; //Creo un objeto usuario con los datos de los input
        addUserApi(usuario);
    }
});

function mostrarUsuarios(usuario){ 
     //Recorro el array de usuarios
        let li = document.createElement("li"); //Cada vez que lo recorro creo un elemento LI  
        li.appendChild(document.createTextNode(`${usuario.name} : ${usuario.address} : ${usuario.email} : `)); //Le paso al LI un texto que será la información del usuario en el siguiente fomrato nombre : direccion : correo : 

        let editar = document.createElement("button"); //Creo un botón de editar cada vez que se recorra
        editar.textContent = "Editar"; //Le pongo en el textContent lo que quiero que me salga en el botón de editar
        editar.classList.add("mod"); //Le pongo id al botón de editar para después utilizarlo más abajo
        editar.setAttribute("data-id",usuario.id); //Le pongo id al botón de editar para después utilizarlo más abajo

        let br = document.createElement("br"); //Creo un elemento br para que le de un salto de línea y quede más bonito

        let borrar = document.createElement("button"); //Creo un botón de borro cada vez que se recorra
        borrar.textContent = "Borrar"; //Le pongo en el textContent lo que quiero que me salga en el botón de borrar
        borrar.classList.add("del"); //Le pongo id al botón de borrar para después utilizarlo más abajo
        borrar.setAttribute("data-id",usuario.id); //Le pongo id al botón de editar para después utilizarlo más abajo

        li.appendChild(editar); //Le añado al li el botón de editar
        li.appendChild(br); //Le añado al li el salto de línea
        li.appendChild(borrar); //Le añado al li el botón de borrar
        lista.appendChild(li); //Y por último a la lista de añado el li para que se muestre por pantalla todo lo que hemos añadido anteriormente
}

borrar();
modificar();

function borrar(){
    document.getElementById("userList").addEventListener("click",function(event){
        if(event.target.classList.contains("del")){
            deleteUserApi(event.target.parentNode.getElementsByClassName("del")[0].dataset.id);
            event.target.parentNode.remove();
        }
    })
}

function modificar(){
    document.getElementById("userList").addEventListener("click",function(event){
        if(event.target.classList.contains("mod")){
            let array = event.target.parentNode.textContent.split(":");
            nombre.value = array[0];
            direccion.value = array[1];
            email.value = "loco";
/*Mejorar*/
            editApi(event.target.parentNode.getElementsByClassName("mod")[0].dataset.id,{name:nombre.value,address:direccion.value,email:email.value});

            enviar.textContent = "Editar";
        }
    })

    /*let editar = document.querySelectorAll("#mod"); //Recupero todos los botones con el id mod en una array
    for(let o = 0; o < editar.length ; o++){ //Recorro la array de los botones con un for tradicional ya que necesito su indice
        editar[o].addEventListener(`click`,function(event){ //Cuando clicke en algunos de los botones que tenemos en el array,tengo también el event para acceder al padre de un elemento más fácil
        let usuarioRecuperado = usuarios[o]; //Me guardo el usuario que vamos a borrar en esta variable para despues usarlo
        event.target.parentNode.remove();  //Esto me elimina el padre del botón el cual le ha dado click y en este caso me borrará el li correspondiente
        usuarios.splice(o,1); //Borra en la array la posicón donde esta el usuario que quería borrar, con el splice que me borrará 1 desde la posición que le he añadido en este caso al "i"
    
        nombre.value = usuarioRecuperado.nombre; //Al input de nombre le asigno el valor del usuario borrado
        direccion.value = usuarioRecuperado.direccion; //Al input de direccion le asigno el valor del usuario borrado
        email.value = usuarioRecuperado.email; //Al input de email le asigno el valor del usuario borrado
    
        enviar.textContent = "Editar usuario"; //Cambio el textContent del botón de enviar a Editar usuario y cuando le de a editar ejecutará el escuchador de eventos de arriba y añadirá la nueva informacion del usuario correctamente tanto el la lista como en el localStorage        

        })
    } */

}


