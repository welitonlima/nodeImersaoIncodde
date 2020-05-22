const button = document.querySelector(".btn");
const buttonLivro = document.querySelector(".btnLivro");

var linhaSelecionada = null;

button.addEventListener("click", (e) => {
    e.preventDefault();    
    //console.log("asds ");    

    if (validate("usuario")) {
        let dados = getDados("usuario");
        //console.log(dados);

        if (linhaSelecionada == null)
            insertUsuario(dados);
        else
            update("usuario",dados);
        
        limpar("usuario");
    }

});

buttonLivro.addEventListener("click", (e) => {
    e.preventDefault();

    if (validate("livro")) {
        let dados = getDados("livro");

        if (linhaSelecionada == null)
            insertLivro(dados);
        else
            update("livro",dados);
        
        limpar("livro");
    }

});

function limpar(tabela) {
    if(tabela == "usuario"){
        document.querySelector("#txtNome").value = "";
        document.querySelector("#txtEmail").value = "";
    }
    else{
        document.querySelector("#txtNomeLivro").value = "";
        document.querySelector("#txtAutor").value = "";
    }
    
    linhaSelecionada = null;
}

function onDeletar(tabela,td) {
    if (confirm('Confirmação - Deseja mesmo apagar ?')) {
        row = td.parentElement.parentElement;
        
        document.querySelector(`#gv${tabela}s`).deleteRow(row.rowIndex);
        limpar();
    }
}

function update(tabela,dado) {   
    if(tabela == "usuario"){
        linhaSelecionada.cells[1].innerHTML = dado.txtNome;
        linhaSelecionada.cells[2].innerHTML = dado.txtEmail;
    }
    else{
        linhaSelecionada.cells[1].innerHTML = dado.txtNomeLivro;
        linhaSelecionada.cells[2].innerHTML = dado.txtAutor;
    }    
}

function onEditar(tabela,td) {
    linhaSelecionada = td.parentElement.parentElement;
    
    if(tabela == "usuario"){
        document.querySelector("#txtNome").value = linhaSelecionada.cells[1].innerHTML;
        document.querySelector("#txtEmail").value = linhaSelecionada.cells[2].innerHTML;
    }
    else{
        document.querySelector("#txtNomeLivro").value = linhaSelecionada.cells[1].innerHTML;
        document.querySelector("#txtAutor").value = linhaSelecionada.cells[2].innerHTML;
    }    
}

function insertUsuario(dado) {
    let tabela = document.querySelector("#gvusuarios tbody");
    let novalinha = tabela.insertRow(tabela.length);
    let ID = document.querySelector("#gvusuarios").rows.length - 1;
    
    cell1 = novalinha.insertCell(0);
    cell1.innerHTML = ID;
    cell2 = novalinha.insertCell(1);
    cell2.innerHTML = dado.txtNome;
    cell3 = novalinha.insertCell(2);
    cell3.innerHTML = dado.txtEmail;
    
    cell4 = novalinha.insertCell(3);
    cell4.innerHTML = `<a onClick="onEditar('usuario',this)" class="btn">Editar</a>
                       <a onClick="onDeletar('usuario',this)" class="btnDeletar">Deletar</a>`;

}

function insertLivro(dado) {
    let tabela = document.querySelector("#gvlivros tbody");
    let novalinha = tabela.insertRow(tabela.length);
    let ID = document.querySelector("#gvlivros").rows.length - 1;
    
    cell1 = novalinha.insertCell(0);
    cell1.innerHTML = ID;
    cell2 = novalinha.insertCell(1);
    cell2.innerHTML = dado.txtNomeLivro;
    cell3 = novalinha.insertCell(2);
    cell3.innerHTML = dado.txtAutor;
    
    cell4 = novalinha.insertCell(3);
    cell4.innerHTML = `<a onClick="onEditar('livro',this)" class="btn">Editar</a>
                       <a onClick="onDeletar('livro',this)" class="btnDeletar">Deletar</a>`;

}

function getDados(tabela) {
    let dados = {};

    if(tabela == "usuario"){
        dados["txtNome"] = document.querySelector("#txtNome").value;
        dados["txtEmail"] = document.querySelector("#txtEmail").value;
    }
    else{
        dados["txtNomeLivro"] = document.querySelector("#txtNomeLivro").value;
        dados["txtAutor"] = document.querySelector("#txtAutor").value;
    }
    
    return dados;
}

function validate(tabela) {
    isValid = true;

    if(tabela == "usuario"){
        if (document.querySelector("#txtNome").value == "") {
            isValid = false;
            alert("Preencha o nome!");
        }
        else if (document.querySelector("#txtEmail").value == "") {
            isValid = false;
            alert("Preencha o email!");
        }
    }
    else
    {
        if (document.querySelector("#txtNomeLivro").value == "") {
            isValid = false;
            alert("Preencha o nome do livro!");
        }
        else if (document.querySelector("#txtAutor").value == "") {
            isValid = false;
            alert("Preencha o nome do Autor!");
        }
    }    

    return isValid;
}