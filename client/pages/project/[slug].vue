<template>
  <div>
    <h1>{{ project?.name }}</h1>
    <div>{{ project?.description }}</div>

    <div>
      <Button>编辑</Button>
      <Button>删除</Button>
    </div>
  </div>
</template>

<script setup lang="ts">
const route = useRoute()

const slug = route.params.slug as string

const { project } = useProject(slug)
</script>

<style scoped></style>
