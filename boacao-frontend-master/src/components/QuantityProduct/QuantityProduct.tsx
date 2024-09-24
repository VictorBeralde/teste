import { Box, Button, Stack, Typography } from "@mui/material"
import { HiOutlinePlusSm } from "react-icons/hi"
import { HiOutlineMinus } from "react-icons/hi"

export type QuantityProductProps = {
    label: string,
    quantity: number,
    handleClick: (index: number) => void
    handleClickBack: (index: number) => void
    index: number
}

export function QuantityProduct(props: QuantityProductProps) {
    return (
        <>
            <Stack
                display={'flex'}
                flexDirection={'row'}
                alignItems={'center'}
                justifyContent={'space-between'}
                mt={2}
            >
                <Stack
                    display={'flex'}
                    flexDirection={'row'}
                    alignItems={'center'}
                    justifyContent={'space-between'}
                    gap={3}
                    mr={5}
                >
                    <Stack
                        sx={{
                            width: '50px',
                            height: '50px',
                            borderRadius: '25px',
                            border: '1px solid #D9D9D9',
                            backgroundColor: props.quantity > 0 ? '#375A88' : '#D9D9D9'
                        }}
                    />
                    <Typography
                        variant="body1"
                    >
                        {props.label}
                    </Typography>
                </Stack>
                <Stack
                    display={'flex'}
                    flexDirection={'row'}
                    alignItems={'center'}
                    justifyContent={'center'}
                    gap={2}
                >
                    <Button
                        onClick={() => props.handleClickBack(props.index)}
                        variant="contained"
                        sx={{
                            backgroundColor: '#375A88',
                            borderRadius: 5,
                        }}>
                        <HiOutlineMinus
                            style={{ fontSize: '25px', cursor: 'pointer' }}
                        />
                    </Button>
                    <Box
                        sx={{
                            backgroundColor: '#375A88',
                            borderRadius: 5,
                            width: 50,
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            color: '#fff',
                            padding: 1
                        }}
                    >
                        {props.quantity}
                    </Box>
                    <Button
                        onClick={() => props.handleClick(props.index)}
                        variant="contained"
                        sx={{
                            backgroundColor: '#375A88',
                            borderRadius: 5,
                        }}
                    >
                        <HiOutlinePlusSm
                            style={{ fontSize: '25px', cursor: 'pointer' }}
                        />
                    </Button>
                </Stack>
            </Stack>
        </>
    )
}