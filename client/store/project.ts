import { useRouteParams } from '@vueuse/router'

export const useProjectStore = defineStore('project', () => {
  const route = useRoute()
  const slug = route.params.slug as string

  const currentProjectSlug = useRouteParams('slug')

  const { project } = useProject(currentProjectSlug)

  const currentKey = ref('')

  const localeMap = ref<Record<string, string>>({})

  return {
    currentKey,
    project,
    localeMap,
    currentProjectSlug,
  }
})
