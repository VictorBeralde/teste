import { Button, CircularProgress, Grid, Stack, Typography, useMediaQuery, useTheme } from "@mui/material"
import { useCollectionPointsPage } from "../../../hooks/useCollectionPoints/use-collection-points-page"
import { Search } from "../../../components/Search"
import { HiOutlinePlus } from "react-icons/hi"
import { useNavigate } from "react-router-dom"
import { useState } from "react"
import { CollectionPointsDataTable } from "../components/CollectionPointsDataTable"

export function CollectionPointsIndexPage() {

    const idOng = sessionStorage.getItem('userId') || ''
    const [page, setPage] = useState(0)
    const [size] = useState(5)
    const [query, setQuery] = useState({ page, size, sort: 'asc', nome: null || '' })
    const { data: collectionPoints, isLoading, isError } = useCollectionPointsPage(idOng, query)
    const theme = useTheme()
    const matches = useMediaQuery(theme.breakpoints.down('sm'))
    const navigate = useNavigate()

    const handleChangePage = (value: number) => {
        setPage(value);
        setQuery(prev => ({ ...prev, page: value - 1 }));
    }

    return (
        <>
            <Grid
                container
            >
                <Grid
                    item
                    xs={12}
                    display="flex"
                    flexDirection="column"
                    mt={matches ? 7 : 0}
                >
                    {isError && <Typography variant="h6" mt={4}>Erro ao carregar pontos de coletas</Typography>}
                    {isLoading &&
                        <Grid
                            item
                            xs={12}
                            display="flex"
                            justifyContent="center"
                            alignItems="center"
                            flexDirection="column"
                            mt={4}
                        >
                            <CircularProgress />
                        </Grid>}
                    <Grid
                        item
                        xs={12}
                        display="flex"
                        flexDirection="row"
                        alignItems="start"
                        justifyContent="space-between"
                        gap={2}
                    >
                        {!isLoading && !isError &&
                            <>
                                <Typography
                                    variant="subtitle1"
                                    fontWeight="bold"
                                    textAlign="start"
                                    lineHeight={1}
                                >
                                    {collectionPoints && collectionPoints.content.length > 0 && 'Pontos de coleta'}
                                    {collectionPoints && collectionPoints.content.length === 0 && 'Ops... Parece que você não tem nenhum ponto de coleta criado. Vamos criar um?'}
                                </Typography>
                                <Stack
                                    direction={'row'}
                                    gap={2}
                                >
                                    {collectionPoints && collectionPoints.content.length > 0 &&
                                        <Search
                                            label="Pesquisar"
                                            onChange={value => setQuery({ ...query, nome: value })}
                                            value={query.nome}
                                        />}
                                    <Button
                                        variant="contained"
                                        sx={{
                                            backgroundColor: '#375A88',
                                            borderRadius: '10px',
                                        }}
                                        onClick={() => navigate('/pontos-de-coleta/criar-ponto-de-coleta')}
                                    >
                                        <HiOutlinePlus fontSize={'35px'} color="white" />
                                    </Button>
                                </Stack>
                            </>}
                    </Grid>
                </Grid>
                {collectionPoints &&
                    <Grid
                        item
                        xs={12}
                        display="flex"
                        flexDirection="column"
                        mt={4}
                    >
                        <CollectionPointsDataTable
                            data={collectionPoints ? collectionPoints.content : []}
                            totalPages={collectionPoints ? collectionPoints.totalPages : 0}
                            pageNumber={collectionPoints ? collectionPoints.pageable.pageNumber : 0}
                            handleChangePage={handleChangePage}
                            isError={isError}
                            isLoading={isLoading}
                            pageSize={collectionPoints ? collectionPoints.pageable.pageSize : 0}
                        />
                    </Grid>}
            </Grid>
        </>
    )
}