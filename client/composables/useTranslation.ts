import { useQuery, useMutation } from '@tanstack/vue-query'

export const useTranslation = (slug: string, key: MaybeRef<string>) => {
  const translationApi = useTranslationApi()
  const projectStore = useProjectStore()

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

  function createMutation(translationId: number, value: string) {
    const { mutateAsync } = useMutation({
      mutationKey: ['translation', { slug, key }],
      mutationFn: async () => {
        await translationApi.update(projectStore.project.id, translationId, {
          key,
          value,
        })
      },
    })
    return mutateAsync
  }

  const translations = computed(() =>
    data.value?.sort((item) =>
      item.locale === projectStore.project.defaultLocale ? -1 : 1
    )
  )

  return { data, translations, createMutation }
}

const useTranslationMutations = (slug: string, key: string) => {
  const translationApi = useTranslationApi()
  const projectStore = useProjectStore()

  const { mutateAsync } = useMutation({
    mutationKey: ['translation', { slug, key }],
    mutationFn: async (payload: { translationId: number; value: string }) => {
      const { translationId, value } = payload
      await translationApi.update(projectStore.project.id, translationId, {
        key,
        value,
      })
    },
  })
}
