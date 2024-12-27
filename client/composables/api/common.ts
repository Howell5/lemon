// import type { ApiResponse } from '@/types/api/response'

export const createApi = () => {
  const config = useRuntimeConfig()
  const baseURL = config.public.apiBase

  async function fetchApi<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${baseURL}${endpoint}`
    const defaultOptions = {
      headers: {
        'Content-Type': 'application/json',
      },
    }

    const response = await fetch(url, { ...defaultOptions, ...options })

    if (!response.ok) {
      const error = await response.json().catch(() => ({}))
      throw new Error(error.message || `HTTP error! status: ${response.status}`)
    }

    return response.json()
  }

  return {
    get: <T>(endpoint: string, params?: Record<string, any>) => {
      const queryString = Object.entries(params || {})
        .filter(([_, value]) => value !== undefined)
        .map(([key, value]) => `${key}=${value}`)
        .join('&')

      return fetchApi<T>(`${endpoint}?${queryString}`, {
        method: 'GET',
      })
    },

    post: <T>(endpoint: string, data: unknown) =>
      fetchApi<T>(endpoint, {
        method: 'POST',
        body: JSON.stringify(data),
      }),

    put: <T>(endpoint: string, data: unknown) =>
      fetchApi<T>(endpoint, {
        method: 'PUT',
        body: JSON.stringify(data),
      }),

    delete: <T>(endpoint: string) =>
      fetchApi<T>(endpoint, {
        method: 'DELETE',
      }),
  }
}
