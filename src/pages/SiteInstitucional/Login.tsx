import { useNavigate } from 'react-router-dom';
import './css/stylelogin.css';
import Image from '../../assets/image-login.png';
import { useState } from 'react';
import { useClient } from '../../hooks/use-client';
import { useToken } from '../../components/TokenManager';
import { enqueueSnackbar } from 'notistack';

interface ErrorResponse {
    response: {
        data: {
            message: string[];
        };
    };
}

export function Login() {
    const navigate = useNavigate()
    const [email, setEmail] = useState('')
    const [senha, setSenha] = useState('')
    const client = useClient()
    const [, setToken] = useToken();

    const processErrors = (messages: string[]) => {
        messages.forEach((message) => {
            if (message.includes('Email e (ou) senha inválidos')) {
                enqueueSnackbar('Email e (ou) senha inválidos', { variant: 'error' });
            } else {
                enqueueSnackbar(message, { variant: 'error' });
            }
        });
    };

    const handleSubmit = async () => {
            try {
                const response = await client.login.login({
                    email,
                    senha 
                });
                const token = response.access_token
                await setToken(token, new Date(response.expires_in), response.idUsuario, 'TESTE')

                if (response.tipo === 'DOADOR') {
                    navigate('/home')
                } else {
                    navigate('/triagem')
                }
            } catch (error) {
                const errorMessage = (error as ErrorResponse).response?.data.message;
                if (Array.isArray(errorMessage)) {
                    processErrors(errorMessage);
                } else {
                    enqueueSnackbar('Ocorreu um erro desconhecido.', { variant: 'error' });
                }
            }
    };

    return (
        <>
            <div className="container-login">
                <div className="content-login">
                    <div className="header-login">
                        <div className="containerHeader-login">
                            <ul>
                                <li><a className="headerLink-login" onClick={() => navigate('/')}>Home</a></li>
                                <li><a className="headerLink-login" onClick={() => navigate('/login')}>Login</a></li>
                                <li><a className="headerLink-login" onClick={() => navigate('/cadastrar')}>Cadastro</a></li>
                            </ul>
                        </div>
                    </div>
                    <div className="Registration-login">
                        <div className="registration_div-login">
                            <p className="h1-login">Bem-vindo <br /> de volta!</p>
                            <div className="inputs-login">
                                <input placeholder="Email" className="input-login" name="text" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                                <input placeholder="Senha" className="input-login" name="senha" type="password" value={senha} onChange={(e) => setSenha(e.target.value)} />
                            </div>
                        </div>
                        <div className="div_registration-login">
                            <button className="button-login" onClick={handleSubmit}>Entrar</button>
                        </div>
                        <p className="password-login">Esqueceu sua senha? <a onClick={() => navigate('/recuperar-senha')}> Recuperar</a></p>
                    </div>
                </div>

                <div className="content_img-login">
                    <div className="img_registration-login"><img src={Image} alt="" /></div>
                </div>
            </div>
        </>
    );
}
