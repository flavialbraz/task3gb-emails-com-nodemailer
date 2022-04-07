const formcontact = document.getElementById("formcontact")
const nameform = document.getElementById("name")
const email = document.getElementById("email")
const subject = document.getElementById("subject")
const msg = document.getElementById("msg")



formcontact.addEventListener('submit', (ev) => {
    ev.preventDefault()

    let formData = {
        name: nameform.value,
        email: email.value,
        subject:subject.value,
        msg: msg.value,
        
    }
  
    let xhr = new XMLHttpRequest()
    xhr.open('POST', '/')
    xhr.setRequestHeader('content-type', 'application/json')
    xhr.onload = function () {
        console.log(xhr.responseText)

        if(xhr.responseText == 'success') {
            alert("Email enviado")
            formcontact.reset()
        } else {
            alert("Não foi possível enviar o formulário. Tente novamente")
            console.log("Algo de errado aconteceu. Verifique se o smtp no arquivo -server.js-, a partir da linha 9 está configurado corretamente")
        }
    }

    xhr.send(JSON.stringify(formData))
})