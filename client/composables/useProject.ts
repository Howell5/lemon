import { useQuery } from '@tanstack/vue-query'

export const useProject = (slugRef: MaybeRefOrGetter<string>) => {
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

export const userProjectList = () => {
  const projectApi = useProjectApi()
  const { data } = useQuery({
    queryKey: ['project-list'],
    queryFn: async () => {
      const data = await projectApi.list()
      console.log({ data })
      return data
    },
  })

  return {
    projectList: data,
  }
}

export const useProjectTranslations = (
  projectNameRef: MaybeRefOrGetter<string>,
  locale?: string
) => {
  const translationApi = useTranslationApi()
  const { data } = useQuery({
    queryKey: computed(() => [
      'project-translations',
      { projectName: toValue(projectNameRef), locale },
    ]),
    queryFn: async () => {
      const projectName = toValue(projectNameRef)
      const data = await translationApi.list({ projectName, locale })
      return data
    },
  })

  return {
    data,
  }
}
