import { useQuery } from '@tanstack/vue-query'

export const useTranslation = (slug: string, key: MaybeRef<string>) => {
  const translationApi = useTranslationApi()

  const { data } = useQuery({
    queryKey: [
      'translation',
      {
        slug,
        key,
      },
    ],
    queryFn: async () => {
      const data = await translationApi.getByKey({
        projectName: slug,
        key: toValue(key),
      })

      return data
    },
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 5,
    retry: 0,
  })

  return { data }
}
