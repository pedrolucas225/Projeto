const http = require('http')
const path = require('path')

const express = require('express')
const fs = require("fs");
var session = require('express-session')

const app = express()
const server = http.createServer(app)



app.use(express.json());
app.use(express.urlencoded());
app.use(session({secret:"abc"}));

    // configurações
    app.set('port', process.env.PORT || 3000)


// secção de login

app.use('/projeto/*', (req, res, next) => {
    if(req.session.nome){
        next();
    }else{
        req.redirect('/index.html')
    }
});

app.use(express.static(path.join(__dirname, 'public')))

//start do server
server.listen(app.get('port'), () => {
    console.log('server na porta', app.get('port'))


})

//login 

app.post('/label-float' , (req,res) => {
    const usuarioscad = fs.readFileSync('./usuarios.json')
    const usuariosparse = JSON.parse(usuarioscad)

    var name = req.body.nomes
    var senha = req.body.senha

    for(var umUsuario of usuariosparse) {
        if(nome == umUsuario.nome && senha == umUsuario.senha){
            req.session.nome == umUsuario
            res.send('conectado')
            return
        }
    }
    res.send('falhou')
})