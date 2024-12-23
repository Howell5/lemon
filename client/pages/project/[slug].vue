<template>
  <div>
    <h1>{{ project?.name }}</h1>
    <div>{{ project?.description }}</div>

    <div class="flex flex-col gap-4">
      <KeyTree />
    </div>
  </div>
</template>

<script setup lang="ts">
const route = useRoute()

const slug = route.params.slug as string

const { project } = useProject(slug)
</script>

<style scoped></style>
