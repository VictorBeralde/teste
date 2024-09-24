import { BaseClient } from "../base-client/base-client";
import { Page } from "../page";
import { Pagination } from "../pagination";
import { EventByIdResult, EventQuery, EventsResult, UpdateImageByEventIdCommand } from "./types";
import { CreateEventCommand } from "./types/create-event-command";

export class EventsClient extends BaseClient {
  async createEvent(
    data: CreateEventCommand,
    signal?: AbortSignal
  ): Promise<EventsResult> {
    return (await this.axios.post('/events', data, { signal })).data
  }

  async getEvents(
    params: Pagination,
    signal?: AbortSignal
  ): Promise<EventsResult[]> {
    return (await this.axios.get('/events', { params, signal })).data
  }

  async getEventsByOngId(
    idOng: string,
    params: EventQuery,
    signal?: AbortSignal
  ): Promise<Page<EventByIdResult>> {
    return (await this.axios.get(`/events/ong/${idOng}`, { params, signal })).data
  }

  async putEventById(
    data: UpdateImageByEventIdCommand,
    signal?: AbortSignal
  ): Promise<void> {
    try {
      const formData = new FormData()
      formData.append('image', data.file)
      console.log(formData.get('image'))
      return await this.axios.put(`/events/image/${data.id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        signal
      })} catch (error) {
        console.error('Error updating image event:', error)
      }
  }
}