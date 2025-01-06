export const useProjectStore = defineStore('project', () => {
  const route = useRoute()
  const slug = route.params.slug as string

  const { project } = useProject(slug)

  const currentKey = ref('')

  const localeMap = ref<Record<string, string>>({})

  return {
    currentKey,
    project,
    localeMap,
  }
})
