import { Stack } from "@mui/system";

export type BannerProps = {
    img: string
}

export function Banner (props: BannerProps) {
    return (
        <>
         <Stack
            width={'100%'}
            borderRadius={5}
         >
            <img src={props.img} alt="Imagem" />
         </Stack>
        </>
    )
}