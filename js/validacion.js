const formulario = document.getElementById("formulario");document

const mail = document.getElementById("email")
const pass = document.getElementById("password")
const form = document.getElementById("form")
const text = document.getElementById("warnings")

form.addEventListener("submit", e=>{
    e.preventDefault()
    let warnings = ""
    let entrar = false
    let regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    parrafo.innerHTML = ""
    if(!regexEmail.test(mail.value)){
        warnings += `la dirección de correo electrónico no es válida<br>`
        entrar = true
}
if(pass.value.length < 8){
    warnings += `la contraseña no es válida<br>`
    entrar = true
    alert("la contraseña no es válida")
}if(entrar){
    parrafo.innerHTML = warnings
}else{
    parrafo.innerHTML = ingresar
}
})



