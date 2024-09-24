import { useNavigate } from 'react-router-dom';
import './css/stylelogin.css';
import Image from '../../assets/image-login.png';

export function RecuperarSenha () {
  const navigate = useNavigate()
    return (
        <div className="container-login">
          <div className="content-login">
            <div className="header-login">
              <div className="containerHeader-login">
                <ul>
                  <li><a className="headerLink-login" onClick={() => navigate('/')}>Home</a></li>
                  <li><a className="headerLink-login" onClick={() => navigate('/login')}>Login</a></li>
                  <li><a className="headerLink-login" onClick={() => navigate('/cadastar')}>Cadastro</a></li>
                </ul>
              </div>
            </div>
            <div className="Registration-login">
              <div className="registration_div-login">
                <p className="h1-login">Recuperar<br/>Senha</p>
                <div className="inputs-login">
                  <input placeholder="Nova Senha" className="input-login" name="text" type="password" />
                  <input placeholder="Confirmar Senha" className="input-login" name="senha" type="password" />
                </div>
              </div>
              <div className="div_registration-login">
                {/* <button className="button">Doador</button> */}
                <button className="button-login">Entrar</button>
              </div>
            </div>
          </div>
          <div className="content_img-login">
                    <div className="img_registration-login"><img src={Image} alt="" /></div>
                </div>
        </div>
      );    
}