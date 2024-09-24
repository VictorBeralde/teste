import { Box, Card, CardContent, Typography } from "@mui/material";

export type CardItemsProps = {
    image: string
    title: string
}

export function CardItems(props: CardItemsProps) {
    const { image, title } = props;
    return (
        <>
            <Card
                sx={{
                    width: '100%',
                    backgroundColor: "#11111F"
                }}
            >
                <CardContent>
                    <Box
                        component="img"
                        src={image}
                        alt="Card Items"
                        sx={{
                            width: '100%',
                        }}
                    />
                    <Typography
                        variant="subtitle2"
                        color={'#fff'}
                        textAlign={'center'}
                    >
                        {title}
                    </Typography>
                </CardContent>
            </Card>
        </>
    )
}