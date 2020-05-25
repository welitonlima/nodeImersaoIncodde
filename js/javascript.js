const button = document.querySelector(".btn");

const txtNome = document.querySelector("#txtNome");
const txtEmail = document.querySelector("#txtEmail");
const txtSenha = document.querySelector("#txtSenha");

const urlApiNode = 'http://localhost:5000/';

button.addEventListener("click", (e) => {
    e.preventDefault();   

    validate(); // Validar campos antes de passar req ao servidor
    
    const dadosUsuario = {
        nome: txtNome.value,
        email: txtEmail.value,
        senha: txtSenha.value
    }

    fetch(urlApiNode + "cadastrar", {
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
            location.reload();
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

    fetch(urlApiNode + "listar")
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
            btnDetalhes.innerHTML = `<a onClick="onDetalhes('${usuario.email}')" class="btn">Detalhes</a>`;
            btnDeletar.innerHTML = `<a onClick="onDeletar('${usuario.email}')" class="btnDeletar">Deletar</a>`;
            
        }

    });
}

function onDeletar(email) {
    if (confirm('Confirmação - Deseja mesmo apagar ?')) {
        
        fetch(urlApiNode + "deletar/" + email, {
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

function onDetalhes(email) {
    
    fetch(urlApiNode + "buscar/" + email)
    .then((res) => res.json())
    .then((data) => {
        
        boxDetalhes.style.display = "block";
        let lblNome = document.querySelector("#lblNome");
        let lblEmail = document.querySelector("#lblEmail");

        lblNome.textContent = data.nome;
        lblEmail.textContent = data.email;

    });

}

