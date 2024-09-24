export type CreateDonationCommand = {
    produtoQuantidade: QuantityProduct[]
    idDoador?: string | null
    idCampanha: string
    cep?: string | null
    bairro: string
    logradouro?: string | null
    cidade: string
    estado: string
    numero: number
    complemento?: string | null
    disponibilidadeEntrega: boolean
}

type QuantityProduct = {
    idProduto: string;
    quantidade: number;
}