<template>
  <div>
    <h1>i18n</h1>
  </div>
</template>

<script setup lang="ts">
const route = useRoute()

const project = route.params.project
const slug = route.params.slug

console.log(project, slug)
</script>

<style scoped></style>
