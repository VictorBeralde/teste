import { CardSobreNos } from "./CardSobreNos";

export default {
    title: 'Components/CardSobreNos',
}

export const Default = () => {
    return (
        <>
            <CardSobreNos 
                address="Rua 1, 123"
                description="Descrição da ONG"
            />
        </>
    )
};