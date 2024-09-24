import { Grid, Typography } from "@mui/material"
import { QuantityProduct } from "../../../../components/QuantityProduct"

export type FormOneProps = {
    products: {
        productId: string,
        productName: string,
        quantity: number
    }[]
    setProducts: (products: {
        productId: string,
        productName: string,
        quantity: number
    }[]) => void
}
export function FormOne (props: FormOneProps) {
    const { products, setProducts } = props

    const handleClick = (index: number) => {
        const newProducts = [...products];
        newProducts[index].quantity += 1;
        setProducts(newProducts);
    };

    const handleClickBack = (index: number) => {
        const newProducts = [...products];
        if (newProducts[index].quantity > 0) {
            newProducts[index].quantity -= 1;
        }
        setProducts(newProducts);
    };

    return (
        <>
            <Grid
                xs={12}
                display={'flex'}
                alignItems={'center'}
                justifyContent={'center'}
                flexDirection={'column'}
                mt={4}
            >
                <Typography
                    variant={'h6'}
                >
                    Qual produto deseja doar?
                </Typography>
                <Grid>
                    {products.length === 0 && <Typography>Nenhum produto disponível</Typography>}
                    {products.map((item, index) => (
                        <QuantityProduct 
                            label={item.productName}
                            quantity={item.quantity}
                            handleClick={handleClick}
                            handleClickBack={handleClickBack}
                            index={index}
                        />
                    ))}
                </Grid>
            </Grid>
        </>
    )
}