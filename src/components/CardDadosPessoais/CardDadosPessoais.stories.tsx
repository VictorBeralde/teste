import { CardDadosPessoais } from "./CardDadosPessoais"

export default {
    title: "components/CardDadosPessoais",
}

export const Default = () => {
    return (
        <>
            <CardDadosPessoais 
                bairro="Bairro Teste"
                setOpen={() => {}}
                cep="00000-000"
                email="teste@gmail.com"
                endereco="Rua dos Bobos"
                numero={0}
                telefone={0}
            />
        </>
    )
}