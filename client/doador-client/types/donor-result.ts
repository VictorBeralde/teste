import { UsuarioResult } from "../../usuario-result"

export type DonorResult = {
    id: number
    cpf: string
    usuario: UsuarioResult
    urlImagem: string
}