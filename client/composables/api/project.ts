// client/api/project.ts
import type { Project } from '@/types/models/project'

export const useProjectApi = () => {
  const api = createApi()

  return {
    list() {
      return api.get<Project[]>('/api/project/list')
    },

    get(slug: string) {
      return api.get<Project>(`/api/project/get`, { slug })
    },

    create(data: Partial<Project>) {
      return api.post<Project>('/api/project', data)
    },

    update(slug: string, data: Partial<Project>) {
      return api.put<Project>(`/api/project/${slug}`, data)
    },

    delete(slug: string) {
      return api.delete<void>(`/api/project/${slug}`)
    },
  }
}
