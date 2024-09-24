import { Button, Grid, Stack, Typography } from "@mui/material";
import { useAtom } from "jotai";
import { createOngAtom } from "../../../../atoms/create-ong-atom";
import TextField from "../../../../components/TextField/TextField";
import { HiOutlineUpload } from "react-icons/hi";
import styled from "@emotion/styled";
import { ChangeEvent } from "react";
import { ImageSelect } from "../../../../components/ImageSelect";

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

export type ImageType = {
    src: string;
    name: string;
}

export function OngFormThree() {
    const [createOng, setCreateOng] = useAtom(createOngAtom);

    const handleFileUpload = (event: ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        if (files) {
            Array.from(files).forEach((file) => {
                const reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onloadend = () => {
                    if (reader.result) {
                        const newImage: ImageType = {
                            src: reader.result.toString(),
                            name: file.name
                        };

                        setCreateOng((prev: any) => ({
                            ...prev,
                            imagem: [...(prev.imagem || []), newImage]
                        }));
                    }
                };
            });
        }
    };

    const handleFileRemove = (index: number) => {
        setCreateOng((prev: any) => ({
            ...prev,
            imagem: prev.imagem.filter((_: any, i: number) => i !== index)
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
                    flexDirection={'row'}
                    alignItems={'center'}
                    justifyContent={'center'}
                    gap={2}
                    width={'100%'}
                >
                    <TextField
                        label={'Sobre a ong*'}
                        type="text"
                        multiline
                        placeholder="Sobre"
                        value={createOng.descricao}
                        onChange={(e) => setCreateOng({ ...createOng, descricao: e.target.value })}
                        colorText="white"
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
                        Imagens da ONG
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
                        multiple
                        onChange={handleFileUpload}
                    />
                    <Stack
                        direction={'row'}
                        gap={2}
                    >
                        {createOng.imagem.map((img, index) => (
                            <ImageSelect
                                key={index}
                                src={img.src}
                                handleClickDelete={() => handleFileRemove(index)}
                                index={index}
                                color="white"
                            />
                        ))}
                    </Stack>
                </Grid>
                <Grid
                    xs={6}
                    display={'flex'}
                    flexDirection={'row'}
                    alignItems={'center'}
                    justifyContent={'center'}
                    width={'100%'}
                >
                    <TextField
                        label={'Link do site*'}
                        type="text"
                        multiline
                        placeholder="Link"
                        value={createOng.linkSite}
                        onChange={(e) => setCreateOng({ ...createOng, linkSite: e.target.value })}
                        colorText="white"
                    />

                </Grid>
            </Grid>
        </>
    )
}
