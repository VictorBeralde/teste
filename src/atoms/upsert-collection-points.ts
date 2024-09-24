import { atom } from "jotai"

type BannerCollectionPoints = {
    src: string
    name: string
}

export type UpsertCollectionPointsType = {
    nome: string
    descricao: string
    urlBanner: BannerCollectionPoints | null
    horarioFuncionamento: string
    cep: string
    bairro: string
    logradouro: string
    cidade: string
    numero: string
    complemento: string
    dataDisponivel: Date
}

export const upsertCollectionPointsAtom = atom<UpsertCollectionPointsType>({
    nome: '',
    descricao: '',
    urlBanner: null,
    horarioFuncionamento: '',
    cep: '',
    bairro: '',
    logradouro: '',
    cidade: '',
    numero: '',
    complemento: '',
    dataDisponivel: new Date()
})