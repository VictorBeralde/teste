function cadastrarDoador() {
    const nome = document.getElementById('nome').value;
    const cpf = document.getElementById('cpf').value;
    const email = document.getElementById('email').value;
    const senha = document.getElementById('senha').value;
    const cep = document.getElementById('cep').value;
    const numero = document.getElementById('numero').value;
    const logradouro = document.getElementById('rua').value;
    const telefone = document.getElementById('telefone').value;
    const complemento = document.getElementById('complemento').value;

    var doadorData = {
        nome: nome,
        cpf: cpf,
        email: email,
        senha: senha,
        cep: cep,
        numero: numero,
        logradouro: logradouro,
        complemento: complemento,
        telefone: telefone
    }

    var options = {
        method: 'POST',
        url: 'http://localhost:8080/donor',
        headers: { 'Content-Type': 'application/json' },
        data: doadorData
    };

    axios.request(options).then(function (response) {
          window.location.href = "./index.html";

            }).catch(function (error) {
        alert(error.response.data);
        switch (error.response.data) {
            case "CPF já cadastrado":
                prevStep()
                prevStep()
                document.getElementById('cpf').classList.add('invalid-input');
                document.getElementById('cpf').value = "";
                document.getElementById('cpfError').innerHTML = "CPF já cadastrado";
                break;
            case "Email já cadastrado":
                document.getElementById('email').classList.add('invalid-input');
                document.getElementById('email').value = "";
                document.getElementById('emailError').innerHTML = "Email já cadastrado";
                break;
            case "Telefone já cadastrado":
                document.getElementById('telefone').classList.add('invalid-input');
                document.getElementById('telefone').value = "";
                document.getElementById('telefoneError').innerHTML = "Telefone já cadastrado";
                break;
            case "CPF Inválido":
                prevStep()
                prevStep()
                document.getElementById('cpf').classList.add('invalid-input');
                document.getElementById('cpf').value = "";
                document.getElementById('cpfError').innerHTML = "CPF inválido";
                break;
        }
    });
}

function cadastrarONG() {
    const razao = document.getElementById('razao').value.trim();
    const cnpj = document.getElementById('cnpj').value.trim();
    const telefone = document.getElementById('telefone').value.trim();
    const cep = document.getElementById('cep').value.trim();
    const rua = document.getElementById('rua').value.trim();
    const numero = document.getElementById('numero').value.trim();
    const complemento = document.getElementById('complemento').value.trim();
    const email = document.getElementById('email').value.trim();
    const senha = document.getElementById('senha').value.trim();
    const confirmarSenha = document.getElementById('confirmarSenha').value.trim();

    telefones = [telefone];

    const ongData = {
        razao: razao,
        cnpj: cnpj,
        email: email,
        senha: senha,
        cep: cep,
        numero: numero,
        logradouro: rua,
        complemento: complemento,
        telefones: telefone,
    };

    const options = {
        method: 'POST',
        url: 'http://localhost:8080/ong',
        headers: { 'Content-Type': 'application/json' },
        data: ongData
    };

     axios.request(options).then(function (response) {
          window.location.href = "./index.html";
          
    }).catch(function (error) {
        alert(error.response.data);
        switch (error.response.data) {
            case "CPF já cadastrado":
                prevStep()
                prevStep()
                document.getElementById('cpf').classList.add('invalid-input');
                document.getElementById('cpf').value = "";
                document.getElementById('cpfError').innerHTML = "CPF já cadastrado";
                break;
            case "Email já cadastrado":
                document.getElementById('email').classList.add('invalid-input');
                document.getElementById('email').value = "";
                document.getElementById('emailError').innerHTML = "Email já cadastrado";
                break;
            case "Telefone já cadastrado":
                document.getElementById('telefone').classList.add('invalid-input');
                document.getElementById('telefone').value = "";
                document.getElementById('telefoneError').innerHTML = "Telefone já cadastrado";
                break;
            case "CPF Inválido":
                prevStep()
                prevStep()
                document.getElementById('cpf').classList.add('invalid-input');
                document.getElementById('cpf').value = "";
                document.getElementById('cpfError').innerHTML = "CPF inválido";
                break;
        }
    });
}

