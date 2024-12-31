<template>
  <div class="flex-c-c gap-12">
    <div class="flex flex-col gap-4">
      <div class="h-148">
        <h1>{{ project?.name }}</h1>
        <div>{{ project?.description }}</div>
      </div>

      <div class="h-[calc(100dvh-160px)] overflow-y-auto w-350">
        <KeyTree />
      </div>
    </div>
    <div class="flex-1">
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

const slug = route.params.slug as string

const { project } = useProject(slug)
</script>

<style scoped></style>
