import { Stack, Typography } from "@mui/material";

export type SliderProgressProps = {
    number: number,
    indexPosition: number
    color?: string
}

export function SliderProgress (props: SliderProgressProps) {
    return (
        <>
            <Stack
                sx={{
                    width: '15%',
                    display: 'flex',
                    alignItems: 'center'
                }}
            >
                <Typography
                    variant="body1"
                    color={props.color ? props.color : 'black'}
                >
                    {props.indexPosition + 1}
                </Typography>
                <Stack 
                    sx={{
                        backgroundColor: props.indexPosition === props.number ? '#375A88' : '#D9D9D9',
                        height: props.indexPosition === props.number ? '20px' : '15px',
                        width: '100%',
                        borderRadius: '8px'
                    }}
                />
            </Stack>
        </>
    )
}