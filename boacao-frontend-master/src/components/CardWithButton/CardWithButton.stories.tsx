import { CardWithButton } from "./CardWithButton"

export default {
    title: 'Components/CardWithButton',
}

export const Default = () => {
    return (
        <>
            <CardWithButton
                title="Campanha"
                address="R. Agrimensor Sugaya, 986 - Itaquera, São Paulo - SP, 08260-030"
                data="Aberto Seg a sex 06:00 ás 20:00. 
                Fim de semana e feriados 09:00 ás 18:00"
                handleClickButton={() => console.log('Button clicked')}
                index={1}
            />
        </>
    )
}