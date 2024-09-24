import Logo from './assets/boacao.png'
import DiaTerra from './assets/dia-da-terra (2) 1.svg'
import Empreendedorismo from './assets/empreendedorismo-social-corporativo (1) 1 (1).svg'
import Home from '../../assets/imagem-home.png'
import Comunidade from './assets/comunidade 1 (1).svg'
import Alimento from './assets/alimento.svg'
import FraseCampanha from './assets/frase-campanha.svg'
import Roupas from './assets/roupas.svg'
import Racao from './assets/racao.svg'
import Moveis from './assets/moveis.svg'
import Eletronico from './assets/eletronicos.svg'
import Brinquedo from './assets/brinquedos.svg'
import SetaEsquerda from './assets/setaEsquerda.svg'
import SetaDireita from './assets/setaDireita.svg'
import Telefone from './assets/telefone.png'
import Email from './assets/email.png'
import Whatsapp from './assets/whatsapp.png'
import Carrossel1 from './assets/carrossel1.svg'
import Carrossel2 from './assets/carrossel2.svg'
import Carrossel3 from './assets/carrossel3.svg'
import { useNavigate } from 'react-router-dom';

export function Site() {
    const navigate = useNavigate()

    const scrollHome = () => {
        const sobreNosElement = document.getElementById('home');
        if (sobreNosElement) {
            sobreNosElement.scrollIntoView({ behavior: 'smooth' });
        }
    }

    const scrollSobreNos = () => {
        const sobreNosElement = document.getElementById('sobre-nos');
        if (sobreNosElement) {
            sobreNosElement.scrollIntoView({ behavior: 'smooth' });
        }
    }

    const scrollItens = () => {
        const sobreNosElement = document.getElementById('itens');
        if (sobreNosElement) {
            sobreNosElement.scrollIntoView({ behavior: 'smooth' });
        }
    }

    const scrollBeneficios = () => {
        const sobreNosElement = document.getElementById('beneficios');
        if (sobreNosElement) {
            sobreNosElement.scrollIntoView({ behavior: 'smooth' });
        }
    }

    const scrollContato = () => {
        const sobreNosElement = document.getElementById('contato');
        if (sobreNosElement) {
            sobreNosElement.scrollIntoView({ behavior: 'smooth' });
        }
    }

    let contador = 1

    const mudarSlide = (id: string) => {
        if (id === "esquerda") {
            contador--;
            if (contador <= 0) {
                contador = 3;
            }
        } else if (id === "direita") {
            contador++;
            if (contador > 3) {
                contador = 1;
            }
        }

        const slide1 = document.getElementById('slide1');
        const slide2 = document.getElementById('slide2');
        const slide3 = document.getElementById('slide3');

        if (slide1 && slide2 && slide3) {
            if (contador === 1) {
                slide1.style.display = 'flex';
                slide2.style.display = 'none';
                slide3.style.display = 'none';
            } else if (contador === 2) {
                slide1.style.display = 'none';
                slide2.style.display = 'flex';
                slide3.style.display = 'none';
            } else if (contador === 3) {
                slide1.style.display = "none";
                slide2.style.display = "none";
                slide3.style.display = "flex";
            }
        }
    }

    return (
        <>
            <div className="container-home" id='home'>

                <div className="header-home">
                    <img className="logo-home" src={Logo} alt="logo-pagina" />
                    <div className="containerHeader-home">
                        <ul>
                            <li> <a onClick={scrollHome} className="headerLink-home">Home</a></li>
                            <li><a className="headerLink-home" onClick={scrollSobreNos}>Sobre nós</a></li>
                            <li><a onClick={scrollItens} className="headerLink-home">Itens</a></li>
                            <li><a onClick={scrollBeneficios} className="headerLink-home">Benefícios</a></li>
                            <li><a onClick={scrollContato} className="headerLink-home">Contato</a></li>
                            <li><a className="headerLink-home" onClick={() => navigate('/login')}>Login</a></li>
                        </ul>
                    </div>
                </div>

                <div className='onda-home'>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 220">
                        <path fill="#11111F" fillOpacity="1"
                            d="M0,192L80,165.3C160,139,320,85,480,90.7C640,96,800,160,960,176C1120,192,1280,160,1360,144L1440,128L1440,0L1360,0C1280,0,1120,0,960,0C800,0,640,0,480,0C320,0,160,0,80,0L0,0Z">
                        </path>
                    </svg>
                </div>
                <div className='container-home-2'>
                    <div className="corpo-home">
                        <div className="texto-home">
                            <h2 className="fazaboa-home">#FazABoa</h2>
                            <p className="texto-mudanca-home">Porque juntos fazemos  a mudança acontecer </p>
                            <button className="cadastrar-home" onClick={() => navigate('/cadastrar')}>Cadastre-se </button>
                        </div>
                        <div className="imagem">
                            <img className="doar-home" src={Home} alt="" />
                        </div>
                    </div>
                </div>

                <div className="corpo-sobre-home" id='sobre-nos'>
                    <h2 className='h2-sobre'>Quem somos?</h2>
                    <p className="quem-somos-home">Somos uma empresa de tecnologia que tem como objetivo fornecer suporte para o
                        crescimento de doações, para alcançar um número cada vez maior de pessoas, além de conectar e informar a
                        comunidade sobre as necessidades das pessoas ao seu redor. </p>
                    <h3>Nossos objetivos</h3>
                    <div className="objetivos-home">
                        <div className="caixa-objetivo-home">
                            <div className="imagem-home">
                                <img src={DiaTerra} alt="" />
                            </div>
                            <h4>Solidariedade Sustentável</h4>
                            <p className="texto-sobre-home">Compromisso com doações regulares para proporcionar um impacto constante.</p>
                        </div>
                        <div className="caixa-objetivo-home">
                            <div className="imagem-home">
                                <img src={Empreendedorismo} alt="" />
                            </div>
                            <h4>Inovação Social</h4>
                            <p className="texto-sobre-home">Exploração de novas abordagens e tecnologias para otimizar a eficácia das
                                doações.</p>
                        </div>
                        <div className="caixa-objetivo-home">
                            <div className="imagem-home">
                                <img src={Comunidade} alt="" />
                            </div>
                            <h4>Comunidade</h4>
                            <p className=" texto-sobre-home">Envolvimento ativo com a comunidade para entender suas necessidades e
                                aspirações.</p>
                        </div>
                    </div>
                </div>

                <div className="corpo-campanha-home" id='itens'>
                    <div className="campanha-frase-home">
                        <h2 className='h2-campanha'>Itens aceitos em campanhas</h2>
                        <div className='frase-campanha'>
                            {<img src={FraseCampanha} alt="" />}
                        </div>
                    </div>
                    <div className="container-cards-home">
                        <div className="itens-campanhas-home">
                            <div className="alimentos-home">
                                <div className="item-imagem-home">
                                    <img src={Alimento} alt="" />
                                </div>
                                <div className="item-frase-home">
                                    <h2>Alimentos</h2>
                                </div>
                            </div>
                            <div className="alimentos-home">
                                <div className="item-imagem-home">
                                    <img src={Moveis} alt="" />
                                </div>
                                <div className="item-frase-home">
                                    <h2>Movéis</h2>
                                </div>
                            </div>
                        </div>
                        <div className="itens-campanhas-home">
                            <div className="alimentos-home">
                                <div className="item-imagem-home">
                                    <img src={Roupas} alt="" />
                                </div>
                                <div className="item-frase-home">
                                    <h2>Roupas</h2>
                                </div>
                            </div>
                            <div className="alimentos-home">
                                <div className="item-imagem-home">
                                    <img src={Eletronico} alt="" />
                                </div>
                                <div className="item-frase-home">
                                    <h2>Eletrônicos</h2>
                                </div>
                            </div>
                        </div>
                        <div className="itens-campanhas-home">
                            <div className="alimentos-home">
                                <div className="item-imagem-home">
                                    <img src={Racao} alt="" />
                                </div>
                                <div className="item-frase-home">
                                    <h2>Ração</h2>
                                </div>
                            </div>
                            <div className="alimentos-home">
                                <div className="item-imagem-home">
                                    <img src={Brinquedo} alt="" />
                                </div>
                                <div className="item-frase-home">
                                    <h2>Brinquedos</h2>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="container-carrossel-home" id='beneficios'>
                    <h2 className="h2-sobre" >Benefícios para ONGs</h2>
                    <div className="dentro-carrossel-home">
                        <div className="setaEsquerda-home">
                            <a>
                                <img src={SetaEsquerda} alt="" onClick={() => mudarSlide('esquerda')} id="esquerda" />
                            </a>
                        </div>

                        <div className="slide1-home" style={{ display: 'flex' }} id="slide1">
                            <div className="container-beneficios-home">
                                <div className="beneficios-imagem-home">
                                    <img src={Carrossel1} alt="" />
                                </div>
                            </div>
                            <div className="principal-benecifico-home">
                                <h2>Impacto</h2>
                                <p> Doações causam um impacto gigantesco na vida de quem recebe esse ato de amor. Com a
                                    nossa solução você concentra as doações e gestão em uma plataforma que incentiva a
                                    doação e a interação entre a comunidade.
                                </p>
                            </div>
                        </div>

                        <div className="slide2-home" style={{ display: 'none' }} id="slide2">
                            <div className="container-beneficios-home">
                                <div className="beneficios-imagem-home">
                                    <img src={Carrossel2} alt="" />
                                </div>
                            </div>
                            <div className="principal-benecifico-home">
                                <h2>Controle</h2>
                                <p> Controle quantidade de doações por dia, semana e mês, além de
                                    dashboards informativos sobre as entradas e indicadores de metas.
                                </p>
                            </div>
                        </div>

                        <div className="slide3-home" style={{ display: 'none' }} id="slide3">
                            <div className="container-beneficios-home">
                                <div className="beneficios-imagem-home">
                                    <img src={Carrossel3} alt="" />
                                </div>
                            </div>
                            <div className="principal-benecifico-home">
                                <h2>Divulgação</h2>
                                <p> Melhore o divulgação de sua ONG em uma plataforma que concentra ONG´s e doadores, facilitando também a
                                    comunicação direto com o doador, possibilitando saber informações sobre o produto doado e localização, por exemplo.
                                </p>

                            </div>
                        </div>

                        <div className="setaDireita-home">
                            <a>
                                <img src={SetaDireita} alt="" id="direita" onClick={() => mudarSlide('direita')} />
                            </a>
                        </div>
                    </div>
                </div>
                <div className="container-contato-home" id='contato'>
                    <div className="container-parte-contato-home">
                        <div className="titulo-contato">
                            <h2 className="contato-frase-home">Quer saber mais sobre nosso projeto?</h2>
                            <h3>Coverse com a gente</h3>
                        </div>
                        <div className="contato-informacoes-home">
                            <div className="container-informacoes-imagem-home">
                                <img src={Telefone} alt="" />
                                <img src={Whatsapp} alt="" />
                                <img src={Email} alt="" />
                            </div>
                            <div className="container-informacoes-home">
                                <span>11-9999-0000</span>
                                <span>11-9999-0000</span>
                                <span>boacao@gmail.com</span>
                            </div>
                        </div>
                    </div>

                </div>
                <div className="navbar-nome-home">
                    <a href="" className="paths-home">C: Boação</a>
                </div>
            </div>
        </>
    )
}
