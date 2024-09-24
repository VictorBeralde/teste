import { Card, CardContent, Stack, Typography } from "@mui/material";

export type CardPlanProps = {
    title: string
    description: string[]
    price: number
    annual?: boolean
    mt?: number
    mb?: number
}

export function CardPlan(props: CardPlanProps) {
    const { title, description, price, mt, mb, annual } = props
    return (
        <>
            <Card
                sx={{
                    borderRadius: 3,
                    mt: mt,
                    mb: mb,
                }}
            >
                <CardContent
                    sx={{
                        padding: 5,
                        gap: 2
                    }}
                >
                    <Stack
                        width={'100%'}
                        display={'flex'}
                        alignItems={'center'}
                        justifyContent={'center'}
                        gap={2}
                    >
                        <Typography
                            variant="body2"
                        >
                            {title}
                        </Typography>
                        <Stack
                            direction={'row'}
                            alignItems={'center'}
                        >
                            {annual && <Typography
                                variant="subtitle2"
                            >
                                12x
                            </Typography>}
                            <Typography
                                variant="subtitle1"
                                fontWeight={'bold'}
                            >
                                R${price}
                            </Typography>
                            <Typography
                                variant="subtitle2"
                            >
                                / mês
                            </Typography>
                        </Stack>
                    </Stack>
                    <Stack
                        width={'100%'}
                        display={'flex'}
                        alignItems={'center'}
                        justifyContent={'center'}
                        mt={2}
                    >
                        {description.map((item, index) => (
                            <Typography
                                key={index}
                                variant="subtitle2"
                            >
                                • {item}
                            </Typography>
                        ))}
                    </Stack>
                </CardContent>
            </Card>
        </>
    )
}