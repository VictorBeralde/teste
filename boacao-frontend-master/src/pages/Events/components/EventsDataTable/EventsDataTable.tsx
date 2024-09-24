import { Button, Pagination, Paper, Popover, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, Typography } from "@mui/material";
import { EventByIdResult } from "../../../../../client/evento-client/types";
import { format } from "date-fns";
import { HiDotsVertical } from "react-icons/hi";
import { ImageSelect } from "../../../../components/ImageSelect";
import { EventsEmpty } from "../EventsEmpty";

export type EventsDataTableProps = {
    isLoading: boolean
    isError: boolean
    data: EventByIdResult[]
    pageNumber: number
    pageSize: number
    totalPages: number
    handleChangePage: (value: number) => void
}

export function EventsDataTable(props: EventsDataTableProps) {
    const { isLoading, isError, data, pageNumber, pageSize, totalPages, handleChangePage } = props
    return (
        <>
            <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell align="center">
                                    <Typography variant="h6" fontWeight={700}>
                                        Nome do evento
                                    </Typography>
                                </TableCell>
                                <TableCell align="center">
                                    <Typography variant="h6" fontWeight={700}>
                                        Descrição
                                    </Typography>
                                </TableCell>
                                <TableCell align="center">
                                    <Typography variant="h6" fontWeight={700}>
                                        Data fim
                                    </Typography>
                                </TableCell>
                                <TableCell align="center">
                                    <Typography variant="h6" fontWeight={700}>
                                        Banner
                                    </Typography>
                                </TableCell>
                                <TableCell align="center">
                                    <Typography variant="h6" fontWeight={700}>
                                        Ações
                                    </Typography>
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {data.length === 0 && (
                                <TableRow>
                                    <TableCell colSpan={5} align="center">
                                        <EventsEmpty />
                                    </TableCell>
                                </TableRow>
                            )}
                            {data.length > 0 && data.map((row) => (
                                <TableRow key={row.id}>
                                    <TableCell sx={{ padding: 5 }}>
                                        {row.nome}
                                    </TableCell>
                                    <TableCell sx={{ padding: 5 }}>
                                        {row.descricao}
                                    </TableCell>
                                    <TableCell sx={{ padding: 5 }}>
                                        {format(new Date(row.data_fim), "dd/MM/yyyy")}
                                    </TableCell>
                                    <TableCell sx={{ padding: 5 }}>
                                        <ImageSelect src={row.urlImagem} index={0} />
                                    </TableCell>
                                    <TableCell sx={{ padding: 5 }}>
                                        <Button variant="text">
                                            <HiDotsVertical fontSize={'20px'} />
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                {totalPages > 0 &&
                    <Stack
                        width={'100%'}
                        display={'flex'}
                        alignItems={'center'}
                        justifyContent={'center'}
                    >
                        <Pagination
                            count={10}
                            page={pageNumber + 1}
                            onChange={() => handleChangePage}
                        />
                    </Stack>}
            </Paper>
        </>
    )
}