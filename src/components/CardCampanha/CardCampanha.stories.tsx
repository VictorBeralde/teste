import { CardCampanha } from "./CardCampanha"

export default {
  title: 'Components/CardCampanha'
}

export const Example = () => {
  return (
    <CardCampanha 
        label={{
          endereco: 'Rua dos Bobos, 0',
          bannerCampanha: 'https://www.google.com.br',
          primary: 'Campanha Teste',
          secondary: 'Campanha Teste',
          dataFinal: new Date(),
        }}
        handleClick={() => 'teste'}
    />
  )
}