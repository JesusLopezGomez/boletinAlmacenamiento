document.addEventListener("DOMContentLoaded", function () {
    const userForm = document.getElementById("userForm");
    const userList = document.getElementById("userList");
    let usersData = [];
    const urlApi = "http://localhost:3000/users";
    

    function getUsersApi(){
        const peticion = new XMLHttpRequest();

        peticion.open('GET',urlApi);
        peticion.setRequestHeader('Content-type', 'application/json');
        peticion.send();

        peticion.addEventListener("load",function(){
            if(peticion.status == 200){
                let usersData = JSON.parse(peticion.responseText);
                usersData.forEach((user) => {
                    addUserToList(user.nombre,user.direccion,user.email,user.id);
                })
            }
        })
    }

    function addUserApi(user){
        const peticion = new XMLHttpRequest();
        peticion.withCredentials = true;
        peticion.open('POST',urlApi);
        peticion.setRequestHeader("Content-type", "application/json");
        peticion.addEventListener("load",function(){
            if(peticion.status == 201){
                    let newUser = JSON.parse(peticion.responseText);
                    addUserToList(newUser.nombre,newUser.direccion,newUser.email,newUser.id);
                }
            });
        peticion.send(JSON.stringify(user));

    }

    function deleteUserApi(id){
        const peticion = new XMLHttpRequest();
        peticion.open('DELETE',urlApi + "/" + id);
        peticion.setRequestHeader('Content-type', 'application/json');
        peticion.send();
    }
    
    getUsersApi();

    // Función para validar email
    function validateEmail(email) {
        const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        return regex.test(email);
    }

    // Función para crear el nuevo item de la lista
    function createListItem(name, address, email,id) {
       
        // Crea nuevos elementos
        const listItem = document.createElement("li");
        const userInfo = document.createTextNode(`${name} : ${address} : ${email} : `);
        const editButton = document.createElement("button");
        const deleteButton = document.createElement("button");

        // Establece atributos y contenido para los botones
        editButton.classList.add("edit");
        deleteButton.classList.add("delete");
        editButton.textContent = "Editar";
        deleteButton.textContent = "Borrar";
        
        deleteButton.setAttribute("data-id",id);
        editButton.setAttribute("data-id",id);
        // Agrega los elementos al elemento <li>
        listItem.appendChild(userInfo);
        listItem.appendChild(editButton);
        listItem.appendChild(deleteButton);

    return listItem;
  }

    // Función para agregar un usuario a la lista
    function addUserToList(name, address, email,id) {
        const listItem = createListItem(name, address, email,id);
        userList.appendChild(listItem);
    }
    // Función para borrar un usuario de la lista y del localStorage
    function deleteUser(event) {
        if (event.target.classList.contains("delete")) {
            const listItem = event.target.parentElement;
            deleteUserApi(listItem.getElementsByClassName("delete")[0].dataset.id);
            listItem.remove();
        }
    }

    // Función para cargar los datos de un usuario en el formulario para editar
    function editUser(event) {
        if (event.target.classList.contains("edit")) {
            const listItem = event.target.parentElement;
            const userArray = listItem.textContent.split(" : ");
            const name = userArray[0];
            const address = userArray[1];
            const email = userArray[2].trim();
            userForm.elements.name.value = name;
            userForm.elements.address.value = address;
            userForm.elements.email.value = email;
            userForm.dataset.editing = email;
            userForm.querySelector("button[type='submit']").textContent = "Editar Usuario";
            //userForm.dataset.editingListItem = listItem; // Almacena el elemento de lista a editar
            userForm.dataset.editingIndex = [...userList.children].indexOf(listItem); // Almacena el índice del elemento en la lista
        }
    }

    // Manejar el envío del formulario (Agregar o Editar usuario)
    userForm.addEventListener("submit", function (event) {
        event.preventDefault();
        const name = userForm.elements.name.value;
        const address = userForm.elements.address.value;
        const email = userForm.elements.email.value;
        const editingIndex = parseInt(userForm.dataset.editingIndex);
        if (name && address && validateEmail(email)) {
            const listItem = createListItem(name, address, email);
            if(userForm.dataset.editing) {
                const emailToEdit = userForm.dataset.editing;
                usersData = usersData.map(user => {
                    if (user.email === emailToEdit) {
                        user.name = name;
                        user.address = address;
                        user.email = email;
                    }
                    return user;
                });

                // Reemplaza el elemento existente en el índice con el nuevo elemento

                userList.replaceChild(listItem, userList.children[editingIndex]);
                userForm.removeAttribute("data-editing");
                userForm.querySelector("button[type='submit']").textContent = "Agregar Usuario";
                
            } else {
                if(usersData)
                if (usersData.some(user => user.email === email)) {
                    alert('El email especificado ya existe en la lista');
                    return;
                }
            }
            const user = {"nombre":name, "direccion":address, "email":email}
            addUserApi(user);
            userForm.reset();
        } else {
            alert('Alguno de los campos no es correcto');
        }
    });

    // Manejar clics en botones de borrar y editar
    userList.addEventListener("click", function (event) {
        deleteUser(event);
        editUser(event);
    });

    // Cargar usuarios almacenados en localStorage al cargar la página
});