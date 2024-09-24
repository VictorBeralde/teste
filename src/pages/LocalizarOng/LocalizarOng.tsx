import { Button, CircularProgress, Grid, Pagination, Typography, useMediaQuery, useTheme } from "@mui/material";
import { useState } from "react";
import TextField from "../../components/TextField/TextField";
import { LocalizarOngVazia } from "./components/LocalizarOngVazia";
import { CardLocation } from "../../components/CardLocation";
import { useDeleteFavoriteOng } from "../../hooks/useOng/use-delete-favorite-ong";
import { useCreateFavoriteOng } from "../../hooks/useOng/use-create-favorite-ong";
import { useNearOngs } from "../../hooks/useOng/use-near-ongs";

export function LocalizarOng() {
    const theme = useTheme()
    const matches = useMediaQuery(theme.breakpoints.down('sm'))
    const matchesTwo = useMediaQuery(theme.breakpoints.down('md'));
    const idDoador = sessionStorage.getItem('userId')
    const [submit, setSubmit] = useState(false)
    const { mutateAsync: deleteFavorite } = useDeleteFavoriteOng()
    const { mutateAsync: createFavorite } = useCreateFavoriteOng()
    const [page, setPage] = useState(0)
    const [size] = useState(12)
    const [query, setQuery] = useState({
        cep: '',
        distance: ''
    })

    const { data, isLoading, isError, refetch } = useNearOngs(
        query.cep,
        query.distance,
        { idDoador: idDoador || '', page: page, size: size, sort: 'asc' },
        submit
    )

    const handleClear = () => {
        setQuery({
            cep: '',
            distance: ''
        })
        setSubmit(false)
    }

    const handleSearch = () => {
        setSubmit(true)
        refetch()
    };

    const handleIsFavorited = async (idOng: string, favorite: boolean) => {
        if (favorite) {
            deleteFavorite({ idDonor: idDoador || '', idOng: idOng, })
            refetch()
        } else {
            createFavorite({ idDonor: idDoador || '', idOng: idOng })
            refetch()
        }
    }

    const handleChangePage = (value: number) => {
        setPage(value - 1);
        refetch();
    }
    

    return (
        <>
            <Grid
                container
                display={'flex'}
                flexDirection={'column'}
            >
                <Grid
                    item
                    xs={12}
                    sx={{
                        display: 'flex',
                        flexDirection: 'row'
                    }}
                    mt={matches ? 7 : 0}
                >
                    <Grid
                        xs={12}
                        sx={{
                            display: 'flex',
                        }}
                    >
                        <Typography
                            variant={matches ? 'h3' : 'subtitle1'}
                            fontWeight={'bold'}
                            textAlign={matches ? 'center' : 'start'}
                        >
                            Encontre ONGs próximas de você
                        </Typography>
                    </Grid>
                </Grid>
                <Grid
                    item
                    xs={12}
                    display={'flex'}
                    justifyContent={'center'}
                    alignItems={'center'}
                    direction={matches ? 'column' : 'row'}
                    gap={2}
                    mt={matches ? 5 : 0}
                >
                    <Grid
                        xs={matches ? 12 : 6}
                        display={'flex'}
                        alignItems={'center'}
                        justifyContent={'flex-end'}
                    >
                        <Grid
                            xs={matches ? 12 : 8}
                            display={'flex'}
                        >
                            <TextField
                                value={query.cep}
                                label="CEP"
                                placeholder="Digite o CEP"
                                onChange={(event) => {
                                    setQuery({ ...query, cep: event.target.value })
                                    if (event.target.value === '') {
                                        setSubmit(false)
                                    }
                                }}
                            />
                        </Grid>
                    </Grid>
                    <Grid
                        xs={matches ? 12 : 6}
                        display={'flex'}
                        alignItems={'center'}
                        justifyContent={'flex-start'}
                    >
                        <Grid
                            xs={matches ? 12 : 8}
                            display={'flex'}
                            alignItems={'center'}
                        >
                            <TextField
                                value={query.distance}
                                label="Até quantos KM?"
                                placeholder="KM"
                                onChange={(event) => {
                                    setQuery({ ...query, distance: event.target.value })
                                    if (event.target.value === '') {
                                        setSubmit(false)
                                    }
                                }}
                            />
                        </Grid>
                    </Grid>
                </Grid>
                <Grid
                    item
                    xs={matches ? 12 : 10}
                    display={'flex'}
                    justifyContent={matches ? 'center' :'flex-end'}
                    mt={2}
                    gap={2}
                >
                    <Button
                        variant={'text'}
                        sx={{
                            color: '#375A88',
                            fontSize: '16px'
                        }}
                        onClick={handleClear}
                    >
                        Limpar pesquisa
                    </Button>
                    <Button
                        disabled={query.cep === '' || query.distance === ''}
                        variant={'contained'}
                        sx={{
                            backgroundColor: '#375A88',
                            fontSize: '16px'
                        }}
                        onClick={handleSearch}
                    >
                        Pesquisar
                    </Button>
                </Grid>
                <Grid
                    xs={12}
                    display={'flex'}
                    alignContent={'center'}
                    justifyContent={'center'}
                    gap={3}
                    flexWrap={'wrap'}
                >
                    {isLoading &&
                        <Grid xs={4} mt={8} display={'flex'} alignItems={'center'} justifyContent={'center'}>
                            <CircularProgress />
                        </Grid>}
                    {isError && <>Erro ao carregar ongs próximas</>}
                    {!isLoading && !isError && (data === undefined || data.content.length === 0) &&
                        <Grid xs={matches ? 12 : 4} mt={8}>
                            <LocalizarOngVazia />
                        </Grid>}
                    {!isLoading && !isError && data && data.content.length > 0 && data.content.map((ong) => (
                        <Grid xs={matches ? 12 : matchesTwo ? 5 : 3} mt={1}>
                            <CardLocation
                                title={ong.nome ?? null}
                                address={ong.logradouro + ', ' + ong.numero}
                                distance={ong.distancia}
                                img={ong.urlImagem ?? null}
                                isFavorited={ong.favoritada}
                                idOng={ong.id.toString()}
                                handleIsFavorited={handleIsFavorited}
                                latitude={ong.latLong !== null && ong.latLong !== undefined ? ong.latLong.lat : ''}
                                longitude={ong.latLong !== null && ong.latLong !== undefined ? ong.latLong.lon : ''}
                            />
                        </Grid>
                    ))}
                    {data &&
                        <Grid
                            xs={12}
                            display={'flex'}
                            justifyContent={'center'}
                            alignItems={'center'}
                        >
                            <Pagination
                                count={data.totalPages || 0}
                                page={data.pageable.pageNumber + 1}
                                onChange={() => handleChangePage}
                            />
                        </Grid>}
                </Grid>
            </Grid >
        </>
    )
}