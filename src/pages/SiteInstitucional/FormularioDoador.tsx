import { useEffect, useState } from "react";
import './css/styleFormulario.css';
import { useClient } from "../../hooks/use-client";
import { useNavigate } from "react-router-dom";
import { enqueueSnackbar } from "notistack";

interface ErrorResponse {
    response: {
        data: {
            message: string[];
        };
    };
}

export function FormularioDoador() {
    const [currentStep, setCurrentStep] = useState<number>(1);
    const [nome, setNome] = useState<string>('');
    const [nomeError, setNomeError] = useState<string>('');
    const [cpf, setCpf] = useState<string>('');
    const [cpfError, setCpfError] = useState<string>('');
    const [telefone, setTelefone] = useState<string>('');
    const [telefoneError, setTelefoneError] = useState<string>('');
    const [cep, setCep] = useState<string>('');
    const [cepError, setCepError] = useState<string>('');
    const [logradouro, setLogradouro] = useState<string>('');
    const [logradouroError, setLogradouroError] = useState<string>('');
    const [estado, setEstado] = useState<string>('');
    const [numero, setNumero] = useState<string>('');
    const [numeroError, setNumeroError] = useState<string>('');
    const [bairro, setBairro] = useState<string>('');
    const [bairroError, setBairroError] = useState<string>('');
    const [cidade, setCidade] = useState<string>('');
    const [cidadeError, setCidadeError] = useState<string>('');
    const [complemento, setComplemento] = useState<string>('');
    const [complementoError] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [emailError, setEmailError] = useState<string>('');
    const [senha, setSenha] = useState<string>('');
    const [senhaError, setSenhaError] = useState<string>('');
    const [confirmarSenha, setConfirmarSenha] = useState<string>('');
    const [confirmarSenhaError, setConfirmarSenhaError] = useState<string>('');
    const navigate = useNavigate();

    const client = useClient();

    useEffect(() => {
        updateProgressIndicator();
    }, [currentStep]);

    const updateProgressIndicator = () => {
        for (let i = 1; i <= 3; i++) {
            const circle = document.getElementById(`circle${i}`) as HTMLElement;
            const stepNumber = circle.querySelector('.step-number') as HTMLElement;
            if (i === currentStep) {
                circle.style.backgroundColor = '#375A88';
                stepNumber.style.display = 'block';
            } else {
                circle.style.backgroundColor = 'white';
                stepNumber.style.display = 'none';
            }
        }
    };

    const fetchAddress = async (value: string) => {
        try {
            const response = await fetch(`https://viacep.com.br/ws/${value}/json/`);
            if (!response.ok) {
                throw new Error('CEP não encontrado.');
            }
            const data = await response.json();
            setLogradouro(data.logradouro);
            setBairro(data.bairro);
            setCidade(data.localidade);
            setEstado(data.uf);
        } catch (error) {
            setCepError('CEP não encontrado.');
        }
    };

    const handleCepChange = async (value: string) => {
        await setCep(value)

        if (value.length === 8) {
            fetchAddress(value);
        } else {
            setLogradouro('');
            setBairro('');
            setCidade('');
            setEstado('');
        }
    };
    


    const nextStep = () => {
        if (validateStep(currentStep)) {
            setCurrentStep(currentStep + 1);
        }
    };

    const prevStep = () => {
        if (currentStep === 1) {
            window.location.href = "/cadastrar";
        } else {
            setCurrentStep(currentStep - 1);
        }
    };

    const validateStep = (step: number): boolean => {
        let isValid = true;

        if (step === 1) {
            if (!nome) {
                setNomeError('Por favor, insira seu nome.');
                isValid = false;
            } else {
                setNomeError('');
            }

            if (!cpf) {
                setCpfError('Por favor, insira seu CPF.');
                isValid = false;
            } else if (!/^\d{11}$/.test(cpf)) {
                setCpfError('CPF inválido, deve conter 11 números.');
                isValid = false;
            } else {
                setCpfError('');
            }

            if (!telefone) {
                setTelefoneError('Por favor, insira seu telefone.');
                isValid = false;
            } else if (!/^\d{10,11}$/.test(telefone)) {
                setTelefoneError('Telefone inválido, deve conter entre 10 e 11 números.');
                isValid = false;
            } else {
                setTelefoneError('');
            }
        } else if (step === 2) {
            if (!cep) {
                setCepError('Por favor, insira seu CEP.');
                isValid = false;
            } else if (!/^\d{8}$/.test(cep)) {
                setCepError('CEP inválido, deve conter 8 números.');
                isValid = false;
            } else {
                setCepError('');
            }

            if (!logradouro) {
                setLogradouroError('Por favor, insira sua rua.');
                isValid = false;
            } else {
                setLogradouroError('');
            }

            if (!numero) {
                setNumeroError('Por favor, insira seu número.');
                isValid = false;
            } else {
                setNumeroError('');
            }

            if (!bairro) {
                setBairroError('Por favor, insira seu bairro.');
                isValid = false;
            } else {
                setBairroError('');
            }

            if (!cidade) {
                setCidadeError('Por favor, insira sua cidade.');
                isValid = false;
            } else {
                setCidadeError('');
            }
        } else if (step === 3) {
            if (!email) {
                setEmailError('Por favor, insira seu email.');
                isValid = false;
            } else {
                setEmailError('');
            }

            if (!senha) {
                setSenhaError('Por favor, insira sua senha.');
                isValid = false;
            } else {
                setSenhaError('');
            }

            if (!confirmarSenha) {
                setConfirmarSenhaError('Por favor, confirme sua senha.');
                isValid = false;
            } else if (confirmarSenha !== senha) {
                setConfirmarSenhaError('As senhas não coincidem.');
                isValid = false;
            } else {
                setConfirmarSenhaError('');
            }
        }

        return isValid;
    };

    const processErrors = (messages: string[]) => {
        messages.forEach((message) => {
            if (message.includes('CPF já cadastrado')) {
                setCpfError(message);
                enqueueSnackbar('CPF já cadastrado.', { variant: 'error' });
                setCurrentStep(1);
            } else if (message.includes('CPF inválido')) {
                setCpfError(message);
                enqueueSnackbar('CPF inválido.', { variant: 'error' });
                setCurrentStep(1);
            } else if (message.includes('Email já cadastrado')) {
                setCurrentStep(3);
                setEmailError(message);
                enqueueSnackbar('Email já cadastrado.', { variant: 'error' });
            } else if (message.includes('Email inválido')) {
                setEmailError(message)
                setCurrentStep(3)
                enqueueSnackbar('Email inválido', { variant: 'error' })
            } else if (message.includes('Telefone já cadastrado')) {
                setCurrentStep(1);
                setTelefoneError(message);
                enqueueSnackbar('Telefone já cadastrado.', { variant: 'error' });
            } else if (message.includes('Telefone inválido')) {
                setTelefoneError(message);
                setCurrentStep(2);
                enqueueSnackbar('Telefone inválido.', { variant: 'error' });
            } else if (message.includes('Senha inválida. Deve conter pelo menos uma letra maiúscula, uma letra minúscula, um número, um caractere especial e ter no mínimo 6 caracteres.')) {
                setSenhaError(message);
                enqueueSnackbar('Senha inválida. Deve conter pelo menos uma letra maiúscula, uma letra minúscula, um número, um caractere especial e ter no mínimo 6 caracteres.', { variant: 'error' });
                setCurrentStep(3);
            }
        });
    };

    const handleSubmit = async () => {
        if (validateStep(currentStep)) {
            try {
                await client.donors.createDonor({
                    nome: nome,
                    cpf: cpf,
                    email: email,
                    senha: senha,
                    cep: cep,
                    complemento: complemento,
                    numero: parseInt(numero),
                    bairro: bairro,
                    cidade: cidade,
                    logradouro: logradouro,
                    estado: estado,
                    telefone: parseInt(telefone)
                });

                enqueueSnackbar('Cadastro realizado com sucesso!', { variant: 'success' });

                navigate('/login');

            } catch (error) {
                const errorMessage = (error as ErrorResponse).response?.data.message;
                if (Array.isArray(errorMessage)) {
                    processErrors(errorMessage);
                } else {
                    enqueueSnackbar('Ocorreu um erro desconhecido.', { variant: 'error' });
                }
            }
        }
    };

    return (
        <>
            <div className="container-formulario">
                <div className="container-button">
                    <button className="button" onClick={prevStep} type="button">
                        <div className="button-box">
                            <span className="button-elem">
                                <svg viewBox="0 0 46 40" xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M46 20.038c0-.7-.3-1.5-.8-2.1l-16-17c-1.1-1-3.2-1.4-4.4-.3-1.2 1.1-1.2 3.3 0 4.4l11.3 11.9H3c-1.7 0-3 1.3-3 3s1.3 3 3 3h33.1l-11.3 11.9c-1 1-1.2 3.3 0 4.4 1.2 1.1 3.3.8 4.4-.3l16-17c.5-.5.8-1.1.8-1.9z"
                                    ></path>
                                </svg>
                            </span>
                            <span className="button-elem">
                                <svg viewBox="0 0 46 40">
                                    <path
                                        d="M46 20.038c0-.7-.3-1.5-.8-2.1l-16-17c-1.1-1-3.2-1.4-4.4-.3-1.2 1.1-1.2 3.3 0 4.4l11.3 11.9H3c-1.7 0-3 1.3-3 3s1.3 3 3 3h33.1l-11.3 11.9c-1 1-1.2 3.3 0 4.4 1.2 1.1 3.3.8 4.4-.3l16-17c.5-.5.8-1.1.8-1.9z"
                                    ></path>
                                </svg>
                            </span>
                        </div>
                    </button>
                </div>

                <div className="container">
                    <div className="progress-indicator">
                        <div id="circle1" className="progress-circle">
                            <div className="step-number">1.</div>
                        </div>
                        <div id="circle2" className="progress-circle">
                            <div className="step-number">2.</div>
                        </div>
                        <div id="circle3" className="progress-circle">
                            <div className="step-number">3.</div>
                        </div>
                    </div>
                    <div id="step1" className={`step ${currentStep === 1 ? 'active' : ''}`}>
                        <div className="inputs">
                            <input id="nome" placeholder="Nome" className={`input ${nomeError ? 'input-error' : ''}`} name="text" type="text" required value={nome} onChange={(e) => setNome(e.target.value)} />
                            <span id="nomeError" className="error">{nomeError}</span>
                            <input id="cpf" placeholder="CPF" className={`input ${cpfError ? 'input-error' : ''}`} name="number" type="number" minLength={11} maxLength={11} required value={cpf} onChange={(e) => setCpf(e.target.value)} />
                            <span id="cpfError" className="error">{cpfError}</span>
                            <input id="telefone" placeholder="Telefone" className={`input ${telefoneError ? 'input-error' : ''}`} name="number" type="number" required value={telefone} onChange={(e) => setTelefone(e.target.value)} />
                            <span id="telefoneError" className="error">{telefoneError}</span>
                        </div>
                        <button type="button" onClick={nextStep} className="buttonPro">Continuar</button>
                    </div>
                    <div id="step2" className={`step ${currentStep === 2 ? 'active' : ''}`}>
                        <div className="divisor">
                            <div className="inputs">
                                <input id="cep" placeholder="CEP" className={`input ${cepError ? 'input-error' : ''}`} name="text" type="text" required value={cep} onChange={(e) => handleCepChange(e.target.value)} />
                                <span id="cepError" className="error">{cepError}</span>
                                <input id="logradouro" placeholder="Logradouro" className={`input ${logradouroError ? 'input-error' : ''}`} name="senha" type="text" required value={logradouro} onChange={(e) => setLogradouro(e.target.value)} disabled />
                                <span id="logradouroError" className="error">{logradouroError}</span>
                                <input id="numero" placeholder="Numero" className={`input ${numeroError ? 'input-error' : ''}`} name="text" type="number" required value={numero} onChange={(e) => setNumero(e.target.value)} />
                                <span id="numeroError" className="error">{numeroError}</span>
                            </div>
                            <div className="inputs">
                                <input id="bairro" placeholder="Bairro" className={`input ${bairroError ? 'input-error' : ''}`} name="senha" type="text" required value={bairro} onChange={(e) => setBairro(e.target.value)} disabled />
                                <span id="bairroError" className="error">{bairroError}</span>
                                <input id="cidade" placeholder="Cidade" className={`input ${cidadeError ? 'input-error' : ''}`} name="text" type="text" required value={cidade} onChange={(e) => setCidade(e.target.value)} disabled />
                                <span id="cidadeError" className="error">{cidadeError}</span>
                                <input id="complemento" placeholder="Complemento" className={`input ${complementoError ? 'input-error' : ''}`} name="senha" type="text" required value={complemento} onChange={(e) => setComplemento(e.target.value)} />
                                <span id="complementoError" className="error">{complementoError}</span>
                            </div>
                        </div>
                        <div className="buttons-step2">
                            <button type="button" onClick={nextStep} className="buttonEnd">Próximo</button>
                        </div>
                    </div>
                    <div id="step3" className={`step ${currentStep === 3 ? 'active' : ''}`}>
                        <div className="inputs">
                            <input id="email" placeholder="Email" className={`input ${emailError ? 'input-error' : ''}`} name="senha" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} />
                            <span id="emailError" className="error">{emailError}</span>
                            <input id="senha" placeholder="Senha" className={`input ${senhaError ? 'input-error' : ''}`} name="senha" type="password" required value={senha} onChange={(e) => setSenha(e.target.value)} />
                            <span id="senhaError" className="error">{senhaError}</span>
                            <input id="confirmarSenha" placeholder="Confirmar Senha" className={`input ${confirmarSenhaError ? 'input-error' : ''}`} name="senha" type="password" required value={confirmarSenha} onChange={(e) => setConfirmarSenha(e.target.value)} />
                            <span id="confirmarSenhaError" className="error">{confirmarSenhaError}</span>
                        </div>
                        <button type="submit" className="buttonPro" onClick={handleSubmit} id="submitButton">Enviar</button>
                    </div>
                </div>
            </div>
        </>
    );
}
