import { EnderecoResult } from "./endereco-result"
import { TelefoneResult } from "./telefone-result"

export type UsuarioResult = {
    id: number
    nome: string
    email: string
    tipo: string
    endereco: EnderecoResult
    telefones: TelefoneResult[]
}