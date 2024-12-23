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

      console.log({ data })

      return data
    },
    enabled: computed(() => !!toValue(slugRef)),
  })

  const project = computed(() => data.value)
  return {
    project,
  }
}
