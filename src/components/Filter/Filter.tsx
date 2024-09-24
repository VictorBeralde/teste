import { Grid, Stack } from "@mui/material";
import { ReactNode } from "react";

export type FilterProps = {
    children: ReactNode
}

export default function Filter (props: FilterProps) {  
  return (
    <Grid container direction='column' rowGap='16px' p={2}>
        <Grid item xs={12}>
            <Stack
                width={'100%'}
            >
                {props.children}
            </Stack>        
        </Grid>
    </Grid>
  )
}