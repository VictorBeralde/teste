import { Grid } from "@mui/material";
import TextField from "../../../../components/TextField/TextField";
import { useAtom } from "jotai";
import { upsertCampaignAtom } from "../../../../atoms/upsert-campaign-atom";


export function CampaignFormOne() {
    const [campaignAtom, setCampaignAtom] = useAtom(upsertCampaignAtom)

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
                    <TextField
                        value={campaignAtom.nome}
                        type="text"
                        label="Nome da campanha"
                        placeholder="Título"
                        onChange={(event) => setCampaignAtom((prev: any) => ({ ...prev, nome: event.target.value }))}
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
                        value={campaignAtom.descricao}
                        type="text"
                        label="Descrição da campanha"
                        placeholder="Descrição"
                        onChange={(event) => setCampaignAtom((prev: any) => ({ ...prev, descricao: event.target.value }))}
                    />
                </Grid>
            </Grid>
        </>
    )
}