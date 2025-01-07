<template>
  <div class="flex flex-col gap-4px">
    <Tree
      v-model:selected-key="selectedKey"
      :items="treeNodes"
      virtual
      :height="`calc(100dvh-184px)`"
    />
  </div>
</template>

<script setup lang="ts">
import { Tree, type TreeItem } from '@/components/ui/tree'
import isObject from 'lodash-es/isObject'

const projectStore = useProjectStore()

const slug = computed(() => projectStore.currentProjectSlug)

const { data } = useProjectTranslations(slug, 'en')

const selectedKey = ref<string>('')

watch(
  () => selectedKey.value,
  (newVal) => {
    if (newVal) {
      projectStore.currentKey = newVal
    }
  },
  {
    immediate: true,
  }
)

const list = computed(() => {
  return data.value?.reduce((acc, item) => {
    acc[item.key] = item.translation
    return acc
  }, {})
})

function genTree(lang: any, parentKey?: string): TreeItem[] {
  const tree: TreeItem[] = []
  for (const key in lang) {
    const value = lang[key]
    const realKey = parentKey ? `${parentKey}.${key}` : key
    if (isObject(value)) {
      tree.push({
        title: key,
        key: realKey,
        children: genTree(value, realKey),
      })
    } else {
      tree.push({
        title: key,
        key: realKey,
        isLeaf: true,
      })
    }
  }
  return tree
}

const treeNodes = computed(() => {
  const tree = genTree(list.value)

  return tree
})
</script>

<style scoped></style>
