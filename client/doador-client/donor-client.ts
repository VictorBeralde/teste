import { BaseClient } from "../base-client/base-client";
import { CreateDonorCommand } from './types/create-donor-command'
import { DonorResult } from './types/donor-result'
import { UpdateDonorCommand, UpdateImageDonorByDonorIdCommand } from './types'

export class DonorClient extends BaseClient {
  async createDonor(
    data: CreateDonorCommand,
    signal?: AbortSignal
  ): Promise<DonorResult> {
    return (await this.axios.post('/donors', data, { signal })).data
  }

  async getDonorById(
    id: string,
    signal?: AbortSignal
  ): Promise<DonorResult> {
    return (await this.axios.get(`/donors/${id}`, { signal })).data
  }

  async updateDonorById(
    id: string,
    data: UpdateDonorCommand,
    signal?: AbortSignal
  ): Promise<DonorResult> {
    return (await this.axios.put(`/donors/${id}`, data, { signal })).data
  }

  async updateImageDonor(
    id: string,
    data: string,
    signal?: AbortSignal
  ): Promise<void> {
    return (await this.axios.patch(`/donors/profile-image/${id}`, data, { signal })).data
  }

  async downloadCsv(
    id: string,
    signal?: AbortSignal
  ): Promise<Blob> {
    return (await this.axios.get(`/donors/donations-csv/${id}`, { signal })).data
  }

  async getMonthlyDonations(
    id: number,
    signal?: AbortSignal
  ): Promise<number> {
    return (await this.axios.get(`/donors/monthly-donations/${id}`, { signal })).data
  }

  async getTotalDonations(
    id: number,
    signal?: AbortSignal
  ): Promise<number> {
    return (await this.axios.get(`/donors/total-donations/${id}`, { signal })).data
  }
}