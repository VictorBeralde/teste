import { BaseClient } from "../base-client/base-client";
import { ProductsResult } from "./types/products-result";

export class ProductClient extends BaseClient {
    async getProductsForCampaignId (
      id: string,
      signal?: AbortSignal
    ): Promise<ProductsResult[]> {
      return (await this.axios.get(`/products/campaigns/${id}`, { signal })).data
    }

    async getProducts (
      signal?: AbortSignal
    ): Promise<ProductsResult[]> {
      return (await this.axios.get('/products', { signal })).data
    }
}