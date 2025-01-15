import { useRouteParams } from '@vueuse/router'

export const useProjectStore = defineStore('project', () => {
  const currentProjectSlug = useRouteParams('slug') as Ref<string>

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
