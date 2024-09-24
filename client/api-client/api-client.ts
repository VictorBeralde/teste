import axios, { AxiosError, AxiosInstance } from 'axios';
import { BaseClientOptions } from '../base-client/base-client';
import { OngClient } from '../ong-client/ong-client';
import { DonorClient } from '../doador-client/donor-client';
import { CampaignClient } from '../campanha-client/campaign-client';
import { LoginClient } from '../login-client/login-client';
import { ProductClient } from '../produto-client/product-client';
import { DonationsClient } from '../minhas-doacoes-client/donations-client';
import { EventsClient } from '../evento-client/events-client';
import { CommentsClient } from '../comentario-client/comments-client';
import { CollectionPointsClient } from '../collection-points-client/collection-points-client';

export type ApiClientOptions = {
    baseURL?: string;
    token?: string;
    onUnauthorized?: () => void;
}

export class ApiClient {
    axiosInstance: AxiosInstance;
    campaigns: CampaignClient;
    collectionPoints: CollectionPointsClient;
    comments: CommentsClient;
    donations: DonationsClient;
    donors: DonorClient;
    events: EventsClient;
    login: LoginClient;
    ongs: OngClient;
    products: ProductClient;
    
    constructor(options: ApiClientOptions = {}) {
        const baseURL = options.baseURL || 'http://localhost:8080';
        const baseClientOptions: BaseClientOptions = {
            baseURL,
            axios: axios.create({
                baseURL,
                headers: {
                    Authorization: options.token ? options.token : undefined,
                },
            })
        }

        this.axiosInstance = baseClientOptions.axios;

        this.setupInterceptors(options);

        this.campaigns = new CampaignClient(baseClientOptions);
        this.collectionPoints = new CollectionPointsClient(baseClientOptions);
        this.comments = new CommentsClient(baseClientOptions);
        this.donations = new DonationsClient(baseClientOptions);
        this.donors = new DonorClient(baseClientOptions);
        this.events = new EventsClient(baseClientOptions);
        this.login = new LoginClient(baseClientOptions);
        this.ongs = new OngClient(baseClientOptions);
        this.products = new ProductClient(baseClientOptions);
    }

    private setupInterceptors(options: ApiClientOptions) {
        this.axiosInstance.interceptors.request.use(
            (config) => {
                const token = sessionStorage.getItem('token');
                if (token) {
                    config.headers.Authorization = `Bearer ${token}`;
                }
                return config;
            },
            (error) => {
                return Promise.reject(error);
            }
        );

        this.axiosInstance.interceptors.response.use(
            response => response,
            (error: AxiosError) => {
                if (error.response?.status === 401) {
                    options.onUnauthorized?.();
                }
                return Promise.reject(error);
            }
        );
    }

    isBadRequest(error: any): boolean {
        return axios.isAxiosError(error) && error.response?.status === 400;
    }

    isConflict(error: any): boolean {
        return axios.isAxiosError(error) && error.response?.status === 409;
    }

    isNotFound(error: any): boolean {
        return axios.isAxiosError(error) && error.response?.status === 404;
    }

    isUnauthorized(error: any): boolean {
        return axios.isAxiosError(error) && error.response?.status === 401;
    }
}
