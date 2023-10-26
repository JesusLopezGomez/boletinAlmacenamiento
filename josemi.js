const fridge = document.getElementById("fridgeList");
const products = document.getElementById("productList");

const addFridgeButton = document.getElementById("addFridge");
const delFridgeButton = document.getElementById("delFridge");

const addListButton = document.getElementById("addList");
const delListButton = document.getElementById("delList");

// Cuando pulsemos el boton de a;adir del frigorifico, metemos en la API el producto
addFridgeButton.addEventListener("click", ()=>{
    // Comprobamos que el campo tenga informacion
    if(document.getElementById("product").value){
        // Si tiene, creamos el producto
        product = {name: document.getElementById("product").value,
                         cant: 1};

        searchProductAPI(product, "fridge");

    }else alert("Introduzca producto")
})

// Cuando pulsemos el boton de a;adir del frigorifico, metemos en la API el producto
addListButton.addEventListener("click", ()=>{
    // Comprobamos que el campo tenga informacion
    if(document.getElementById("productListText").value){
        // Si tiene, creamos el producto
        product = {name: document.getElementById("productListText").value,
                         cant: 1};

        searchProductAPI(product, "shoplist");

    }else alert("Introduzca producto")
})

function searchProductAPI(product, type) {
    const request = new XMLHttpRequest();
    if(type=="fridgeDel"){
        product={name: product}
        request.open("GET", "http://localhost:3000/fridge?name=" + product.name);
    }else if(type=="listDel"){
        product={name: product}
        request.open("GET", "http://localhost:3000/shoplist?name=" + product.name);
    }else{
        request.open("GET", "http://localhost:3000/"+type+"?name=" + product.name);

    }
    request.send();

    request.addEventListener("load", () => {
        if (request.status == 200) {
           if(type=="fridge") {
               const productFinded = JSON.parse(request.responseText)[0];
                if(JSON.parse(request.responseText).length==0){
                    addToAPI(product, "fridge");
                }else{
                    updateCant(productFinded);

                }
            }else if(type=="shoplist"){
                addToAPI(product, "shoplist")
            }else if(type=="listDel"){
                const productFinded = JSON.parse(request.responseText)[0];
                listDel(productFinded);
            }else if(type=="fridgeDel"){

                const productFinded = JSON.parse(request.responseText)[0];

                fridgeDel(productFinded);

            }
        } else console.log("Ese producto ya esta en el frigorifico");
    });
}

function updateCant(productFinded) {
    const request = new XMLHttpRequest();
    request.open("PUT", "http://localhost:3000/fridge/" + productFinded.id);
    request.setRequestHeader("Content-Type", "application/json");
    const body = { name: productFinded.name, cant: productFinded.cant + 1 };
    request.send(JSON.stringify(body));

    request.addEventListener("click", () => {
        if (request.status >= 200 && request.status < 300) {
            console.log("Aumentado con exito");
        }
    });
}

function fridgeDel(productFinded) {
    const request = new XMLHttpRequest();

    request.open("DELETE", "http://localhost:3000/fridge/" + productFinded.id);
    request.send();

    request.addEventListener("load", () => {
        if (request.status >= 200 && request.status < 300) {
            searchProductAPI(productFinded, "shoplist");
        } else { console.log("Algo ha ido mal"); };
    });
    return request;
}

function listDel(productFinded) {
    const request = new XMLHttpRequest();

    request.open("DELETE", "http://localhost:3000/shoplist/" + productFinded.id);
    request.send();

    request.addEventListener("load", () => {
        if (request.status >= 200 && request.status < 300) {
           console.log("Borrado de la lista")
        } else { console.log("Algo ha ido mal"); };
    });
    return request;
}
function addToAPI(product, list) {
    const request = new XMLHttpRequest();

    request.open("POST", "http://localhost:3000/"+list);
    request.setRequestHeader("Content-Type", "application/json");

    request.send(JSON.stringify(product));

    request.addEventListener("load", () => {
        if (request.status != 201) console.log("Ha ocurrido un error");

    });
}


function consumeAPI(type){
    const request = new XMLHttpRequest();

    request.open("GET", "http://localhost:3000/"+type);
    request.send();

    request.addEventListener("load", ()=>{
        if(request.status==200){
            const productsList = JSON.parse(request.responseText);
            if(type=="fridge"){
                productsList.forEach(product => {
                    const li = document.createElement("LI");
                    li.textContent = `Nombre: ${product.name} Cantidad: ${product.cant}`;
                    fridge.appendChild(li);
                });
            }else if(type=="shoplist"){
                productsList.forEach(product => {
                    const li = document.createElement("LI");
                    li.textContent = `Nombre: ${product.name} Cantidad: ${product.cant}`;
                    products.appendChild(li);
                });
            }
        }
    })
}
consumeAPI("fridge");
consumeAPI("shoplist");
