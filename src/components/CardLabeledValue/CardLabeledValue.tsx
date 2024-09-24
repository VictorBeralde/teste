import { Box, Card, CardContent, Stack, Typography } from "@mui/material";
import { ReactNode } from "react";

export type CardLabeledValueProps = {
    img?: string
    icon?: ReactNode
    title: string
    description: string
}

export function CardLabeledValue(props: CardLabeledValueProps) {
    const { icon, img, title, description } = props;

    return (
        <>
            <Card
                sx={{
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    backgroundColor: '#11111F',
                    borderRadius: 3
                }}
            >
                <CardContent>
                    <Stack
                        width={'100%'}
                        display={'flex'}
                        alignItems={'center'}
                        justifyContent={'center'}
                        spacing={2}
                    >
                        {icon}
                        {img && (
                            <Box
                                component="img"
                                src={img}
                                alt={title}
                                sx={{
                                    width: '100px',
                                    height: '100px',
                                    objectFit: 'contain'
                                }}
                            />
                        )}
                    </Stack>
                    <Stack
                        width={'100%'}
                        display={'flex'}
                        alignItems={'center'}
                        justifyContent={'center'}
                        spacing={1}
                        textAlign={'center'}
                    >
                        <Typography variant="h6" color={'white'}>
                            {title}
                        </Typography>
                        <Typography variant="subtitle2" color={'white'}>
                            {description}
                        </Typography>
                    </Stack>
                </CardContent>
            </Card>
        </>
    );
}
