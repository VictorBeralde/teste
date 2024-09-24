import { useAtom } from "jotai";
import { upsertCampaignAtom } from "../../../../atoms/upsert-campaign-atom";
import { Autocomplete, Grid } from "@mui/material";
import { format } from "date-fns";
import TextField from "../../../../components/TextField/TextField";
import { useProducts } from "../../../../hooks/useProduct/use-products";

export function CampaignFormTwo() {
    const [campaignAtom, setCampaignAtom] = useAtom(upsertCampaignAtom);

    const { data: products, isLoading, isError } = useProducts();

    const handleDateChange = (field: any, value: any) => {
        const date = new Date(value);
        const localDate = new Date(date.getTime() + date.getTimezoneOffset() * 60000);
        setCampaignAtom((prev) => ({ ...prev, [field]: localDate }));
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
                    alignContent={'center'}
                    justifyContent={'center'}
                >
                    <Autocomplete
                        multiple
                        value={campaignAtom.fkProduto || []}
                        id="produtos"
                        loading={isLoading}
                        loadingText="Carregando produtos..."
                        noOptionsText={isError ? "Erro ao carregar produtos" : "Nenhum produto encontrado"}
                        options={products || []}
                        getOptionLabel={(option) => option.nomeProduto}
                        onChange={(_, value) => {
                            setCampaignAtom((prev) => ({
                                ...prev,
                                fkProduto: value
                            }));
                        }}
                        fullWidth
                        renderInput={(params) => (
                            <TextField
                                error={isError}
                                label="Produtos"
                                {...params}
                            />
                        )}
                    />
                </Grid>
                <Grid
                    xs={12}
                    display={'flex'}
                    alignContent={'center'}
                    justifyContent={'center'}
                    mt={3}
                >
                    <TextField
                        value={format(campaignAtom.dataDeFim, "yyyy-MM-dd")}
                        type="date"
                        label="Data de término da campanha"
                        onChange={(event) => handleDateChange('dataDeFim', event.target.value)}
                    />
                </Grid>
            </Grid>
        </>
    );
}
