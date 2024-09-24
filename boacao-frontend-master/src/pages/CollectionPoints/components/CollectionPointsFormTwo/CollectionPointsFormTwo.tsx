import { Grid } from "@mui/material";
import { upsertCollectionPointsAtom } from "../../../../atoms/upsert-collection-points";
import { useAtom } from "jotai";
import { format } from "date-fns";
import TextField from "../../../../components/TextField/TextField";
import { useState } from "react";

export function CollectionPointsFormTwo() {
    const [CollectionPointsAtom, setCollectionPointsAtom] = useAtom(upsertCollectionPointsAtom);
    const [cepError, setCepError] = useState(false);

    const handleDateChange = (field: any, value: any) => {
        const date = new Date(value);
        const localDate = new Date(date.getTime() + date.getTimezoneOffset() * 60000);
        setCollectionPointsAtom((prev) => ({ ...prev, [field]: localDate }));
    };

    const handleCepChange = async (cep: string) => {
        const cleanCep = cep.replace(/\D/g, '');
        setCollectionPointsAtom((prev) => ({ ...prev, cep: cleanCep }));

        if (cleanCep.length === 8) {
            try {
                const response = await fetch(`https://viacep.com.br/ws/${cleanCep}/json/`);
                const data = await response.json();

                if (data.erro) {
                    setCepError(true);
                    setCollectionPointsAtom((prev) => ({
                        ...prev,
                        bairro: '',
                        logradouro: '',
                        cidade: '',
                    }));
                } else {
                    setCepError(false);
                    setCollectionPointsAtom((prev) => ({
                        ...prev,
                        bairro: data.bairro,
                        logradouro: data.logradouro,
                        cidade: data.localidade,
                        uf: data.uf,
                    }));
                }
            } catch (error) {
                setCepError(true);
                setCollectionPointsAtom((prev) => ({
                    ...prev,
                    bairro: '',
                    logradouro: '',
                    cidade: '',
                }));
            }
        } else {
            setCepError(true);
            setCollectionPointsAtom((prev) => ({
                ...prev,
                bairro: '',
                logradouro: '',
                cidade: '',
            }));
        }
    };

    return (
        <>
            <Grid
                item
                xs={12}
                display={'flex'}
                justifyContent={'center'}
                alignItems={'center'}
                flexDirection={'column'}
                mt={4}
            >
                <Grid
                    xs={12}
                    display={'flex'}
                    direction={'row'}
                    gap={2}
                >
                    <Grid
                        xs={12}
                        display={'flex'}
                    >
                        <TextField
                            value={CollectionPointsAtom.cep}
                            type="text"
                            label="Cep"
                            placeholder="CEP"
                            error={cepError}
                            helperText={cepError ? "CEP inválido ou incompleto" : ""}
                            onChange={(event) => handleCepChange(event.target.value)}
                        />
                    </Grid>
                    <Grid
                        xs={12}
                        display={'flex'}
                    >
                        <TextField
                            value={CollectionPointsAtom.bairro}
                            type="text"
                            label="Bairro"
                            placeholder="Bairro"
                            onChange={(event) => setCollectionPointsAtom((prev: any) => ({ ...prev, bairro: event.target.value }))}
                            disabled
                        />
                    </Grid>
                </Grid>
                <Grid
                    xs={12}
                    display={'flex'}
                    direction={'row'}
                    gap={2}
                    mt={2}
                >
                    <Grid
                        xs={12}
                        display={'flex'}
                    >
                        <TextField
                            value={CollectionPointsAtom.logradouro}
                            type="text"
                            label="Logradouro"
                            placeholder="Logradouro"
                            onChange={(event) => setCollectionPointsAtom((prev: any) => ({ ...prev, logradouro: event.target.value }))}
                            disabled
                        />
                    </Grid>
                    <Grid
                        xs={12}
                        display={'flex'}
                    >
                        <TextField
                            value={CollectionPointsAtom.cidade}
                            type="text"
                            label="Cidade"
                            placeholder="Cidade"
                            onChange={(event) => setCollectionPointsAtom((prev: any) => ({ ...prev, cidade: event.target.value }))}
                            disabled
                        />
                    </Grid>
                </Grid>
                <Grid
                    xs={12}
                    display={'flex'}
                    direction={'row'}
                    gap={2}
                    mt={2}
                >
                    <Grid
                        xs={12}
                        display={'flex'}
                    >
                        <TextField
                            value={CollectionPointsAtom.numero}
                            type="text"
                            label="Número"
                            placeholder="Número"
                            onChange={(event) => setCollectionPointsAtom((prev: any) => ({ ...prev, numero: event.target.value }))}
                        />
                    </Grid>
                    <Grid
                        xs={12}
                        display={'flex'}
                    >
                        <TextField
                            value={CollectionPointsAtom.complemento}
                            type="text"
                            label="Complemento"
                            placeholder="Complemento"
                            onChange={(event) => setCollectionPointsAtom((prev: any) => ({ ...prev, complemento: event.target.value }))}
                        />
                    </Grid>
                </Grid>
                <Grid
                    xs={5}
                    display={'flex'}
                    mt={2}
                >
                    <TextField
                        value={format(new Date(CollectionPointsAtom.dataDisponivel), "yyyy-MM-dd")}
                        type="date"
                        label="Data que o ponto de coleta estará disponível"
                        onChange={(event) => handleDateChange('dataDisponivel', event.target.value)}
                    />
                </Grid>
            </Grid>
        </>
    );
}
