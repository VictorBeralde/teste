import { atom } from "jotai"
import { ProductsResult } from "../../client/produto-client/types/products-result"

export type UpsertCampaignType = {
    nome: string
    descricao: string
    disponibilidadeDeBusca: boolean
    status: string
    dataDeInicio: Date
    dataDeFim: Date
    fkOng: string
    fkProduto: ProductsResult[]
    urlBanner: string
    distance?: number
}

export const upsertCampaignAtom = atom<UpsertCampaignType>({
    nome: '',
    descricao: '',
    disponibilidadeDeBusca: false,
    status: '',
    dataDeInicio: new Date(),
    dataDeFim: new Date(),
    fkOng: '',
    fkProduto: [],
    urlBanner: '',
    distance: 10
})
