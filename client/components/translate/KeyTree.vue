<template>
  <div>
    <h1>KeyTree</h1>
    <Tree :data="data" />
  </div>
</template>

<script setup lang="ts">
import Tree from 'primevue/tree'

const data = [
  {
    label: 'Node 1',
    children: [{ label: 'Node 1.1' }, { label: 'Node 1.2' }],
  },
]
</script>

<style scoped></style>
