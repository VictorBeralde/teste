import { Button, CircularProgress, Grid, Popover, Stack, useMediaQuery, useTheme } from "@mui/material";
import { useEffect, useState } from "react";
import { HiFunnel } from "react-icons/hi2";
import { CardTriagem } from "../../components/CardTriagem";
import Typography from '@mui/material/Typography';
import TextField from '../../components/TextField/TextField';
import { format } from "date-fns";
import { upsertEventAtom } from "../../atoms/upsert-event";
import { useAtom } from "jotai";
import { useDonationsByOngId } from "../../hooks/useDonation/use-donations-by-ong-id";
import { ModalCancel } from "./components/ModalCancel";
import { ModalFeedback } from "./components/ModalFeedback";
import { useUpdateDonationStatusById } from "../../hooks/useDonation/use-update-donation-status-by-id";
import { ModalProducts } from "./components/ModalProducts";
import { MinhasDoacoesResult, ProductsDonations } from "../../../client/minhas-doacoes-client/types";
import { ModalStatusFilter } from "./components/ModalStatusFilter";

export function Triagem() {
    const idOng = sessionStorage.getItem('userType');
    const [eventAtom, setEventAtom] = useAtom(upsertEventAtom);
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.down('sm'));
    const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
    const [open, setOpen] = useState(false);
    const [openFeedback, setOpenFeedback] = useState(false);
    const [openProducts, setOpenProducts] = useState(false);
    const [products, setProducts] = useState<ProductsDonations[]>([]);
    const [images, setImages] = useState<string[]>([]);
    const [idDonation, setIdDonation] = useState<string>('');
    const [situation, setSituation] = useState<string>('PENDENTE');
    const { data, isLoading, isError } = useDonationsByOngId(idOng || '', { page: 0, size: 10, sort: 'asc', situacao: situation });
    const { mutateAsync: updateDonationStatus } = useUpdateDonationStatusById(idDonation);
    const [anchorElFilter, setAnchorElFilter] = useState<HTMLButtonElement | null>(null);
    
    const [donationQueue, setDonationQueue] = useState<MinhasDoacoesResult[]>([]);

    const enqueue = (donation: any) => {
        setDonationQueue(prevQueue => [...prevQueue, donation]);
    };    

    useEffect(() => {
        if (data && data.length > 0) {
            setDonationQueue([]);
            data.forEach(donation => {
                enqueue(donation);
            });
        }
    }, [data]);


    const handleClosePopover = () => {
        setAnchorEl(null);
    };

    const handleClickFilter = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorElFilter(event.currentTarget);
    };

    const handleClosePopoverFilter = () => {
        setAnchorElFilter(null);
    };

    const handleUpdateStatus = async (id: string, status: 'PENDENTE' | 'ACEITA' | 'NEGADA', feedback?: string | null) => {
        await setIdDonation(id);
        await updateDonationStatus({
            situacao: status,
            feedback: feedback || 'sem feedback'
        });
    };

    return (
        <>
            <ModalCancel
                open={open}
                setOpen={setOpen}
                phone={'(11) 99999-9999'}
                setOpenFeedback={setOpenFeedback}
            />
            <ModalFeedback
                idDonation={idDonation}
                open={openFeedback}
                setOpen={setOpenFeedback}
                handleUpdateStatus={handleUpdateStatus}
            />
            <ModalProducts
                open={openProducts}
                setOpen={setOpenProducts}
                products={products}
                images={images || []}
            />
            <Grid container display="flex" flexDirection="column">
                <Grid
                    item
                    xs={12}
                    sx={{
                        display: 'flex',
                        flexDirection: 'row'
                    }}
                    mt={matches ? 7 : 0}>
                    <Grid
                        xs={10}
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                        }}
                    >
                        <Typography variant="subtitle1" fontWeight="bold">
                            Triagem das doações
                        </Typography>
                    </Grid>
                    <Grid
                        sx={{
                            display: 'flex',
                            justifyContent: 'flex-end',
                            alignItems: 'center'
                        }}
                        xs={6}
                    >
                        <Grid
                           
                            display={'flex'}
                            justifyContent={'flex-end'}
                        >
                            <TextField
                                value={format(new Date(eventAtom.dataInicio), "yyyy-MM-dd")}
                                type="date"
                                onChange={(event) => setEventAtom((prev: any) => ({ ...prev, dataInicio: new Date(event.target.value) }))}
                            />
                        </Grid>
                        <Grid
                            
                            display={'flex'}
                            flexDirection={'row'}
                            justifyContent={'flex-end'}
                            gap={2}
                        >
                            <Grid
                                xs={6}
                                sx={{
                                    display: 'flex',
                                    justifyContent: 'flex-end',
                                    alignItems: 'center'
                                }}
                            >
                                <Stack direction="row" spacing={2}>
                                    <Button onClick={handleClickFilter}>
                                        <HiFunnel style={{ fontSize: '35px', color: "black" }} />
                                    </Button>
                                    <Popover
                                        id="filter-popover"
                                        open={Boolean(anchorElFilter)}
                                        anchorEl={anchorElFilter}
                                        onClose={handleClosePopoverFilter}
                                        disableAutoFocus
                                        anchorOrigin={{
                                            vertical: 'bottom',
                                            horizontal: 'left',
                                        }}
                                    >
                                        <ModalStatusFilter 
                                            situation={situation}
                                            setSituation={setSituation}
                                        />
                                    </Popover>
                                    <Popover
                                        id="bell-popover"
                                        open={Boolean(anchorEl)}
                                        anchorEl={anchorEl}
                                        onClose={handleClosePopover}
                                        disableAutoFocus
                                        anchorOrigin={{
                                            vertical: 'bottom',
                                            horizontal: 'left',
                                        }}
                                    >
                                        <Typography>Conteúdo do popover do sino</Typography>
                                    </Popover>
                                </Stack>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
                {isLoading &&
                    <Grid
                        item
                        xs={12}
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}
                    >
                        <CircularProgress />
                    </Grid>}
                {isError && <Typography variant="h6">Erro ao carregar as doações</Typography>}
                {!isLoading && !isError && donationQueue.length > 0 &&
                    <Grid
                        item
                        xs={12}
                        sx={{
                            display: 'flex',
                            alignItems: 'stretch',
                            gap: 2,
                            mt: 5,
                            height: '100%'
                        }}
                    >
                        {donationQueue.map((donation) => (
                            <Grid
                                xs={4}
                                item
                                display={'flex'}
                                alignItems={'center'}
                                justifyContent={'center'}
                                flexDirection={'column'}
                                key={donation.id}
                            >
                                <CardTriagem
                                    idDonation={donation.id}
                                    titleCard={donation.codigo || 'Sem código'}
                                    address={`${donation.endereco.logradouro + ', ' + donation.endereco.numero + ' - ' + donation.endereco.bairro + ', ' + donation.endereco.cidade + ' - ' + donation.endereco.estado}`}
                                    setOpen={setOpen}
                                    setIdDonation={setIdDonation}
                                    images={donation.imagensDoacao}
                                    setImages={setImages}
                                    products={donation.produtosDoacao}
                                    setProducts={setProducts}
                                    setOpenProducts={setOpenProducts}
                                    handleUpdateStatus={handleUpdateStatus}
                                    dtDonation={donation.dtCriacao}
                                />
                            </Grid>
                        ))}
                    </Grid>}
            </Grid >
        </>
    );
}
