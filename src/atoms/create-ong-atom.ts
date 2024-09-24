import { atom } from "jotai";

type Image = {
    name: string
    src: string
}

export type CreateOngType = {
    nome: string;
    cnpj: string | null;
    email: string;
    telefone: string | null;
    cep: string;
    logradouro: string;
    complemento: string;
    bairro: string;
    cidade: string;
    estado: string;
    numero: number | null;
    senha: string;
    confirmarSenha: string;
    plano: string;
    imagem: Image[];
    linkSite: string;
    descricao: string;
    horarioFuncionamento: string;
    tipoDoCertificado: string;
    certificado: string;
};


export const createOngAtom = atom<CreateOngType>({
    nome: '',
    cnpj: '',
    telefone: '',
    email: '',
    cep: '',
    logradouro: '',
    numero: 0,
    complemento: '',
    bairro: '',
    cidade: '',
    estado: '',
    senha: '',
    confirmarSenha: '',
    plano: '',
    imagem: [],
    linkSite: '',
    descricao: '',
    horarioFuncionamento: '',
    certificado: '',
    tipoDoCertificado: ''
});

