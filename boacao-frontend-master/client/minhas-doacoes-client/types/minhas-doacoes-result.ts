import { EnderecoResult } from '../../endereco-result'
import { DonorResult } from '../../doador-client/types/donor-result'

export type MinhasDoacoesResult = {
    id: string
    quantidade: number
    disponibilidadeEntrega: boolean
    feedback: string
    situacao: string
    imagensDoacao: string[]
    endereco: EnderecoResult
    doador: DonorResult
    idCampanha: string
    dtCriacao: Date
    produtosDoacao: ProductsDonations[]
    codigo: string
}

export type ProductsDonations = {
    idProduto: string
    nomeProduto: string
    quantidade: number
}