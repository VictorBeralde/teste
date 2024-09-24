import { Banner } from "./Banner"
import BannerDoacao from '../../assets/banner-doacao.svg'


export default {
    title: 'Components/Banner'
}

export const Example = () => (
   <Banner
    img={BannerDoacao}
   /> 
)