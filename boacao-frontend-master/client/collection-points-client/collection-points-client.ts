import { BaseClient } from "../base-client/base-client";
import { Page } from "../page";
import { CollectionPointsQuery, CollectionPointsResult, CreateCollectionPointCommand, UpdateCollectionPointsById } from "./types";

export class CollectionPointsClient extends BaseClient {
  async createCollectionPoint(
    data: CreateCollectionPointCommand,
    signal?: AbortSignal
  ): Promise<void> {
    return (await this.axios.post('/collection-points', data, { signal })).data
  }

  async getCollectionPointsPage(
    idOng: string,
    params: CollectionPointsQuery,
    signal?: AbortSignal
  ): Promise<Page<CollectionPointsResult>> {
    return (await this.axios.get(`/collection-points/ong/${idOng}`, { params, signal })).data
  }

  async getCollectionPointsById(
    idCollectionPoint: string,
    signal?: AbortSignal
  ): Promise<CollectionPointsResult> {
    return (await this.axios.get(`/collection-points/${idCollectionPoint}`, { signal })).data
  }

  async deleteCollectionPointsById(
    idCollectionPoint: string,
    signal?: AbortSignal
  ): Promise<void> {
    return (await this.axios.delete(`/collection-points/${idCollectionPoint}`, { signal })).data
  }

  async updateCollectionPointsById(
    idCollectionPoint: string,
    data: UpdateCollectionPointsById,
    signal?: AbortSignal
  ): Promise<CollectionPointsResult> {
    return (await this.axios.patch(`/collection-points/${idCollectionPoint}`, data, { signal })).data
  }
}