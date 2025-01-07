<script setup lang="ts">
import TreeItems from './TreeItems.vue'

interface TreeItem {
  title: string
  icon?: string
  isLeaf?: boolean
  children?: TreeItem[]
  key?: string
}

defineProps<{
  items: TreeItem[]
}>()

const currentKey = defineModel<string>('selected-key')

const isExpanded = ref<Set<string>>(new Set())

const toggleExpand = (item: TreeItem, path: string) => {
  if (item.isLeaf) {
    currentKey.value = item.key
    return
  }

  if (isExpanded.value.has(path)) {
    isExpanded.value.delete(path)
  } else {
    isExpanded.value.add(path)
  }
}

const getItemPath = (item: TreeItem, parentPath = '') => {
  return parentPath ? `${parentPath}/${item.title}` : item.title
}
</script>

<template>
  <div class="bg-card text-card-foreground shadow-sm">
    <div class="p-8px">
      <TreeItems
        :items="items"
        :level="0"
        @toggle="toggleExpand"
        :expanded-items="isExpanded"
      />
    </div>
  </div>
</template>
