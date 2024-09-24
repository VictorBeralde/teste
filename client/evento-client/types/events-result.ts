import { EnderecoResult } from "../../endereco-result"

export type EventsResult = {
    id: number
    nome: string
    descricao: string
    dtInicio: Date
    dtFim: Date
    urlImagem: string
    ong: number
    endereco: EnderecoResult
}