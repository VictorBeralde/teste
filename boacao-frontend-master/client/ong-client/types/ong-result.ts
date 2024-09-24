import { UsuarioResult } from '../../usuario-result'

export type OngResult = {
    id: string
    cnpj: string 
    urlLogo: string
    usuario: UsuarioResult
    favoritada: boolean
    chavesPix: ChavePix[]
    linkSite: string
    descricao: string
    urlImagensGaleria: OngImages[]
    urlImagem: string
    horarioFuncionamento: string
}

export type OngImages = {
    id: string
    urlImagem: string
}

export type ChavePix = {
    idChavePix: string
    chave: string
    tipo: string
}