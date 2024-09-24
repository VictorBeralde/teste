import { atom } from "jotai"

export type DoacaoAtomType = {
    fkProdutos: number[]
    quantidade: number[]
    imgProduto: string[]
    dispBusca: boolean
    fkCampanha: string
  }
  
  export const doacaoAtom = atom<DoacaoAtomType>({
    fkProdutos: [],
    quantidade: [],
    imgProduto: [],
    dispBusca: false,
    fkCampanha: ''
  })