import { OngResult } from "../../ong-client/types/ong-result";

export type EventByIdResult = {
    id: string
    data_fim: Date
    data_inicio: Date
    nome: string
    descricao: string
    ong: OngResult
    urlImagem: string
}