import { Pagination } from "../../pagination";

export type EventQuery = Pagination & {
    nome: string
}