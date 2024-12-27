import { useQuery } from '@tanstack/vue-query'

export const useTranslation = (slug: string, params: { locale: string }) => {
  const translationApi = useTranslationApi()

  const { data } = useQuery({
    queryKey: ['translation', slug],
    queryFn: async () => {
      const { locale } = params

      const data = await translationApi.list({
        projectName: slug,
        locale,
      })

      return data
    },
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 5,
  })

  return { data }
}
