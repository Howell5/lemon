import { useQuery } from '@tanstack/vue-query'

export const useProject = (slugRef: MaybeRef<string>) => {
  const projectApi = useProjectApi()
  const { data } = useQuery({
    queryKey: computed(() => ['project', slugRef]),
    queryFn: async () => {
      const slug = toValue(slugRef)
      const project = await projectApi.get(slug)
      return project.data
    },
  })
  const project = computed(() => data.value)
  return {
    project,
  }
}
