import { City, CityCreate, CityUpdate } from '@/types/city';
import { config } from '@/config';

const API_BASE_URL = config.apiBaseUrl;

class CitiesService {
  private async request<T>(url: string, options: RequestInit = {}): Promise<T> {
    const response = await fetch(`${API_BASE_URL}${url}`, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
    }

    return response.json();
  }

  async createCity(city: CityCreate): Promise<{ id: number }> {
    return this.request<{ id: number }>('/api/cities', {
      method: 'POST',
      body: JSON.stringify(city),
    });
  }

  async getAllCities(): Promise<City[]> {
    return this.request<City[]>('/api/cities');
  }

  async updateCity(id: number, updates: CityUpdate): Promise<{ updated: boolean }> {
    return this.request<{ updated: boolean }>(`/api/cities/${id}`, {
      method: 'PUT',
      body: JSON.stringify(updates),
    });
  }

  async deleteCity(id: number): Promise<{ deleted: boolean }> {
    return this.request<{ deleted: boolean }>(`/api/cities/${id}`, {
      method: 'DELETE',
    });
  }

  async searchCities(name: string): Promise<City[]> {
    const encodedName = encodeURIComponent(name);
    return this.request<City[]>(`/api/cities/search?name=${encodedName}`);
  }
}

export const citiesService = new CitiesService();
