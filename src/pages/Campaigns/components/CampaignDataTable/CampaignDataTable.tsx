import { Button, Paper, Popover, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, Typography } from "@mui/material"
import { useState } from "react"
import { format } from "date-fns"
import { HiDotsVertical } from "react-icons/hi"
import { ModalActions } from "../ModalActions"
import { CampanhaResult } from "../../../../../client/campanha-client/types"
import { ImageSelect } from "../../../../components/ImageSelect"

export type CampaignDataTableProps = {
    isLoading: boolean
    isError: boolean
    data: CampanhaResult[]
    pageNumber: number
    pageSize: number
    totalPages: number
    handleChangePage: (value: number) => void
    handleChangePageSize: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
}

export function CampaignDataTable(props: CampaignDataTableProps) {
    const { 
        data,
        isLoading,
        isError,
        totalPages,
        pageSize,
        pageNumber,
        handleChangePage,
        handleChangePageSize
    } = props
    // eslint-disable-next-line no-undef
    const [anchorEl, setAnchorEl] = useState<{ element: HTMLButtonElement | null, id: string | null }>({ element: null, id: null })
    const openPopover = Boolean(anchorEl)
    const id = openPopover ? 'simple-popover' : undefined

    // eslint-disable-next-line no-undef
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>, id: string) => {
        setAnchorEl({ element: event.currentTarget, id });
    };

    const handleClosePopover = () => {
        setAnchorEl({ element: null, id: null });
    };

    return (
        <>
            <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                <TableContainer sx={{ maxHeight: 440 }}>
                    <Table sx={{ minWidth: 700 }} aria-label="customized table">
                        <TableHead>
                            <TableRow>
                                <TableCell align="center">
                                    <Typography variant="h6" fontWeight={700}>
                                        Nome da campanha
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
                            {!isLoading && !isError && data && data.map((row) => (
                                <TableRow key={row.id}>
                                    <TableCell
                                        sx={{ padding: 5 }}
                                    >
                                        {row.nome}
                                    </TableCell>
                                    <TableCell
                                        sx={{ padding: 5 }}
                                    >
                                        {row.descricao}
                                    </TableCell>
                                    <TableCell
                                        sx={{ padding: 5 }}
                                    >
                                        {format(new Date(row.dataFim), "dd/MM/yyyy")}
                                    </TableCell>
                                    <TableCell
                                        sx={{ padding: 5 }}
                                    >
                                        <ImageSelect 
                                            src={row.urlImagem}
                                            index={0}
                                        />
                                    </TableCell>
                                    <TableCell
                                        sx={{ padding: 5 }}
                                    >
                                        <Button
                                            variant="text"
                                            onClick={(event) => handleClick(event, row.id)}
                                        >
                                            <HiDotsVertical fontSize={'20px'} />
                                        </Button>
                                        <Popover
                                            id={id}
                                            open={openPopover && anchorEl.id === row.id}
                                            anchorEl={anchorEl.element}
                                            onClose={handleClosePopover}
                                            disableAutoFocus={true}
                                            anchorOrigin={{
                                                vertical: 'bottom',
                                                horizontal: 'left',
                                            }}
                                        >
                                            <ModalActions 
                                                idCampaign={row.id}
                                                status={row.status}
                                            />
                                        </Popover>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[10, 25, 100]}
                    component="div"
                    count={totalPages}
                    rowsPerPage={pageSize}
                    page={pageNumber}
                    onPageChange={() => handleChangePage}
                    onRowsPerPageChange={() => handleChangePageSize}
                />
            </Paper>
        </>
    )
}