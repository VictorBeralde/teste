import { useAtom } from "jotai"
import { upsertCollectionPointsAtom } from "../../../../atoms/upsert-collection-points"
import { Button, Grid, Typography } from "@mui/material"
import TextField from "../../../../components/TextField/TextField"
import { HiOutlineUpload } from "react-icons/hi"
import { ImageSelect } from "../../../../components/ImageSelect"
import styled from "@emotion/styled"
import { useState } from "react"

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

export function CollectionPointsFormOne () {
    const [CollectionPointsAtom, setCollectionPointsAtom] = useAtom(upsertCollectionPointsAtom)
    const [inputKey, setInputKey] = useState(Date.now());
    
    const handleFileRemove = () => {
        setCollectionPointsAtom((prev: any) => ({ ...prev, urlBanner: null }));
    };

    const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const base64 = await toBase64(file);
    
            setCollectionPointsAtom((prev: any) => ({
                ...prev,
                urlBanner: {
                    src: base64 as string,
                    name: file.name,
                },
            }));
    
            setInputKey(Date.now());
        }
    };
    
    const toBase64 = (file: File): Promise<string | ArrayBuffer | null> => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = error => reject(error);
        });
    };

    return (
        <>
            <Grid
                item
                xs={5}
                display={'flex'}
                justifyContent={'center'}
                flexDirection={'column'}
                mt={4}
            >
                <Grid
                    xs={12}
                    display={'flex'}
                >
                    <TextField
                        value={CollectionPointsAtom.nome}
                        type="text"
                        label="Nome do ponto de coleta"
                        placeholder="Título"
                        onChange={(event) => setCollectionPointsAtom((prev: any) => ({ ...prev, nome: event.target.value }))}
                    />
                </Grid>
                <Grid
                    xs={12}
                    display={'flex'}
                    mt={3}
                >
                    <TextField
                        value={CollectionPointsAtom.descricao}
                        type="text"
                        multiline
                        label="Descrição do ponto de coleta"
                        placeholder="Descrição"
                        onChange={(event) => setCollectionPointsAtom((prev: any) => ({ ...prev, descricao: event.target.value }))}
                    />
                </Grid>
                <Grid
                    xs={12}
                    display={'flex'}
                    mt={3}
                >
                    <TextField
                        value={CollectionPointsAtom.horarioFuncionamento}
                        type="text"
                        multiline
                        label="Horário de funcionamento"
                        placeholder="Horário de funcionamento"
                        onChange={(event) => setCollectionPointsAtom((prev: any) => ({ ...prev, horarioFuncionamento: event.target.value }))}
                    />
                </Grid>
                <Grid
                    item
                    xs={12}
                    display={'flex'}
                    justifyContent={'center'}
                    alignItems={'center'}
                    direction={'column'}
                    mt={3}
                >
                    <Typography
                        mb={2}
                    >
                        Banner do ponto de coleta
                    </Typography>
                    <label htmlFor="file-upload">
                        <Button
                            component="span"
                            variant="contained"
                            sx={{
                                backgroundColor: '#D9D9D9',
                                border: '3px solid #375A88',
                                borderRadius: 2,
                                color: 'gray',
                                padding: '10px 20px'
                            }}
                            startIcon={<HiOutlineUpload />}
                        >
                            Enviar Arquivo
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
                <Grid item mt={3} display={'flex'} alignItems={'center'} justifyContent={'center'}>
                    {
                        CollectionPointsAtom.urlBanner && 
                        <ImageSelect
                            src={CollectionPointsAtom.urlBanner.src}
                            handleClickDelete={() => handleFileRemove()}
                            index={1}
                        />
                    }
                </Grid>
            </Grid>
        </>
    )
}