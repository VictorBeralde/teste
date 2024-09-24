import { atom } from "jotai";

export type CreateDonorType = {
    nome: string;
    cpf: number | null;
    telefone: number | null;
    email: string;
    cep: number | null;
    logradouro: string;
    numero: number | null;
    complemento: string;
    bairro: string;
    cidade: string;
    senha: string;
    confirmarSenha: string;
};

export const createDonorAtom = atom<CreateDonorType>({
    nome: '',
    cpf: null,
    telefone: null,
    email: '',
    cep: null,
    logradouro: '',
    numero: null,
    complemento: '',
    bairro: '',
    cidade: '',
    senha: '',
    confirmarSenha: ''
});
