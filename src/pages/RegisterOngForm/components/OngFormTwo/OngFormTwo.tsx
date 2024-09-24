import { Grid } from "@mui/material";
import { useAtom } from "jotai";
import { createOngAtom } from "../../../../atoms/create-ong-atom";
import TextField from "../../../../components/TextField/TextField";
import { useState } from "react";

export function OngFormTwo() {
    const [createOng, setCreateOng] = useAtom(createOngAtom)
    const [cepError, setCepError] = useState<string>('');

    const fetchAddress = async (value: string) => {
        try {
            const response = await fetch(`https://viacep.com.br/ws/${value}/json/`);
            if (!response.ok) {
                setCepError('CEP não encontrado.');
            }
            const data = await response.json();
            setCreateOng({
                ...createOng,
                logradouro: data.logradouro,
                bairro: data.bairro,
                cidade: data.localidade,
                estado: data.uf
            });
        } catch (error) {
            setCepError('CEP não encontrado.');
        }
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
                    xs={12}
                    display={'flex'}
                    flexDirection={'row'}
                    alignItems={'center'}
                    justifyContent={'center'}
                    gap={2}
                    width={'100%'}
                >
                    <Grid
                        xs={4}
                        display={'flex'}
                        flexDirection={'column'}
                        alignItems={'center'}
                        justifyContent={'center'}
                    >
                        <TextField
                            label={'CEP*'}
                            type="text"
                            placeholder="00000-000"
                            value={createOng.cep}
                            colorText="white"
                            onChange={async (e) => {
                                await setCreateOng({ ...createOng, cep: e.target.value });

                                if (createOng.cep.length === 8) {
                                    fetchAddress(createOng.cep);
                                }
                                setCepError('');
                            }}
                            sx={{
                                '& .MuiInputBase-root': {
                                    borderRadius: 5,
                                    backgroundColor: '#D9D9D9'
                                },
                                width: '100%',
                                marginBottom: '16px'
                            }}
                            error={cepError !== ''}
                            helperText={cepError}
                        />
                    </Grid>
                    <Grid
                        xs={4}
                        display={'flex'}
                        flexDirection={'column'}
                        alignItems={'center'}
                        justifyContent={'center'}
                    >
                        <TextField
                            label={'Bairro*'}
                            type="text"
                            placeholder="bairro"
                            colorText="white"
                            value={createOng.bairro}
                            onChange={(e) => setCreateOng({ ...createOng, bairro: e.target.value })}
                            sx={{
                                '& .MuiInputBase-root': {
                                    borderRadius: 5,
                                    backgroundColor: '#D9D9D9'
                                },
                                width: '100%',
                                marginBottom: '16px'
                            }}
                            disabled
                        />
                    </Grid>
                </Grid>
                <Grid
                    xs={12}
                    display={'flex'}
                    flexDirection={'row'}
                    alignItems={'center'}
                    justifyContent={'center'}
                    gap={2}
                    width={'100%'}
                >
                    <Grid
                        xs={4}
                        display={'flex'}
                        flexDirection={'column'}
                        alignItems={'center'}
                        justifyContent={'center'}
                    >
                        <TextField
                            label={'Logradouro*'}
                            type="text"
                            placeholder="Logradouro"
                            value={createOng.logradouro}
                            colorText="white"
                            onChange={(e) => { setCreateOng({ ...createOng, logradouro: e.target.value }) }}
                            sx={{
                                '& .MuiInputBase-root': {
                                    borderRadius: 5,
                                    backgroundColor: '#D9D9D9'
                                },
                                width: '100%',
                                marginBottom: '16px'
                            }}
                            disabled
                        />
                    </Grid>
                    <Grid
                        xs={4}
                        display={'flex'}
                        flexDirection={'column'}
                        alignItems={'center'}
                        justifyContent={'center'}
                    >
                        <TextField
                            label={'Cidade*'}
                            type="text"
                            placeholder="São Paulo"
                            colorText="white"
                            value={createOng.cidade}
                            onChange={(e) => setCreateOng({ ...createOng, cidade: e.target.value })}
                            sx={{
                                '& .MuiInputBase-root': {
                                    borderRadius: 5,
                                    backgroundColor: '#D9D9D9'
                                },
                                width: '100%',
                                marginBottom: '16px'
                            }}
                            disabled
                        />
                    </Grid>
                </Grid>
                <Grid
                    xs={12}
                    display={'flex'}
                    flexDirection={'row'}
                    alignItems={'center'}
                    justifyContent={'center'}
                    gap={2}
                    width={'100%'}
                >
                    <Grid
                        xs={4}
                        display={'flex'}
                        flexDirection={'column'}
                        alignItems={'center'}
                        justifyContent={'center'}
                    >
                        <TextField
                            label={'Número*'}
                            type="number"
                            placeholder="Número"
                            colorText="white"
                            value={createOng.numero}
                            onChange={(e) => setCreateOng({ ...createOng, numero: Number(e.target.value) })}
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
                        xs={4}
                        display={'flex'}
                        flexDirection={'column'}
                        alignItems={'center'}
                        justifyContent={'center'}
                    >
                        <TextField
                            label={'Complemento*'}
                            type="text"
                            placeholder="Complemento"
                            colorText="white"
                            value={createOng.complemento}
                            onChange={(e) => setCreateOng({ ...createOng, complemento: e.target.value })}
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
                </Grid>
            </Grid>
        </>
    )
}