import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

interface ApiResponse {
  data: any;
}

interface ApiRequest {}

class ApiService {
  private baseURL: string;

  constructor(baseURL: string) {
    this.baseURL = baseURL;
  }

  private async request<T>(config: AxiosRequestConfig): Promise<T> {
    try {
      const response: AxiosResponse<T> = await axios(config);
      return response.data;
    } catch (error) {
      console.error('API request error:', error);
      throw error;
    }
  }

  public async get<T>(url: string, params?: ApiRequest): Promise<T> {
    const config: AxiosRequestConfig = {
      method: 'get',
      url: `${this.baseURL}/${url}`,
      params,
    };

    return this.request<T>(config);
  }

  public async post<T>(url: string, data: ApiRequest): Promise<T> {
    const config: AxiosRequestConfig = {
      method: 'post',
      url: `${this.baseURL}/${url}`,
      data,
    };

    return this.request<T>(config);
  }

  public async put<T>(url: string, data: ApiRequest): Promise<T> {
    const config: AxiosRequestConfig = {
      method: 'put',
      url: `${this.baseURL}/${url}`,
      data,
    };

    return this.request<T>(config);
  }

  public async delete<T>(url: string): Promise<T> {
    const config: AxiosRequestConfig = {
      method: 'delete',
      url: `${this.baseURL}/${url}`,
    };

    return this.request<T>(config);
  }
}

const apiService = new ApiService(import.meta.env.VITE_API_END_POINT);
const loginService = new ApiService(import.meta.env.VITE_API_LOGIN);

export { apiService, loginService };
