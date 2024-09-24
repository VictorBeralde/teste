import { Card, CardContent, Stack, Typography } from "@mui/material";
import { HiOutlineExclamationCircle } from "react-icons/hi2";

export type CardEmptyProps = {
    label: string
}

export function CardEmpty (props: CardEmptyProps) {
    const { label } = props
    return (
        <>
            <Card
                sx={{
                    boxShadow: '0px 0px 10px 5px rgba(0, 0, 0, 0.10)',
                    borderRadius: '10px',
                    width: '40%'
                }}
            >
                <CardContent>
                    <Stack
                        width={'100%'}
                        display={'flex'}
                        flexDirection={'column'}
                        justifyContent={'center'}
                        alignItems={'center'}
                        padding={3}
                    >
                        <HiOutlineExclamationCircle fontSize={'80px'}/>
                        <Typography
                            color={'text.primary'} 
                            variant="h6"
                            mt={2}
                        >
                            {label}
                        </Typography>
                    </Stack>
                </CardContent>
            </Card>
        </>
    )
}