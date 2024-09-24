import { Pagination } from '../../pagination'

export type GetDonationsByOngIdQuery = Pagination & {
    situacao: string
}