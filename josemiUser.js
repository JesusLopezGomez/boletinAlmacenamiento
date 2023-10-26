const form = document.getElementById("userForm");
const list = document.getElementById("userList");
const button = document.querySelector("button");

// Suscribimos el formulario al evento submit
form.addEventListener("submit", (event)=>{
    findAPIemail(document.getElementById("email").value);

})

function readApi() {
    const request = new XMLHttpRequest();


    request.open("GET", "http://localhost:3000/users?_sort=name&_order=desc");

    request.send();

    // CUando ejecutemos la peticion Get para obtener todos los datos de la api, si el estado es de rango exito (200 a menos de 300) lo guardamos como objeto devuelto.
    request.addEventListener("load", () => {
        if (request.status >= 200 && request.status < 300) {
            const apiPersons = JSON.parse(request.responseText);

            apiPersons.forEach(person => {
                addToList(person);
            });

    
        }
    });
}

function addToList(person) {
    const li = document.createElement("LI");
    const modBtn = document.createElement("BUTTON");
    modBtn.textContent = "Modificar";
    modBtn.classList.add("mod");
    const delBtn = document.createElement("BUTTON");
    delBtn.classList.add("del");
    delBtn.textContent = "Borrar";
    delBtn.setAttribute("data-id", person.id);
    li.textContent = `${person.name} : ${person.address} : ${person.email} : ${person.age}`;
    li.appendChild(modBtn);
    li.appendChild(delBtn);
    list.appendChild(li);
}


// Antes de a;adir a la Api queremos comprobar que no se duplique
// Metodo de peticion de email existente
// Si no existe email en la api llamamos al metodo addToApi
function findAPIemail(email) {
    const request = new XMLHttpRequest();

    request.open("GET", "http://localhost:3000/users?email=" + email);
    request.send();

    request.addEventListener("load", ()=>{

        if(request.status>=200 && request.status < 300){
            // Como nos devuelve un array, si el array es mayor a 0, quiere decir que hay al menos un usuario.
            if(JSON.parse(request.responseText).length>0){
                alert("Ese usuario ya existe");
            }else{
                addToApi();
            }
        }
    })
}

// Metodo para añadir usuarios a la Api
function addToApi() {
    // Usamos un objeto FormData para capturar los datos del formulario de forma facil.
    const formu = new FormData(form);
    // Empezamos una peticion ajax http
    const request = new XMLHttpRequest();
    // Abrimos la sesion Ajax, como vamos a añadir, esta debe ser por metodo Post
    request.open("POST", "http://localhost:3000/users");

    if(Object.fromEntries(formu).age<18){
        alert("Es menor de edad")
    }else if(!validateEmail(Object.fromEntries(formu).email)){
        alert("El email no es valido")
    }else{
        // Indicamos que los datos que vamos a insertar son de tipo JSON
        request.setRequestHeader("Content-Type", "application/json");
        // Y ejecutamos la peticion, obteniendo del formulario las claves valores a traves del metodo fromEntries del objeto Object y lo transformamos a String.
        request.send(JSON.stringify(Object.fromEntries(formu)));
    }


    request.addEventListener("load", () => {
        console.log("Usuario add");
    });
}


// Para borrar un elemento necesitamos agregar a los botones de borrar una escucha, para ello seleccionamos la lista y en el target que queremos
// hacerle una subscripcion de click miramos si contiene la clase buscada
list.addEventListener("click",(evento)=>{

    if(evento.target.classList.contains("del")){
        const request = new XMLHttpRequest();
        request.open("DELETE", "http://localhost:3000/users/"+evento.target.parentElement.getElementsByClassName("del")[0].dataset.id);

        request.send();

        request.addEventListener("load", ()=>{
            if(request.status!=404) console.log("Borrado con exito!");
        })
    }
})

// Para borrar un elemento necesitamos agregar a los botones de borrar una escucha, para ello seleccionamos la lista y en el target que queremos
// hacerle una subscripcion de click miramos si contiene la clase buscada
list.addEventListener("click",(evento)=>{

    if(evento.target.classList.contains("mod")){

        const selectUser = new XMLHttpRequest();
        selectUser.open("GET", "http://localhost:3000/users/"+evento.target.parentElement.getElementsByClassName("del")[0].dataset.id);
        selectUser.send();
        selectUser.addEventListener("load", ()=>{
            if(selectUser.status==200){
                const user = JSON.parse(selectUser.responseText);
                document.getElementById("name").value=user.name;
                document.getElementById("address").value = user.address;
                document.getElementById("email").value = user.email;
                document.querySelector("[type=submit]").setAttribute("disabled", "disabled");
                const confirm = document.createElement("BUTTON");
                confirm.textContent="Confirmar"
                confirm.id="mod";
                confirm.addEventListener("click", (event)=>{
                    const userMod = { name: document.getElementById("name").value, address: document.getElementById("address").value, email: user.email, age: document.getElementById("age")}
                    modUser(user);
                })
                if(document.querySelectorAll("#mod").length==0) form.appendChild(confirm);

    

            }
        })

    }
})

    // Función para validar email
    function validateEmail(email) {
        const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        return regex.test(email);
    }



function modUser(user) {
    const request = new XMLHttpRequest();
   
    request.open("put", "http://localhost:3000/users/" + user.id);

    request.send(JSON.stringify(user));

    request.addEventListener("load", () => {
        if (request.status != 404) console.log("Actualizado!");
    });
}
readApi();