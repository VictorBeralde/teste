import { EnderecoResult } from "../../endereco-result"
import { OngResult } from "../../ong-client/types"
import { ProductsResult } from "../../produto-client/types/products-result"

export type CampanhaResult = {
    id: string
    nome: string
    descricao: string
    dataInicio: Date
    dataFim: Date
    disponibilidadeBusca: boolean
    urlImagem: string
    raioDeBusca: number
    ong: OngResult
    produtos: ProductsResult[]
    endereco: EnderecoResult
    status: string
}