let currentStep = 1;

function updateProgressIndicator() {
  for (let i = 1; i <= 3; i++) {
    const circle = document.getElementById(`circle${i}`);
    const stepNumber = circle.querySelector('.step-number');
    if (i === currentStep) {
      circle.style.backgroundColor = '#375A88';
      stepNumber.style.display = 'block';
    } else {
      circle.style.backgroundColor = 'white';
      stepNumber.style.display = 'none';
    }
  }
}

function nextStep() {
  if (validateStep(currentStep)) {
    document.getElementById(`step${currentStep}`).classList.remove('active');
    currentStep++;
    document.getElementById(`step${currentStep}`).classList.add('active');
    updateProgressIndicator();
  }
}

function prevStep() {
  if(currentStep === 1){
    window.location.href = "./index.html";
}
  document.getElementById(`step${currentStep}`).classList.remove('active');
  currentStep--;
  document.getElementById(`step${currentStep}`).classList.add('active');
  updateProgressIndicator();
}

function validateStep(step) {
  let isValid = true;

  if (step === 1) {
    const nome = document.getElementById('nome').value.trim();
    const cpf = document.getElementById('cpf').value.trim();
    const telefone = document.getElementById('telefone').value.trim();

    if (nome === '') {
      document.getElementById('nomeError').textContent = 'Por favor, insira seu nome.';
      document.getElementById('nome').classList.add('invalid-input');
      isValid = false;
    } else {
      document.getElementById('nomeError').textContent = '';
      document.getElementById('nome').classList.remove('invalid-input');
    }

    if (cpf === '') {
      document.getElementById('cpfError').textContent = 'Por favor, insira seu cpf.';
      document.getElementById('cpf').classList.add('invalid-input');
      isValid = false;
    } else if (!/^\d{11}$/.test(cpf)) {
      document.getElementById('cpfError').textContent = 'cpf inválido, deve conter 11 números.';
      document.getElementById('cpf').classList.add('invalid-input');
      isValid = false;
    } else {
      document.getElementById('cpfError').textContent = '';
      document.getElementById('cpf').classList.remove('invalid-input');
    }

    if (telefone === '') {
      document.getElementById('telefoneError').textContent = 'Por favor, insira seu telefone.';
      document.getElementById('telefone').classList.add('invalid-input');
      isValid = false;
    } else if (!/^\d{10,11}$/.test(telefone)) {
      document.getElementById('telefoneError').textContent = 'Telefone inválido, deve conter entre 10 e 11 números.';
      document.getElementById('telefone').classList.add('invalid-input');
      isValid = false;
    } else {
      document.getElementById('telefoneError').textContent = '';
      document.getElementById('telefone').classList.remove('invalid-input');
    }
  } else if (step === 2) {

    const cep = document.getElementById('cep').value.trim();
    const rua = document.getElementById('rua').value.trim();
    const numero = document.getElementById('numero').value.trim();
    const bairro = document.getElementById('bairro').value.trim();
    const cidade = document.getElementById('cidade').value.trim();
    // const complemento = document.getElementById('complemento').value.trim();

    if (cep === '') {
      document.getElementById('cepError').textContent = 'Por favor, insira seu cep.';
      document.getElementById('cep').classList.add('invalid-input');
      isValid = false;
    } else if (!/^\d{8}$/.test(cep)) {
      document.getElementById('cepError').textContent = 'cep inválido, deve conter 8 números.';
      document.getElementById('cep').classList.add('invalid-input');
      isValid = false;
    } else {
      document.getElementById('cepError').textContent = '';
      document.getElementById('cep').classList.remove('invalid-input');
    }

    if (rua === '') {
      document.getElementById('ruaError').textContent = 'Por favor, insira seu rua.';
      document.getElementById('rua').classList.add('invalid-input');
      isValid = false;
    } else {
      document.getElementById('ruaError').textContent = '';
      document.getElementById('rua').classList.remove('invalid-input');
    }

    if (numero === '') {
      document.getElementById('numeroError').textContent = 'Por favor, insira seu numero.';
      document.getElementById('numero').classList.add('invalid-input');
      isValid = false;
    } else {
      document.getElementById('numeroError').textContent = '';
      document.getElementById('numero').classList.remove('invalid-input');
    }
 
    if (bairro === '') {
      document.getElementById('bairroError').textContent = 'Por favor, insira seu bairro.';
      document.getElementById('bairro').classList.add('invalid-input');
      isValid = false;
    }  else {
      document.getElementById('bairroError').textContent = '';
      document.getElementById('bairro').classList.remove('invalid-input');
    }

    if (cidade === '') {
      document.getElementById('cidadeError').textContent = 'Por favor, insira seu cidade.';
      document.getElementById('cidade').classList.add('invalid-input');
      isValid = false;
    } else {
      document.getElementById('cidadeError').textContent = '';
      document.getElementById('cidade').classList.remove('invalid-input');
    }

    // if (complemento === '') {
    //   document.getElementById('complementoError').textContent = 'Por favor, insira seu complemento.';
    //   document.getElementById('complemento').classList.add('invalid-input');
    //   isValid = false;
    // } else {
    //   document.getElementById('complementoError').textContent = '';
    //   document.getElementById('complemento').classList.remove('invalid-input');
    // }
    
   
  } else if (step === 3) {
    const email = document.getElementById('email').value.trim();
    const senha = document.getElementById('senha').value.trim();
    const confirmarSenha = document.getElementById('confirmarSenha').value.trim();

    if (email === '') {
      document.getElementById('emailError').textContent = 'Por favor, insira seu email.';
      document.getElementById('email').classList.add('invalid-input');
      isValid = false;
    } else {
      document.getElementById('nomeError').textContent = '';
      document.getElementById('email').classList.remove('invalid-input');
    }

    if (senha === '') {
      document.getElementById('senhaError').textContent = 'Por favor, insira seu senha.';
      document.getElementById('senha').classList.add('invalid-input');
      isValid = false;
    } else {
      document.getElementById('senhaError').textContent = '';
      document.getElementById('senha').classList.remove('invalid-input');
    }

    if (confirmarSenha === '') {
      document.getElementById('confirmarSenhaError').textContent = 'Por favor, insira seu confirmarSenha.';
      document.getElementById('confirmarSenha').classList.add('invalid-input');
      isValid = false;
    } else {
      document.getElementById('confirmarSenhaError').textContent = '';
      document.getElementById('confirmarSenha').classList.remove('invalid-input');
    }
  }

  return isValid;
}

document.addEventListener('DOMContentLoaded', function () {
  document.getElementById('signupForm').addEventListener('submit', function (event) {
    event.preventDefault();
    cadastrarDoador();
  });

  const inputs = document.querySelectorAll('input');

inputs.forEach(input => {
    input.addEventListener('input', () => {
        input.classList.remove('invalid-input');
        const errorId = input.id + 'Error';
        const errorElement = document.getElementById(errorId);
        if (errorElement) {
            errorElement.textContent = '';
        }
    });
});
});


