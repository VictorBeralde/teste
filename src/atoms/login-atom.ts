import { atom } from "jotai"

export type LoginType = {
    email: string
    senha: string
  }
  
  export const loginAtom = atom<LoginType>({
    email: '',
    senha: ''
  })