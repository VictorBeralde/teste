import { useState } from "react";
import { Button, FormControl, FormControlLabel, Grid, Typography, RadioGroup, Radio } from "@mui/material";
import { HiOutlineUpload } from "react-icons/hi";
import styled from "@emotion/styled";
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
});

export type FormTwoProps = {
    dispBusca: boolean
    setDispBusca: (dispBusca: boolean) => void
    images: { src: string, name: string }[]
    setImages: (images: { src: string, name: string }[]) => void
}

export function FormTwo(props: FormTwoProps) {
    const { dispBusca, setDispBusca, images, setImages } = props;
    const [inputKey, setInputKey] = useState(Date.now());

    const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        if (files && files.length > 0) {
            const newImages = await Promise.all(Array.from(files).map(async file => {
                const base64 = await toBase64(file);
                return {
                    src: base64 as string,
                    name: file.name
                };
            }));

            const uniqueNewImages = newImages.filter(newImage => !images.some(image => image.name === newImage.name));

            if (!(uniqueNewImages.length < newImages.length)) {
                setImages([...images, ...uniqueNewImages]);
                setInputKey(Date.now());
            }
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

    const handleFileRemove = (index: number) => {
        const newImages = images.filter((_, i) => i !== index);
        setImages(newImages);
    };

    const handleRadioChange = (event: { target: { value: string; }; }) => {
        setDispBusca(event.target.value === 'true');
    };

    return (
        <Grid
            container
            justifyContent="center"
            alignItems="center"
            flexDirection="column"
            mt={4}
        >
            <Typography variant="h6">
                Tire uma foto do produto
            </Typography>
            <Grid item mt={3}>
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
                    <VisuallyHiddenInput id="file-upload" key={inputKey} type="file" onChange={handleFileChange} multiple />
                </label>
            </Grid>
            <Grid item mt={3}>
                {images.map((img, index) => (
                    <ImageSelect
                        key={index}
                        src={img.src}
                        handleClickDelete={() => handleFileRemove(index)}
                        index={index}
                    />
                ))}
            </Grid>
            <Typography variant="h6" mt={3}>
                Tem disponibilidade de busca?
            </Typography>
            <Grid item mt={1}>
                <FormControl component="fieldset">
                    <RadioGroup row value={dispBusca.toString()} onChange={handleRadioChange}
                        sx={{
                            gap: 5,
                        }}
                    >
                        <FormControlLabel
                            value="true"
                            control={<Radio
                                sx={{
                                    '&.Mui-checked': {
                                        '& .MuiSvgIcon-root': { color: 'transparent' },
                                    },
                                    color: 'transparent',
                                    '& .MuiSvgIcon-root': { fontSize: '24px' },
                                    backgroundColor: dispBusca ? '#375A88' : '#D9D9D9',
                                    '&:hover': { backgroundColor: '#375A88' },
                                    border: 'none',
                                    marginRight: '8px'
                                }} />}
                            label="Sim"
                        />
                        <FormControlLabel
                            value="false"
                            control={<Radio
                                sx={{
                                    '&.Mui-checked': {
                                        '& .MuiSvgIcon-root': { color: 'transparent' },
                                    },
                                    color: 'transparent',
                                    '& .MuiSvgIcon-root': { fontSize: '24px' },
                                    backgroundColor: dispBusca ? '#D9D9D9' : '#375A88',
                                    '&:hover': { backgroundColor: '#375A88' },
                                    border: 'none',
                                    marginRight: '8px'
                                }} />}
                            label="Não"
                        />
                    </RadioGroup>
                </FormControl>
            </Grid>
        </Grid>
    );
}
