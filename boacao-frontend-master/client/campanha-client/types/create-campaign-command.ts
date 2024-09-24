export type CreateCampaignCommand = {
    nome: string
    descricao: string
    idProdutos: string[]
    idOng: string | null
    dtInicio: Date
    dtFim: Date
    disponibilidadeDeBusca: boolean
    raioDeBusca?: number
}