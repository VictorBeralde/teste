import { EnderecoResult } from "../../endereco-result"

export type UpdateDonationByIdCommand = {
    disponibilidadeEntrega: boolean
    endereco: EnderecoResult
}