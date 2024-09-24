import { EnderecoResult } from "../../endereco-result"

export type CreateEventCommand = {
    nome: string
    descricao: string
    dtInicio: Date
    dtFim: Date
    imagem: string
    idOng: string | null
    endereco: EnderecoResult
}