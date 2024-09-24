import { Button, CircularProgress, Grid, Stack, Typography, useMediaQuery, useTheme } from "@mui/material";
import { HiOutlinePlus } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import { useEventsByOngId } from "../../../hooks/useEvent/use-event-by-id";
import { EventsDataTable } from "../components/EventsDataTable";
import { useState } from "react";
import { EventQuery } from "../../../../client/evento-client/types";
import { Search } from "../../../components/Search";

export function EventsIndexPage() {
    const idOng = sessionStorage.getItem('userId') || ''
    const navigate = useNavigate();
    const theme = useTheme()
    const matches = useMediaQuery(theme.breakpoints.down('sm'))
    const [page, setPage] = useState(0)
    const [size] = useState(5)
    const [query, setQuery] = useState<EventQuery>({ page: page, size: size, sort: 'asc', nome: null || '' })
    const { data: events, isLoading, isError } = useEventsByOngId(idOng, query)

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
                    {isError && <Typography variant="h6" mt={4}>Erro ao carregar eventos</Typography>}
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
                                    {events && events.content.length > 0 && 'Eventos'}
                                    {events && events.content.length === 0 && 'Ops... Parece que você não tem nenhum evento criado. Vamos criar um?'}
                                </Typography>
                                <Stack>
                                    {events && events.content.length > 0 &&
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
                                        onClick={() => navigate('/eventos/criar-evento')}
                                    >
                                        <HiOutlinePlus fontSize={'35px'} color="white" />
                                    </Button>
                                </Stack>
                            </>}
                    </Grid>
                </Grid>
                {events &&
                    <Grid
                        item
                        xs={12}
                        display="flex"
                        flexDirection="column"
                        mt={4}
                    >
                        <EventsDataTable
                            data={events ? events.content : []}
                            isLoading={isLoading}
                            isError={isError}
                            totalPages={events ? events.totalPages : 0}
                            pageNumber={events ? events.pageable.pageNumber : 0}
                            pageSize={events ? events.pageable.pageSize : 0}
                            handleChangePage={handleChangePage}
                        />
                    </Grid>}
            </Grid>
        </>
    );
}