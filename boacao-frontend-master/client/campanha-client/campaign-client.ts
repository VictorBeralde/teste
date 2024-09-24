import { BaseClient } from "../base-client/base-client";
import { UpdateImageByEventIdCommand } from "../evento-client/types";
import { CampaignQuery, CampaignsByDonorIdResult, CampanhaResult, CreateCampaignCommand, DashboardInfosResult, UpdateStatusCommand } from "./types";
import { Page } from "../page";

export class CampaignClient extends BaseClient {
    async getCampaigns (
      params: CampaignQuery,
      signal?: AbortSignal
    ): Promise<Page<CampanhaResult>> {
      return (await this.axios.get('/campaigns', { params, signal })).data
    }

    async getCampaignById (
      id: string,
      signal?: AbortSignal
    ): Promise<CampanhaResult> {
      return (await this.axios.get(`/campaigns/${id}`, { signal })).data
    }

    async getCampaignsByOngId (
      id: string,
      params: CampaignQuery,
      signal?: AbortSignal
    ): Promise<Page<CampanhaResult>> {
      return (await this.axios.get(`/campaigns/ong/${id}`, { params, signal })).data
    }

    async getCampaignsByDonorId (
      id: string,
      signal?: AbortSignal
    ): Promise<CampaignsByDonorIdResult[]> {
      return (await this.axios.get(`/campaigns/donor-campaigns/${id}`, { signal })).data
    }

    async updateStatusCampaignById (
      idCampaign: string,
      data: UpdateStatusCommand,
      signal?: AbortSignal
    ): Promise<CampaignsByDonorIdResult> {
      return (await this.axios.put(`/campaigns/status/${idCampaign}`, data, { signal })).data
    }

    async createCampaign (
      data: CreateCampaignCommand,
      signal?: AbortSignal
    ): Promise<CampanhaResult> {
      return (await this.axios.post('/campaigns', data, { signal })).data
    }

    async updateCampaign (
      data: CreateCampaignCommand,
      signal?: AbortSignal
    ): Promise<void> {
      return (await this.axios.post('/campaigns', data, { signal })).data
    }

    async getDashboardInfos (
      id: string,
      signal?: AbortSignal
    ): Promise<DashboardInfosResult> {
      return (await this.axios.get(`/campaigns/dashboard-infos/${id}`, { signal })).data
    }

    async deleteCampaignById (
      id: string,
      signal?: AbortSignal
    ): Promise<DashboardInfosResult> {
      return (await this.axios.delete(`/campaigns/${id}`, { signal })).data
    }

    async putImageCampaignById(
      data: UpdateImageByEventIdCommand,
      signal?: AbortSignal
    ): Promise<void> {
      try {
        const formData = new FormData()
        formData.append('image', data.file)
        return await this.axios.put(`/campaigns/image/${data.id}`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          },
          signal
        })} catch (error) {
          console.error('Error updating image campaigns:', error)
        }
    }
}