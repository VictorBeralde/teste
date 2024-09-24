export type CreateOngCommand = {
    nome: string
    cnpj: string
    email: string
    senha: string
    cep: string
    numero: number
    logradouro: string
    bairro: string
    cidade: string
    complemento: string
    telefones: string[]
    estado: string
    linkSite: string
    descricao: string
    plano: string
    horarioFuncionamento: string
    certificado: string
    tipoCertificado: string
    imagem: string
}