export const useProjectStore = defineStore('project', () => {
  const project = ref<any>(null)

  const currentKey = ref('')

  const localeMap = ref<Record<string, string>>({})

  return {
    currentKey,
    project,
    localeMap,
  }
})
