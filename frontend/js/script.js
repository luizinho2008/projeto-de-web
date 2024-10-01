const checkForm = {
    nome: false,
    email: false,
    telefone: false,
    linkImagem: false
};

document.getElementById("nome").addEventListener("input", function(e) {
    const nome = e.target.value;

    if(nome.length < 3 || nome.length > 50) {
        document.getElementById("erronome").style.display = "block";
        checkForm.nome = false;
    }
    else {
        document.getElementById("erronome").style.display = "none";
        checkForm.nome = true;
    }
    testarBotao();
});

document.getElementById("email").addEventListener("input", function(e) {
    const email = e.target.value;

    if(email.length < 3 || email.length > 50) {
        document.getElementById("erroemail").style.display = "block";
        checkForm.email = false;
    }
    else {
        document.getElementById("erroemail").style.display = "none";
        checkForm.email = true;
    }
    testarBotao();
});

document.getElementById("telefone").addEventListener("input", function(e) {
    const telefone = e.target.value;

    if(telefone.length < 8 || telefone.length > 15) {
        document.getElementById("errotelefone").style.display = "block";
        checkForm.telefone = false;
    }
    else {
        document.getElementById("errotelefone").style.display = "none";
        checkForm.telefone = true;
    }
    testarBotao();
});

const isValidURL = (string) => {
    try {
        new URL(string);
        return true;
    }
    catch(error) {
        return false;
    }
}

document.getElementById('linkImagem').addEventListener('input', function (e) {
    const linkImagem = e.target.value;
    if (!isValidURL(linkImagem)) {
      console.log('Text não é uma link.');
      document.getElementById('errolinkImagem').style.display = 'block';
      checkForm.linkImagem = false;
    }
    else {
      console.log('link válida');
      document.getElementById('errolinkImagem').style.display = 'none';
      checkForm.linkImagem = true;
    }
    testarBotao();
});  

const testarBotao = () => {
    let enviar = true;
    console.log(checkForm);

    Object.keys(checkForm).forEach(key => {
        if(!checkForm[key] == true) {
            enviar = false;
        }
    });

    if(enviar == true) {
        document.getElementById("button").disabled = false;
    }
    else {
        document.getElementById("button").disabled = true;
    }
}