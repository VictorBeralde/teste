import { Divider, Stack, Typography } from "@mui/material";
import { ReactNode } from "react";

export type LabelsGrouProps = {
    label: string,
    value?: ReactNode
    direction?: 'row' | 'column'
  }

export function LabelsGroup(props: LabelsGrouProps) {
    return (
        <>
            <Stack
            spacing={props.direction === 'column' ? 0 : 0.5}
            {...props}
            >
                <Typography
                    color='text.primary'
                    variant='subtitle1'
                    fontWeight={'bold'}
                >
                    {props.label}
                </Typography>
                <Typography
                    color='text.secondary'
                    variant='subtitle2'
                >
                    {props.value && props.value}
                </Typography>
                <Divider 
                    sx={{
                        width: '20%',
                        backgroundColor: '#4A75CB'
                    }}
                />
            </Stack>
        </>
    )
}