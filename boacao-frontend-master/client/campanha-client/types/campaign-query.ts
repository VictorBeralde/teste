import { Pagination } from "../../pagination";

export type CampaignQuery = Pagination & {
    dataFinal?: Date | null
    nome?: string
}