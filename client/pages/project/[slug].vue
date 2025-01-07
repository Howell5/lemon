<template>
  <div class="flex-c-c gap-12px">
    <div class="flex flex-col gap-4px">
      <div class="h-152px">
        <h1>{{ project?.name }}</h1>
        <div>{{ project?.description }}</div>
      </div>

      <div
        class="h-[calc(100dvh-184px)] overflow-y-auto w-350px rounded-lg border"
      >
        <KeyTree />
      </div>
    </div>
    <div class="h-[calc(100dvh-120px)] flex-1">
      <TranslateEditor :current-key="projectStore?.currentKey" />
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'project',
})
const route = useRoute()

const projectStore = useProjectStore()

const project = computed(() => projectStore.project)

const slug = route.params.slug as string

// const { project } = useProject(slug)
</script>

<style scoped></style>
