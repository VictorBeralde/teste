import { atom } from "jotai"

type BannerEvent = {
  src: string
  name: string
}

export type UpsertEventType = {
    nome: string
    descricao: string
    dataInicio: Date
    dataFim: Date
    urlBanner: BannerEvent | null
  }
  
  export const upsertEventAtom = atom<UpsertEventType>({
    nome: '',
    descricao: '',
    dataInicio: new Date(),
    dataFim: new Date(),
    urlBanner: null
  })