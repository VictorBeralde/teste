import { Button, CircularProgress, Pagination, Paper, Popover, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { CollectionPointsResult } from "../../../../../client/collection-points-client/types";
import { format } from "date-fns";
import { HiDotsVertical } from "react-icons/hi";
import { ImageSelect } from "../../../../components/ImageSelect";
import { CollectionPointsEmpty } from "../CollectionPointsEmpty";
import { CollectionPointsPopover } from "../CollectionPointsPopover";
import { useState } from "react";

export type CollectionPointsDataTableProps = {
    isLoading: boolean
    isError: boolean
    data: CollectionPointsResult[]
    pageNumber: number
    pageSize: number
    totalPages: number
    handleChangePage: (value: number) => void
}

export function CollectionPointsDataTable(props: CollectionPointsDataTableProps) {
    const { data, pageNumber, totalPages, handleChangePage, isLoading } = props

    // eslint-disable-next-line no-undef
    const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null)
    const openPopover = Boolean(anchorEl)
    const id = openPopover ? 'simple-popover' : undefined

    // eslint-disable-next-line no-undef
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget)
    }

    const handleClosePopover = () => {
        setAnchorEl(null)
    }

    return (
        <>
            <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell align="center">
                                    <Typography variant="h6" fontWeight={700}>
                                        Nome do ponto de coleta
                                    </Typography>
                                </TableCell>
                                <TableCell align="center">
                                    <Typography variant="h6" fontWeight={700}>
                                        Descrição
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
                            {isLoading &&
                                <Stack>
                                    <CircularProgress />
                                </Stack>}
                            {data.length === 0 && (
                                <TableRow>
                                    <TableCell colSpan={5} align="center">
                                        <CollectionPointsEmpty />
                                    </TableCell>
                                </TableRow>
                            )}
                            {data.length > 0 && data.map((row) => (
                                <TableRow key={row.id} sx={{ height: '100px' }}>
                                    <TableCell align="center">
                                        <Typography variant="h6">
                                            {row.nome}
                                        </Typography>
                                    </TableCell>
                                    <TableCell align="center">
                                        <Typography variant="h6">
                                            {row.descricao}
                                        </Typography>
                                    </TableCell>
                                    <TableCell align="center">
                                        {row.urlImagem
                                            ? <ImageSelect src={row.urlImagem} index={0} />
                                            : <Typography
                                                variant="h6"
                                            >
                                                Sem imagem
                                            </Typography>}
                                    </TableCell>
                                    <TableCell align="center">
                                        <Button variant="text" onClick={handleClick}>
                                            <HiDotsVertical fontSize={'20px'} />
                                        </Button>
                                        <Popover
                                            id={id}
                                            open={openPopover}
                                            anchorEl={anchorEl}
                                            onClose={handleClosePopover}
                                            disableAutoFocus={true}
                                            anchorOrigin={{
                                                vertical: 'bottom',
                                                horizontal: 'left'
                                            }}
                                        >
                                            <CollectionPointsPopover
                                                idCollectionPoint={row.id}
                                            />
                                        </Popover>
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
                        mt={2}
                        mb={2}
                    >
                        <Pagination
                            count={totalPages}
                            page={pageNumber + 1}
                            onChange={() => handleChangePage}
                        />
                    </Stack>}
            </Paper>
        </>
    )
}