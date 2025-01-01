// client/api/translation.ts
import type { Translation } from '@/types/models/translation'

export const useTranslationApi = () => {
  const api = createApi()

  return {
    list({
      projectName,
      locale,
      key,
    }: {
      projectName: string
      locale?: string
      key?: string
    }) {
      return api.post<Translation[]>(`/api/translation/list`, {
        projectName,
        locale,
        key,
      })
    },

    get({
      projectName,
      locale,
      key,
    }: {
      projectName: string
      locale?: string
      key?: string
    }) {
      return api.get<Translation>(`/api/translation`, {
        projectName,
        locale,
        key,
      })
    },

    create(projectId: number, data: Partial<Translation>) {
      return api.post<Translation>(
        `/api/projects/${projectId}/translation`,
        data
      )
    },

    update(projectId: number, id: number, data: Partial<Translation>) {
      return api.put<Translation>(
        `/api/projects/${projectId}/translation/${id}`,
        data
      )
    },

    getByKey({ projectName, key }: { projectName: string; key: string }) {
      return api.post<Translation[]>(`/api/translation/key`, {
        projectName,
        key,
      })
    },

    delete(projectId: number, id: number) {
      return api.delete<void>(`/api/projects/${projectId}/translation/${id}`)
    },

    // 批量操作
    batchUpdate(projectId: number, translations: Partial<Translation>[]) {
      return api.put<Translation[]>(
        `/api/projects/${projectId}/translation/batch`,
        translations
      )
    },

    // 导入导出
    import(projectName: string, file: File, locale: string) {
      const formData = new FormData()
      formData.append('file', file)
      formData.append('projectName', projectName)
      formData.append('locale', locale)

      return api.post<{ count: number }>(`/api/translation/import`, formData)
    },

    export(projectName: string) {
      return api.get<Blob>(`/api/translation/export`, {
        projectName,
      })
    },
  }
}
