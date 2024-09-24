import { BaseClient } from "../base-client/base-client";
import { CreateOngCommand } from "./types/create-ong-command";
import { ChavePix, OngResult } from "./types/ong-result";
import { NearOngsResult } from "./types/near-ongs-result";
import { UpsertFavoriteOngCommand, OngQuery, DashboardInfosByOngId, UpdateOngCommand, CreatePixCommand, NearOngsQuery } from "./types";
import { CreateImagesDonationsByIdCommand } from "../minhas-doacoes-client/types";
import { Page } from "../page";

export class OngClient extends BaseClient {
    async createOng (
      data: CreateOngCommand,
      signal?: AbortSignal
    ): Promise<OngResult> {
      return (await this.axios.post('/ongs', data, { signal })).data
    }

    async createPix (
      id: string,
      data: CreatePixCommand,
      signal?: AbortSignal
    ): Promise<ChavePix> {
      return (await this.axios.post(`/ongs/pix-key/${id}`, data, { signal })).data
    }

    async updateOngById (
      id: string,
      data: UpdateOngCommand,
      signal?: AbortSignal
    ): Promise<OngResult> {
      return (await this.axios.put(`/ongs/${id}`, data, { signal })).data
    }


    async getOngs (
      signal?: AbortSignal
    ): Promise<OngResult[]> {
      return (await this.axios.get('/ongs', { signal })).data
    }

    async getTotal (
      id: string,
      signal?: AbortSignal
    ): Promise<number> {
      return (await this.axios.get(`/ongs/total/${id}`, { signal })).data
    }

    async getMonthly (
      id: string,
      signal?: AbortSignal
    ): Promise<number> {
      return (await this.axios.get(`/ongs/monthly/${id}`, { signal })).data
    }

    async getCsvCampaignsByOngId(
      ongId: string,
      signal?: AbortSignal
    ): Promise<Blob> {
      return (await this.axios.get(`/ongs/campaigns-csv/${ongId}`, { signal })).data
    }

    async getOngById (
      id: string,
      params?: OngQuery,
      signal?: AbortSignal
    ): Promise<OngResult> {
      return (await this.axios.get(`/ongs/${id}`, { params, signal })).data
    }

    async getDashboardInfosByOngId (
      id: string,
      signal?: AbortSignal
    ): Promise<DashboardInfosByOngId> {
      return (await this.axios.get(`/ongs/dashboard-infos/${id}`, { signal })).data
    }

    async getNearOngs (
      cep: string,
      distance: string,
      params?: NearOngsQuery,
      signal?: AbortSignal,
    ): Promise<Page<NearOngsResult>> {
      return (await this.axios.get(`/ongs/near/${cep}/${distance}`, { params, signal })).data
    }

    async getFavoritesOngsByDonor (
      id: string,
      signal?: AbortSignal
    ): Promise<OngResult[]> {
      return (await this.axios.get(`/ongs/favorite/${id}`, { signal })).data
    }

    async getOngImages (
      id: string,
      signal?: AbortSignal
    ): Promise<string[]> {
      return (await this.axios.get(`/ongs/images/${id}`, { signal })).data
    }

    async updateImageOng (
      id: string,
      data: File,
      signal?: AbortSignal
    ): Promise<void> {
      try {
        const formData = new FormData()
        formData.append('image', data)
        return await this.axios.put(`/ongs/image/${id}`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          },
          signal
        })} catch (error) {
          console.error('Error updating image ong:', error)
        }
    }

    async updateImagesOng (
      data: CreateImagesDonationsByIdCommand,
      signal?: AbortSignal
    ): Promise<void> {
      try {
        const formDataArray: FormData[] = [];
  
        for (let i = 0; i < data.images.length; i++) {
          const image = data.images[i];
          const formData = new FormData();
  
          const byteString = atob(image.split(',')[1]);
          const mimeString = image.split(',')[0].split(':')[1].split(';')[0];
  
          const ab = new ArrayBuffer(byteString.length);
          const ia = new Uint8Array(ab);
          for (let j = 0; j < byteString.length; j++) {
            ia[j] = byteString.charCodeAt(j);
          }
  
          const blob = new Blob([ab], { type: mimeString });
  
          formData.append('image', blob, `image_${i}.png`);
          formDataArray.push(formData);
        }
  
        const uploadPromises = formDataArray.map(formData =>
          this.axios.put(`/ongs/images/${data.id}`, formData, {
            headers: {
              'Content-Type': 'multipart/form-data'
            },
            signal
          })
        );
  
        await Promise.all(uploadPromises);
      } catch (error) {
        console.error('Error updating image donor:', error);
        throw new Error('Failed to upload images');
      }
    }

    async createFavoriteOng (
      params: UpsertFavoriteOngCommand,
      signal?: AbortSignal
    ): Promise<void> {
      return (await this.axios.post(`/ongs/favorite?idDonor=${params.idDonor}&idOng=${params.idOng}`, { signal })).data;
    }

    async deleteFavoriteOng (
      params: UpsertFavoriteOngCommand,
      signal?: AbortSignal
    ): Promise<void> {
      return (await this.axios.delete(`/ongs/unfavorite`, { params, signal })).data
    }
  }