const button = document.querySelector(".btn");

const txtNome = document.querySelector("#txtNome");
const txtEmail = document.querySelector("#txtEmail");
const txtSenha = document.querySelector("#txtSenha");

const urlApiNode = 'https://nodecrudmongo.herokuapp.com/users/';

button.addEventListener("click", (e) => {
    e.preventDefault();   

    validate(); // Validar campos antes de passar req ao servidor
    
    const dadosUsuario = {
        nome: txtNome.value,
        email: txtEmail.value,
        senha: txtSenha.value
    }

    fetch(urlApiNode, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"            
        },
        body: JSON.stringify(dadosUsuario),
    })
    .then((response) => {
        if (response.status == 400) {
            alert("Email já cadastrado.");            
        }
        else if (response.status == 201) {
            response.json();
            alert("Criado com sucesso");
            limparCampos();
            location.reload();
        }
        else if (response.status == 404) {
            alert("Usuário não foi cadastrado.");
        }
        
    });

});

function validate() {
    isValid = true;

    if (document.querySelector("#txtNome").value == "") {
        isValid = false;
        alert("Preencha o nome!");
    }
    else if (document.querySelector("#txtEmail").value == "") {
        isValid = false;
        alert("Preencha o email!");
    }
    else if (document.querySelector("#txtSenha").value == "") {
        isValid = false;
        alert("Preencha a senha!");
    }           

    return isValid;
}

listarTodosUsuarios();

function listarTodosUsuarios (){

    //console.log("listarTodosUsuarios");

    fetch(urlApiNode )
    .then((res) => res.json())
    .then((data) => {
        
        //console.log(data);

        let tbody = document.querySelector("#gvusuarios tbody");

        for (let usuario of data) {
            const row = tbody.insertRow();
            const Nome = row.insertCell();
            const Email = row.insertCell();
            //const Senha = row.insertCell();

            const btnDeletar = row.insertCell();
            const btnDetalhes = row.insertCell();

            Nome.innerHTML = usuario.nome;
            Email.innerHTML = usuario.email;
            //Senha.innerHTML = usuario.senha;            
            btnDetalhes.innerHTML = `<a onClick="onDetalhes('${usuario._id}')" class="btn">Detalhes</a>`;
            btnDeletar.innerHTML = `<a onClick="onDeletar('${usuario._id}')" class="btnDeletar">Deletar</a>`;
            
        }

    });
}


function listarTodosUsuariosOrdenado(campo, crescente){

    fetch(urlApiNode + campo + "/" + crescente )
    .then((res) => res.json())
    .then((data) => {
        
        //console.log(data);

        let tbody = document.querySelector("#gvusuarios tbody");
        tbody.innerHTML = "";

        for (let usuario of data) {
            const row = tbody.insertRow();
            const Nome = row.insertCell();
            const Email = row.insertCell();
            //const Senha = row.insertCell();

            const btnDeletar = row.insertCell();
            const btnDetalhes = row.insertCell();

            Nome.innerHTML = usuario.nome;
            Email.innerHTML = usuario.email;
            //Senha.innerHTML = usuario.senha;
            btnDetalhes.innerHTML = `<a onClick="onDetalhes('${usuario._id}')" class="btn">Detalhes</a>`;
            btnDeletar.innerHTML = `<a onClick="onDeletar('${usuario._id}')" class="btnDeletar">Deletar</a>`;
            
        }

    });
}

function onDeletar(_id) {
    if (confirm('Confirmação - Deseja mesmo apagar ?')) {
        
        fetch(urlApiNode + _id, {
            method: "DELETE"
        })
        .then((response) => {
            if (response.status == 400) {
                alert("Usuário não cadastrado.");            
            }
            else if (response.status == 200) {
                response.json();
                alert("Deletado com sucesso");
                location.reload();
            }            
        });        
    }
}

let boxDetalhes = document.querySelector(".boxDetalhes");
boxDetalhes.style.display = "none";

function onDetalhes(_id) {
    
    fetch(urlApiNode + _id)
    .then((res) => res.json())
    .then((data) => {
        
        boxDetalhes.style.display = "block";
        let lblNome = document.querySelector("#lblNome");
        let lblEmail = document.querySelector("#lblEmail");

        lblNome.textContent = data.nome;
        lblEmail.textContent = data.email;

    });
}

function limparCampos() {
    
    document.querySelector("#txtNome").value = "";
    document.querySelector("#txtEmail").value = ""; 
    
}

