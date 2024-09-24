import { BaseClient } from "../base-client/base-client";
import { MinhasDoacoesResult } from "./types/minhas-doacoes-result";
import { CreateDonationCommand, CreateImagesDonationsByIdCommand, CreateDonationPixCommand, GetDonationsByOngIdQuery, UpdateDonationByIdCommand, UpdateDonationStatusByIdCommand } from "./types";

export class DonationsClient extends BaseClient {
  async getCsvDonor(
    id: string,
    signal?: AbortSignal
  ): Promise<Blob> {
    return (await this.axios.get(`/donations/download-csv/donor/${id}`, { signal })).data
  }

  async createDonation(
    data: CreateDonationCommand,
    signal?: AbortSignal
  ): Promise<MinhasDoacoesResult> {
    return (await this.axios.post(`/donations/products`, data, { signal })).data
  }

  async createDonationPix(
    data: CreateDonationPixCommand,
    signal?: AbortSignal
  ): Promise<MinhasDoacoesResult> {
    return (await this.axios.post(`/donations/pix`, data, { signal })).data
  }

  async updateDonationById(
    id: string,
    data: UpdateDonationByIdCommand,
    signal?: AbortSignal
  ): Promise<MinhasDoacoesResult> {
    return (await this.axios.put(`/donations/${id}`, data, { signal })).data
  }

  async updateDonationStatusById(
    idDonation: string,
    data?: UpdateDonationStatusByIdCommand,
    signal?: AbortSignal
): Promise<MinhasDoacoesResult> {
    return (await this.axios.put(`/donations/products/status/${idDonation}`, data, { signal })).data
}


  async putDonationImages(
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
        this.axios.put(`/donations/images/${data.id}`, formData, {
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

  async getDonationsById(
    id: string,
    signal?: AbortSignal
  ): Promise<MinhasDoacoesResult> {
    return (await this.axios.get(`/donations/${id}`, { signal })).data
  }

  async getDonationsByDonorId(
    id: string,
    signal?: AbortSignal
  ): Promise<MinhasDoacoesResult[]> {
    return (await this.axios.get(`/donations/donor/${id}`, { signal })).data
  }

  async getDonationsImages(
    id: number,
    signal?: AbortSignal
  ): Promise<Blob[]> {
    return (await this.axios.get(`/donations/buscar-imagem/${id}`, { signal })).data
  }

  async getDonationsByOngId(
    idOng: string,
    params: GetDonationsByOngIdQuery,
    signal?: AbortSignal
  ): Promise<MinhasDoacoesResult[]> {
    return (await this.axios.get(`/donations/ong/${idOng}`, { params, signal })).data
  }

  async deleteDonationsById(
    id: string,
    signal?: AbortSignal
  ): Promise<void> {
    return (await this.axios.delete(`/donations/${id}`, { signal })).data
  }

}