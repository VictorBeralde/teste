import { Card, CardContent, CircularProgress, Stack, Typography } from "@mui/material";

export type CardInsightProps = {
    title: string
    value: number
    isLoading: boolean
}

export function CardInsight (props: CardInsightProps) {
    return (
        <>
            <Card
                sx={{
                    backgroundColor: '#375A88',
                    borderRadius: '10px',
                    width: '90%',
                }}
            >
                <CardContent>
                    <Stack
                        display={'flex'}
                        alignItems={'center'}
                        justifyContent={'center'}
                    >
                        {props.isLoading && <CircularProgress />}
                        {!props.isLoading &&
                        <>
                        <Typography
                            variant={'h6'}
                            color={'#FFFFFF'}
                        >
                            {props.title}
                        </Typography>
                        <Typography
                            variant={'h5'}
                            color={'#FFFFFF'}
                        >
                            {props.value}
                        </Typography>
                        </>}
                    </Stack>
                </CardContent>
            </Card>
        </>
    )
}