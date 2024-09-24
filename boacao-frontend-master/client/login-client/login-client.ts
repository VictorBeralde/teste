import { BaseClient } from "../base-client/base-client";
import { LoginCommand, LoginDonorResult, LoginOngResult, LoginResult, ValidateEmail } from "./types";

export class LoginClient extends BaseClient {
    async login (
      data: LoginCommand,
      signal?: AbortSignal
    ): Promise<LoginResult> {
      return (await this.axios.post('/users/login', data, { signal })).data
    }

    async logout (
      signal?: AbortSignal
    ): Promise<void> {
      return (await this.axios.post('/users/logout', { signal })).data
    }

    async validateEmail (
      params: ValidateEmail,
      signal?: AbortSignal
    ): Promise<string> {
      return (await this.axios.get('/users/get-type', { params, signal })).data
    }
    
    async loginDonor (
      data: LoginCommand,
      signal?: AbortSignal
    ): Promise<LoginDonorResult> {
      return (await this.axios.post('/users/login/donor', data, { signal })).data
    }

    async loginOng (
      data: LoginCommand,
      signal?: AbortSignal
    ): Promise<LoginOngResult> {
      return (await this.axios.post('/users/login/ong', data, { signal })).data
    }
}