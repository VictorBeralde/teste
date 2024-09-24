import { BaseClient } from "../base-client/base-client";
import { ComentarioResult } from "./types/comentario-result";
import { CreateComment, UpdateCommentCommand } from "./types";

export class CommentsClient extends BaseClient {
  async getCommentsByOngId(
    id: string,
    signal?: AbortSignal
  ): Promise<ComentarioResult[]> {
    return (await this.axios.get(`/comments/${id}`, { signal })).data
  }

  async createComment(
    data: CreateComment,
    signal?: AbortSignal
  ): Promise<ComentarioResult> {
    return (await this.axios.post(`/comments`, data, { signal })).data
  }

  async patchComment(
    id: string,
    data: UpdateCommentCommand,
    signal?: AbortSignal
  ): Promise<void> {
    return (await this.axios.patch(`/comments/${id}`, data,  { signal })).data
  }

  async deleteComment(
    id: string,
    signal?: AbortSignal
  ): Promise<void> {
    return (await this.axios.delete(`/comments/${id}`, { signal })).data
  }
}