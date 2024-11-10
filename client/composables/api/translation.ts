// client/api/translation.ts
import type { Translation } from '@/types/models/translation'

export const useTranslationApi = () => {
  const api = createApi()

  return {
    list(projectId: number) {
      return api.get<Translation[]>(`/api/projects/${projectId}/translations`)
    },

    get(projectId: number, id: number) {
      return api.get<Translation>(
        `/api/projects/${projectId}/translations/${id}`
      )
    },

    create(projectId: number, data: Partial<Translation>) {
      return api.post<Translation>(
        `/api/projects/${projectId}/translations`,
        data
      )
    },

    update(projectId: number, id: number, data: Partial<Translation>) {
      return api.put<Translation>(
        `/api/projects/${projectId}/translations/${id}`,
        data
      )
    },

    delete(projectId: number, id: number) {
      return api.delete<void>(`/api/projects/${projectId}/translations/${id}`)
    },

    // 批量操作
    batchUpdate(projectId: number, translations: Partial<Translation>[]) {
      return api.put<Translation[]>(
        `/api/projects/${projectId}/translations/batch`,
        translations
      )
    },

    // 导入导出
    import(projectId: number, file: File) {
      const formData = new FormData()
      formData.append('file', file)

      return api.post<{ count: number }>(
        `/api/projects/${projectId}/translations/import`,
        formData
      )
    },

    export(projectId: number) {
      return api.get<Blob>(`/api/projects/${projectId}/translations/export`)
    },
  }
}
