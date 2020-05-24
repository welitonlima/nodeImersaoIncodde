const express = require('express');
const app = express();
const port = 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

let users = 
[
    {
        nome: "Henrique",
        email: "henrique@gmail.com",
        senha: "123456"
    },
]

app.get('/buscar/:idEmail', (req, res) => {

    console.log(req.params.idEmail);
    
    let emailJaCadastrado = users.filter(
        (user) => user.email == req.params.idEmail
    )[0];

    if (emailJaCadastrado == undefined)
    {        
        return res.status(400).send({ error: "Usuário não cadastrado." });        
    }
    else
    {
        return res.json(emailJaCadastrado);
    }
});

app.get("/listar", (req, res) =>{
  res.json(users);  
});

app.post("/cadastrar", (req, res)=>{
    //res.json(req.body);

    let emailJaCadastrado = users.filter(
        (user) => user.email == req.body.email
    )[0];

    if (emailJaCadastrado == undefined)
    {
        users.push(req.body);
        return res.status(201).send();
    }
    else
    {
        return res.status(400).send({ error: "Email já cadastrado." });
    }    
});


app.delete("/deletar/:idEmail", (req, res)=> {    

    console.log(req.params.idEmail);
    let deletar;

    let emailJaCadastrado = users.filter(
        (user) => user.email == req.params.idEmail
    )[0];

    if (emailJaCadastrado == undefined)
    {
        return res.status(400).send({ error: "Usuário não cadastrado." });        
    }
    else
    {
        try {
            deletar = users.splice(users.indexOf(req.params.idEmail), 1);
            return res.status(200).send();
        }
        catch (e) {
            return res.status(400).send({ error: "Erro" + e });            
        }       
    } 
    
    //console.log(deletar);
});


app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`));