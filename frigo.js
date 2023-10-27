let enviarFrigo = document.getElementById("anniadirFrigo");
let enviarLista = document.getElementById("anniadirLista");

let listaFrigo = document.getElementById("frigo");
let listaCompra = document.getElementById("lista");

const frigoApi = "http://localhost:3000/frigo";
const listaApi = "http://localhost:3000/lista";

let arrayFrigo = [];
let arrayLista = [];

function anniadirProductoApiConCantidad(producto, api){
    const xhr = new XMLHttpRequest();
    xhr.open("GET",api+"?nombre="+producto.nombre);
    xhr.send();
    xhr.addEventListener("load",function(){
        if(xhr.status == 200){
            if(JSON.parse(xhr.responseText).length > 0){
                sumarCantidadProducto(JSON.parse(xhr.responseText)[0],api);
            }else{
                anniadirProductoApi(producto,api);
            }
        }
    })
}

function sumarCantidadProducto(producto){
    const xhr = new XMLHttpRequest();
    xhr.open("PUT",frigoApi + "/" +producto.id);
    xhr.setRequestHeader("Content-type","application/json");
    const body = {nombre : producto.nombre, cantidad: producto.cantidad +1}
    xhr.addEventListener("load",function(){
        if(xhr.status == 200){
            location.reload();
        }
    });
    xhr.send(JSON.stringify(body));
}
function anniadirProductoApi(producto,api){
    const xhr = new XMLHttpRequest();
    xhr.open("POST",api);
    xhr.setRequestHeader("Content-type","application/json");

    xhr.addEventListener("load",function(){
        if(xhr.status == 201){
            let newProducto = JSON.parse(xhr.responseText);
            if(api === "http://localhost:3000/frigo"){
                anniadirFrigo(newProducto);
            }else{
                anniadirLista(newProducto);
            }
        }
    });
    xhr.send(JSON.stringify(producto));
}

function cargarInfosApi(api){
    const xhr = new XMLHttpRequest();
    xhr.open("GET",api);
    xhr.setRequestHeader("Accept","application/json");

    xhr.addEventListener("load",function(){
        if(xhr.status == 200){
            if(api == "http://localhost:3000/frigo"){
                arrayFrigo = JSON.parse(xhr.responseText);
                arrayFrigo.forEach((producto) => {
                    anniadirFrigo(producto);
                });
            }else{
                arrayLista = JSON.parse(xhr.responseText);
                arrayLista.forEach((producto) => {
                    anniadirLista(producto);
                });
            }

        }
    });
    xhr.send();
}

function borrarProductoApi(id,api){
    const xhr = new XMLHttpRequest();
    xhr.open("DELETE",api + "/" + id);
    xhr.setRequestHeader("Content-type","application/json");
    xhr.send();
}


function enviarListaFrigo(){
    enviarFrigo.addEventListener("click",function(event){
        //event.preventDefault();
        let producto = document.getElementById("productoFrigo").value;
        if(producto){
            anniadirProductoApiConCantidad({nombre:producto,cantidad:1},frigoApi);
        }
    })
}

function enviarListaCompra(){
    enviarLista.addEventListener("click",function(event){
        //event.preventDefault();
        let producto = document.getElementById("productoLista").value;
        if(producto){
            anniadirProductoApiConCantidad({nombre:producto},listaApi);
        }
    })
}

function anniadirFrigo(producto){
    let li = document.createElement("LI");
    li.appendChild(document.createTextNode(`${producto.nombre}:${producto.cantidad}:`));
    let botonBorrar = document.createElement("BUTTON");
    botonBorrar.textContent = "Borrar";
    botonBorrar.setAttribute("data-id",producto.id);
    botonBorrar.classList.add("delFrigo");
    li.appendChild(botonBorrar);
    listaFrigo.appendChild(li);
}

function anniadirLista(producto){
    let li = document.createElement("LI");
    li.appendChild(document.createTextNode(`${producto.nombre}:`));
    let botonBorrar = document.createElement("BUTTON");
    botonBorrar.textContent = "Borrar";
    botonBorrar.setAttribute("data-id",producto.id);
    botonBorrar.classList.add("delLista");
    li.appendChild(botonBorrar);
    listaCompra.appendChild(li);
}

function borrar(){
    listaFrigo.addEventListener("click",function(event){
        if(event.target.classList.contains("delFrigo")){
            let li = event.target.parentElement;
            let id = li.getElementsByClassName("delFrigo")[0].dataset.id;
            let nombre = li.textContent.split(":")[0];
            li.remove();
            borrarProductoApi(id,frigoApi);
            anniadirProductoApi({nombre},listaApi)
        }
    })

    listaCompra.addEventListener("click",function(event){
        if(event.target.classList.contains("delLista")){
            let li = event.target.parentElement;
            let id = li.getElementsByClassName("delLista")[0].dataset.id;
            borrarProductoApi(id,listaApi);
            li.remove();
        }
    })
}

enviarListaFrigo();
enviarListaCompra();
cargarInfosApi(listaApi);
cargarInfosApi(frigoApi);
borrar();