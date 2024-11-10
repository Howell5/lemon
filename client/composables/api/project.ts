// client/api/project.ts
import type { Project } from '@/types/models/project'

export const useProjectApi = () => {
  const api = createApi()

  return {
    list() {
      return api.get<Project[]>('/api/projects')
    },

    get(slug: string) {
      return api.get<Project>(`/api/projects/${slug}`)
    },

    create(data: Partial<Project>) {
      return api.post<Project>('/api/projects', data)
    },

    update(slug: string, data: Partial<Project>) {
      return api.put<Project>(`/api/projects/${slug}`, data)
    },

    delete(slug: string) {
      return api.delete<void>(`/api/projects/${slug}`)
    },
  }
}
