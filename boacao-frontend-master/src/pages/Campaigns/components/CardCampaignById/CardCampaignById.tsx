import { Box, Card, CardContent, Stack, Typography } from "@mui/material";
import { format } from "date-fns";
import TextField from "../../../../components/TextField/TextField";
import BoAcaoBanner from '../../../../assets/boAcao-banner.svg'
import { ProductsResult } from "../../../../../client/produto-client/types/products-result";

export type CardCampaignByIdProps = {
    title: string
    description: string
    urlBanner: string
    products: ProductsResult[]
    endDate: Date
}

export function CardCampaignById(props: CardCampaignByIdProps) {
    const { title, description, urlBanner, products, endDate } = props
    return (
        <>
            <Card
                sx={{
                    width: '90%',
                }}
            >
                <CardContent>
                    <Stack
                        display={'flex'}
                        alignItems={'center'}
                        justifyContent={'center'}
                        direction={'row'}
                        gap={2}
                    >
                        <Typography
                            variant="subtitle1"
                            fontWeight={'bold'}
                            width={'90%'}
                            textAlign={'center'}
                        >
                            {title || ''}
                        </Typography>
                        <Stack
                            width={'30%'}
                        >
                            <TextField
                                value={format(new Date(), 'dd-MM-yyyy')}
                                type="date"
                            />
                        </Stack>
                    </Stack>
                    <Stack
                        display={'flex'}
                        alignItems={'center'}
                        justifyContent={'center'}
                        direction={'row'}
                        mt={2}
                    >
                        <Stack
                            width={'50%'}
                        >
                            <Typography
                                variant="subtitle2"
                            >
                                {description || ''}
                            </Typography>
                            <Typography
                                variant="subtitle2"
                            >
                                Data de encerramento: {format(endDate, 'dd/MM/yyyy') || ''}
                            </Typography>
                            <Typography
                                variant="subtitle2"
                            >
                                Produtos:
                            </Typography>
                            {products.map((product) => (
                                <Typography variant="subtitle2" key={product.nomeProduto}>
                                    ● {product.nomeProduto}
                                </Typography>
                            ))}
                        </Stack>
                        <Box
                            component="img"
                            src={urlBanner || BoAcaoBanner}
                            alt="Campanha"
                            sx={{
                                maxHeight: '250px',
                                maxWidth: '100%',
                                objectFit: 'contain',
                                borderRadius: '10px'
                            }}
                        />
                    </Stack>
                </CardContent>
            </Card>
        </>
    )
}