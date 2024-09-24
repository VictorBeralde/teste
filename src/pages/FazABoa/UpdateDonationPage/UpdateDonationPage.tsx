import { useParams } from "react-router-dom"
import { useDonationsById } from "../../../hooks/useDonation/use-donation-by-id"
import { CircularProgress, Grid, Typography } from "@mui/material"
import { FazABoa } from "../FazABoa"

export function UpdateDonationPage() {
    const { donationId } = useParams<{ donationId: string }>()
    const { data, isLoading, isError } = useDonationsById(donationId || '')

    return (
        <>
            {isLoading &&
                <Grid
                    display={'flex'}
                    alignItems={'center'}
                    justifyContent={'center'}
                >
                    <CircularProgress />
                </Grid>}
            {isError && <Typography> Erro ao carregar doação </Typography>}
            {!isLoading && !isError && data &&
                <FazABoa
                    variant="update"
                    donation={data}
                />}
        </>
    )
}