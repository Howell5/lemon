<template>
  <div class="flex flex-col gap-4 mt-6">
    <div class="h-72px px-16px">
      <h2 class="text-2xl font-bold">{{ project?.name }}</h2>
      <div class="text-sm text-gray-500">{{ project?.description }}</div>
    </div>

    <div class="flex gap-12px">
      <div
        class="h-[calc(100dvh-180px)] overflow-y-auto w-350px rounded-lg border"
      >
        <KeyTree />
      </div>
      <div class="h-[calc(100dvh-120px)] flex-1">
        <TranslateEditor :current-key="projectStore?.currentKey" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'project',
})

const projectStore = useProjectStore()

const project = computed(() => projectStore.project)
</script>

<style scoped></style>
