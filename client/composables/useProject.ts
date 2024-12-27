import { useQuery } from '@tanstack/vue-query'

export const useProject = (slugRef: MaybeRef<string>) => {
  const projectApi = useProjectApi()
  const { data } = useQuery({
    queryKey: computed(() => [
      'project',
      {
        slug: toValue(slugRef),
      },
    ]),
    queryFn: async () => {
      const slug = toValue(slugRef)
      const data = await projectApi.get(slug)

      return data
    },
    enabled: computed(() => !!toValue(slugRef)),
  })

  const project = computed(() => data.value)

  return {
    project,
  }
}

export const useProjectTranslations = (projectNameRef: MaybeRef<string>) => {
  const translationApi = useTranslationApi()
  const { data } = useQuery({
    queryKey: computed(() => [
      'project-translations',
      { projectName: toValue(projectNameRef) },
    ]),
    queryFn: async () => {
      const projectName = toValue(projectNameRef)
      const data = await translationApi.list(projectName)
      return data
    },
  })
}
