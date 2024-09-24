import styled from "@emotion/styled";
import { useAtom } from "jotai";
import { upsertCampaignAtom } from "../../../../atoms/upsert-campaign-atom";
import { Button, FormControl, FormControlLabel, Grid, Radio, RadioGroup, Typography } from "@mui/material";
import { HiOutlineUpload } from "react-icons/hi";
import { ImageSelect } from "../../../../components/ImageSelect";
import { useState } from "react";
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
});

export function CampaignFormThree() {
    const [campaignAtom, setCampaignAtom] = useAtom(upsertCampaignAtom);
    const [inputKey, setInputKey] = useState(Date.now());

    const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const base64 = await toBase64(file);
    
            setCampaignAtom((prev: any) => ({
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
    
    

    const handleFileRemove = () => {
        setCampaignAtom((prev: any) => ({ ...prev, urlBanner: null }));
    };

    const handleRadioChange = (event: { target: { value: string; }; }) => {
        setCampaignAtom((prev: any) => ({ ...prev, disponibilidadeDeBusca: event.target.value === 'true' }));
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
                    item
                    xs={12}
                    display={'flex'}
                    justifyContent={'center'}
                    alignItems={'center'}
                    mt={3}
                    direction={'column'}
                >
                    <Typography variant="h6" mb={3}>
                        Banner da campanha
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
                <Grid
                    xs={12}
                    display={'flex'}
                    justifyContent={'center'}
                    alignItems={'center'}
                >
                    {
                        campaignAtom.urlBanner && <ImageSelect
                            src={campaignAtom.urlBanner}
                            handleClickDelete={() => handleFileRemove()}
                            index={1}
                        />
                    }
                </Grid>
                <Grid
                    item
                    xs={12}
                    display={'flex'}
                    justifyContent={'center'}
                    alignItems={'center'}
                    mt={3}
                    direction={'column'}
                >
                    <Typography variant="h6" mt={3}>
                        Tem disponibilidade de busca?
                    </Typography>
                    <FormControl component="fieldset">
                        <RadioGroup row value={campaignAtom.disponibilidadeDeBusca} onChange={handleRadioChange}
                            sx={{
                                gap: 5,
                            }}
                        >
                            <FormControlLabel
                                value="true"
                                control={<Radio
                                    sx={{
                                        color: campaignAtom.disponibilidadeDeBusca ? '#375A88' : '#D9D9D9',
                                        '&.Mui-checked': {
                                            color: '#375A88',
                                        },
                                        '& .MuiSvgIcon-root': { fontSize: '24px' },
                                        '&:hover': { backgroundColor: '#D9D9D9' },
                                        border: 'none',
                                        marginRight: '8px'
                                    }} />}
                                label="Sim"
                            />
                            <FormControlLabel
                                value="false"
                                control={<Radio
                                    sx={{
                                        color: campaignAtom.disponibilidadeDeBusca ? '#375A88' : '#D9D9D9',
                                        '&.Mui-checked': {
                                            color: '#375A88',
                                        },
                                        '& .MuiSvgIcon-root': { fontSize: '24px' },
                                        '&:hover': { backgroundColor: '#D9D9D9' },
                                        border: 'none',
                                        marginRight: '8px'
                                    }} />}
                                label="Não"
                            />
                        </RadioGroup>
                    </FormControl>
                </Grid>
                {campaignAtom.disponibilidadeDeBusca &&
                    <Grid
                        xs={12}
                        display={'flex'}
                        alignContent={'center'}
                        justifyContent={'center'}
                        mt={3}
                    >
                        <TextField
                            value={campaignAtom.distance || ''}
                            type="number"
                            label="Até quantos KM?"
                            onChange={(event) => setCampaignAtom((prev: any) => ({ ...prev, distance: event.target.value }))}
                        />
                    </Grid>}
            </Grid>
        </>
    );
}
