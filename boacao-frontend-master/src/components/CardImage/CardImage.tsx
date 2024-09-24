import { Card, CardContent, Stack } from '@mui/material'
import BoAcao from '../../assets/boAcao-banner.svg'

export type CardImageProps = {
    onClick?: () => void
    image: string
}

export function CardImage(props: CardImageProps) {
    return (
        <Card
            onClick={props.onClick}
            sx={{
                cursor: 'pointer',
                boxShadow: '0px 0px 10px 5px rgba(0, 0, 0, 0.10)',
                borderRadius: '10px'
            }}
        >
            <CardContent sx={{ padding: 0, display: 'inline' }}>
                <Stack sx={{ overflow: 'hidden' }}>
                    <img src={props.image || BoAcao} alt="Evento" style={{ width: '100%', height: '250px', display: 'block', borderRadius: '10px' }} />
                </Stack>
            </CardContent>
        </Card>
    )
}
