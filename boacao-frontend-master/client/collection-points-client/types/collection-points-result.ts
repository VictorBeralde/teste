import { OngResult } from "../../ong-client/types/ong-result";
import { EnderecoResult } from "../../endereco-result";

export type CollectionPointsResult = {
    id: string,
    nome: string,
    descricao: string,
    urlImagem: string,    
    dataDisponivel: Date
    horarioFuncionamento: string
    ong: OngResult
    endereco: EnderecoResult
}