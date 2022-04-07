const express = require('express')
const app = express()
const nodemailer = require('nodemailer')
 
const port = 5000 // Porta em que será rodado o servidor


app.use(express.static('public')) 
app.use(express.json())  

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/home.html') 
}) 


app.post('/', (req, res) => {

// Atualize as informações abaixo. Para testar a aplicação utilize o site: mailtrap.io
    const transporter = nodemailer.createTransport({
        host: "SMTP",
        port: "PORT",
        auth: {
          user: "USERNAME",
          pass: "PASS"
        }
      }) 

      const message = {
        from:  req.body.email,
        to:  "admin@meusite.com",
        replyTo: req.body.email,
        subject: req.body.subject,
        html: `
        <h1> Mensagem! </h1> 
        <ul>
        <li> Nome:  ${req.body.name} </li>
        <li> Assunto: ${req.body.subject}  </li>
        <li> Email: ${req.body.email}  </li>
        <li> Mensagem:  </li> <p>  ${req.body.msg} </p>
        </ul>
        `
    }

    transporter.sendMail(message, (error, info) => {
        if(error) {
            console.log(error)
            res.send("Erro")
        } else {
            console.log("Email enviado com sucesso!")
            res.send("success")
        }
    })
  
}) 

app.listen(port, () => {
    console.log("Servidor está rodando em: localhost:" + port)
})
