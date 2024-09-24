import { Grid, Button } from "@mui/material";
import { PixQRCode } from "../PixQrCode/PixQrCode";
import AttachFileIcon from '@mui/icons-material/AttachFile';
import { useState } from "react";
import styled from "@emotion/styled";

const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
});

export type PixFormProps = {
    setImage: (images: { src: string, name: string }) => void
}

export function PixForm(props: PixFormProps) {
    const { setImage } = props;
    const [inputKey] = useState(Date.now());

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImage({ src: reader.result as string, name: file.name });
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <Grid
            container
            direction="column"
            alignItems="center"
            justifyContent="center"
            style={{ minHeight: '100vh', padding: '20px' }}
            spacing={4}
        >
            <Grid item>
                <PixQRCode pixKey="felipedourado920@gmail.com" />
            </Grid>
            <Grid item>
                <label htmlFor="file-upload">
                    <Button
                    component="span"
                        variant="outlined"
                        color="primary"
                        startIcon={<AttachFileIcon />}
                        style={{
                            padding: '12px',
                            borderRadius: '10px',
                            width: '250px'
                        }}
                    >
                        Anexar Comprovante
                    </Button>
                    <VisuallyHiddenInput
                        id="file-upload"
                        key={inputKey}
                        type="file"
                        multiple
                        onChange={handleFileChange}
                    />
                </label>
            </Grid>
        </Grid>
    );
}