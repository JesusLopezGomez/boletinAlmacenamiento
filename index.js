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

let usuarios = localStorage.getItem("users") == null ? [] :JSON.parse(localStorage.getItem("users")); //Si el localStorage de users es nulol le asigno un array vacío y si no le asigno lo que tenga el localStorage pero lo paso a JSON
let copiaUsuariosString = localStorage.getItem("users") == null ? [] : localStorage.getItem("users"); //Lo mismo pero sin pasarlo a JSON,si es diferente de nulo lo guardo en String


enviar.addEventListener(`click`,function(){ //Cuando le de a enviar
    if(nombre.value != "" && direccion.value != "" && email.value != ""){ //Compruebo que ningun campo está vacío
        let usuario = {nombre:nombre.value, direccion:direccion.value, email:email.value}; //Creo un objeto usuario con los datos de los input
        if(usuarioUnico(usuario)){ //Compruebo que es único, es decir que no hay otro igual.
            usuarios.push(usuario); //Le añado el usuario a la array creada anteriomente
            localStorage.setItem("users",JSON.stringify(usuarios)); //Al la key users le asigno el valor del array de objeto pero pasando los JSON a string
        }
    }
});

function mostrarUsuarios(){ 
    usuarios.forEach(usuario => { //Recorro el array de usuarios
        let li = document.createElement("li"); //Cada vez que lo recorro creo un elemento LI  
        li.appendChild(document.createTextNode(`${usuario.nombre} : ${usuario.direccion} : ${usuario.email} : `)); //Le paso al LI un texto que será la información del usuario en el siguiente fomrato nombre : direccion : correo : 

        let editar = document.createElement("button"); //Creo un botón de editar cada vez que se recorra
        editar.textContent = "Editar"; //Le pongo en el textContent lo que quiero que me salga en el botón de editar
        editar.setAttribute("id","mod"); //Le pongo id al botón de editar para después utilizarlo más abajo

        let br = document.createElement("br"); //Creo un elemento br para que le de un salto de línea y quede más bonito

        let borrar = document.createElement("button"); //Creo un botón de borro cada vez que se recorra
        borrar.textContent = "Borrar"; //Le pongo en el textContent lo que quiero que me salga en el botón de borrar
        borrar.setAttribute("id","del"); //Le pongo id al botón de borrar para después utilizarlo más abajo

        li.appendChild(editar); //Le añado al li el botón de editar
        li.appendChild(br); //Le añado al li el salto de línea
        li.appendChild(borrar); //Le añado al li el botón de borrar
        lista.appendChild(li); //Y por último a la lista de añado el li para que se muestre por pantalla todo lo que hemos añadido anteriormente
    });
}

function usuarioUnico(usuario){ //Esta función me comprueba si hay algun usuario como el que le pasamos por parametro
    let unico = true;
    if(copiaUsuariosString.indexOf(JSON.stringify(usuario)) != -1) unico = false;
    /*Inicializo en true unico de forma en que si hay un usuario igual que él, el indexOf me dará algo diferente a -1 y le asigno a unico false*/
    return unico;
}

mostrarUsuarios();
borrar();
modificar();

function borrar(){
    let borrar = document.querySelectorAll("#del"); //Recupero todos los botones con el id del en una array
    for(let i = 0; i < borrar.length; i++){ //Recorro la array de los botones con un for tradicional ya que necesito su indice
        borrar[i].addEventListener(`click`,function(event){ //Cuando clicke en algunos de los botones que tenemos en el array, tengo también el event para acceder al padre de un elemento más fácil
            event.target.parentNode.remove(); //Esto me elimina el padre del botón el cual le ha dado click y en este caso me borrará el li correspondiente
            usuarios.splice(i,1); //Borra en la array la posicón donde esta el usuario que quería borrar, con el splice que me borrará 1 desde la posición que le he añadido en este caso al "i"
            localStorage.setItem("users",JSON.stringify(usuarios)); //Le reemplazo el valor a users esta vez sin el usuario que hemos eliminado
        });
    }
}

function modificar(){
    let editar = document.querySelectorAll("#mod"); //Recupero todos los botones con el id mod en una array
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
    }
}

