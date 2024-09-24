import { useNavigate } from 'react-router-dom';
import Image from '../../assets/image-login.png';

export function Cadastro() {
    const navigate = useNavigate()
    return (
        <div className="container-cadastro">
            <div className="content-cadastro">
                <div className="header-cadastro">
                    <div className="containerHeader-cadastro">
                        <ul>
                            <li><a className="headerLink-cadastro" onClick={() => navigate('/')}>Home</a></li>
                            <li><a className="headerLink-cadastro" onClick={() => navigate('/login')}>Login</a></li>
                            <li><a className="headerLink-cadastro" onClick={() => navigate('/cadastrar')}>Cadastro</a></li>
                        </ul>
                    </div>
                </div>
                <div className="Registration-cadastro">
                    <div className="registration_div-cadastro">
                        <p className="h1-cadastro">Cadastre-se</p>
                        <p className="p_Registration-cadastro"> Seja um doador ou cadastre sua ong
                            e venha fazer parte desse projeto </p>
                    </div>
                    <div className="div_registration-cadastro">
                        <button className="button-cadastro" onClick={() => navigate('/formulario-doador')}>Doador</button>
                        <button className="button-cadastro" onClick={() => navigate('/formulario-ong')}>ONG</button>
                    </div>
                </div>
            </div>
            <div className="content_img-cadastro">
                <div className="img_registration-cadastro"><img src={Image} alt="" /></div>
            </div>
        </div>
    );
}

