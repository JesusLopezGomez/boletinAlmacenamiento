let enviar = document.querySelector("button[type=submit]");
let lista = document.getElementById("userList");
let usuarios = [];
const url = "http://localhost:3000/users"

function userToApi(user){
    const peticion = new XMLHttpRequest();
    peticion.open("POST",url);
    peticion.setRequestHeader("Content-type","application/json");

    peticion.addEventListener("load",function(){
        if(peticion.status == 201){
            let newUser = JSON.parse(peticion.responseText);
            anniadirElementoLista(newUser);
        }
    });

    peticion.send(JSON.stringify(user));
}

function getUsersApi(){
    const peticion = new XMLHttpRequest();
    peticion.open("GET",url);
    peticion.setRequestHeader("Accept","application/json");

    peticion.addEventListener("load",function(){
        if(peticion.status == 200){
            usuarios = JSON.parse(peticion.responseText);
            usuarios.forEach(usuario => {
                anniadirElementoLista(usuario);
            });
        }
    });

    peticion.send();
}

function deleteUserApi(id){
    const peticion = new XMLHttpRequest();
    peticion.open("DELETE",url + "/" + id);
    peticion.setRequestHeader("Content-type","application/json");
    peticion.send();
}

function replaceUserApi(id,usuario){
    const peticion = new XMLHttpRequest();
    peticion.open("PUT",url + "/" + id);
    peticion.setRequestHeader("Content-type","application/json");

    peticion.addEventListener("load",function(){
        if(peticion.status == 200){
            console.log("200 OK");
        }
    })
    peticion.send(JSON.stringify(usuario));
}

function checkUniqueMail(p){
    const peticion = new XMLHttpRequest();
    peticion.open("GET",url + "?email=" + p.email);
    peticion.setRequestHeader("Accept","application/json");
    peticion.send();

    peticion.addEventListener("load",function(){
        if(peticion.status == 200){
            if(JSON.parse(peticion.responseText).length == 0){
                userToApi(p);
            }else{
                alert("Ese mail ya existe");
            }

        }
    })
}
function enviarUser(){
    enviar.addEventListener("click",function(event){
        let name = document.getElementById("name").value;
        let address = document.getElementById("address").value;
        let email = document.getElementById("email").value;
        
        const user = {name,address,email};
        checkUniqueMail(user);
    });

}

function anniadirElementoLista(usuario){
    let li = document.createElement("LI");
    li.appendChild(document.createTextNode(`${usuario.name} : ${usuario.address} : ${usuario.email} : `))
    
    let botonBorrar = document.createElement("BUTTON");
    botonBorrar.textContent = "Borrar";
    botonBorrar.classList.add("del");
    botonBorrar.setAttribute("data-id",usuario.id);

    let botonEditar = document.createElement("BUTTON");
    botonEditar.textContent = "Editar";
    botonEditar.classList.add("mod");
    botonEditar.setAttribute("data-id",usuario.id);

    li.appendChild(botonBorrar);
    li.appendChild(botonEditar);
    lista.appendChild(li);
}

function borrarUsuarioLista(){
    lista.addEventListener("click",function(event){
        if(event.target.classList.contains("del")){
            const li = event.target.parentElement;
            deleteUserApi(li.getElementsByClassName("del")[0].dataset.id);
            li.remove();
        }
    })
}

function mostarModificar(){
    lista.addEventListener("click",function(event){
        if(event.target.classList.contains("mod")){
            const li = event.target.parentElement.textContent.split(":");
            let email = li[2];
            usuarios.map((usuario) => {
                if(usuario.email === email.trim()){
                    document.getElementById("name").value = usuario.name;
                    document.getElementById("address").value = usuario.address;
                    document.getElementById("email").value = usuario.email;

                    enviar.setAttribute("disabled","true");

                    let editar = document.createElement("BUTTON");
                    editar.textContent = "Editar usuario";
                    editar.setAttribute("id","editar");

                    document.getElementById("userForm").appendChild(editar);

                    modificar(usuario);
                }
            }); 
        }
    });
}

function modificar(usuario){
    
    document.getElementById("editar").addEventListener("click",function(event){ 
        usuario.name = document.getElementById("name").value;
        usuario.address = document.getElementById("address").value;
        usuario.email = document.getElementById("email").value;

        replaceUserApi(usuario.id,usuario);
    });
}

enviarUser();
mostarModificar();
getUsersApi();
borrarUsuarioLista();