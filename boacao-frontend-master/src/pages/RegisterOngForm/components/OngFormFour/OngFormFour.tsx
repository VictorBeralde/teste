import styled from "@emotion/styled";
import { Button, Grid, Stack, Typography } from "@mui/material";
import { HiOutlineUpload } from "react-icons/hi";
import { ImageSelect } from "../../../../components/ImageSelect";
import { useAtom } from "jotai";
import { createOngAtom } from "../../../../atoms/create-ong-atom";
import TextField from "../../../../components/TextField/TextField";

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
    border: 5
});

export function OngFormFour() {
    const [createOng, setCreateOng] = useAtom(createOngAtom);

    const toBase64 = (file: File): Promise<string | ArrayBuffer | null> => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = error => reject(error);
        });
    };

    const handleFileUpload = async (e: any) => {
        const file = e.target.files[0]; 
        if (file) {
            const base64 = await toBase64(file);

            setCreateOng((prev: any) => ({
                ...prev,
                certificado: base64 as string
            }));
        }
    };

    const handleDeleteImage = () => {
        setCreateOng((prev: any) => ({
            ...prev,
            certificado: null
        }));
    };

    return (
        <>
            <Grid
                item
                xs={12}
                display={'flex'}
                alignItems={'center'}
                justifyContent={'center'}
                flexDirection={'column'}
            >
                <Grid
                    xs={6}
                    display={'flex'}
                    flexDirection={'column'}
                    alignItems={'center'}
                    justifyContent={'center'}
                    width={'100%'}
                >
                     <TextField
                            label={'Tipo de certificado*'}
                            type="text"
                            placeholder="Insira o certificado que a ong possui"
                            colorText="white"
                            value={createOng.tipoDoCertificado}
                            onChange={(e) => setCreateOng({ ...createOng, tipoDoCertificado: e.target.value })}
                            sx={{
                                '& .MuiInputBase-root': {
                                    borderRadius: 5,
                                    backgroundColor: '#D9D9D9'
                                },
                                width: '100%',
                                marginBottom: '16px'
                            }}
                        />
                </Grid>
                <Grid
                    xs={6}
                    display={'flex'}
                    flexDirection={'column'}
                    alignItems={'center'}
                    justifyContent={'center'}
                    width={'100%'}
                >
                    <Typography
                        width={'100%'}
                        textAlign={'left'}
                        color={'white'}
                    >
                        Certificado da ONG
                    </Typography>
                    <label htmlFor="file-upload" style={{ width: '100%' }}>
                        <Button
                            component="span"
                            variant="contained"
                            sx={{
                                backgroundColor: '#D9D9D9',
                                border: 'none',
                                borderRadius: 2,
                                color: 'gray',
                                padding: '10px 20px',
                                width: '100%'
                            }}
                            startIcon={<HiOutlineUpload />}
                        >
                            Enviar Arquivo
                        </Button>
                    </label>
                    <VisuallyHiddenInput
                        id="file-upload"
                        type="file"
                        onChange={handleFileUpload}
                    />
                    <Stack
                        direction={'row'}
                        gap={2}
                        marginTop={2}
                    >
                        {createOng.certificado && (
                            <ImageSelect
                                src={createOng.certificado}
                                handleClickDelete={handleDeleteImage}
                                color="white"
                                index={0}
                            />
                        )}
                    </Stack>
                    <Typography
                         width={'100%'}
                         textAlign={'left'}
                         color={'white'}
                    >
                        * Para a segurança, insira o certificado que a ONG possui
                    </Typography>
                </Grid>
            </Grid>
        </>
    );
}
