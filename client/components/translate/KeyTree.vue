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
import { type Translation } from '@/../types/models/translation'
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

const unFlattened = computed(() => {
  if (!data.value) return {}
  const unFlattened = unFlatten(data.value)
  // console.log({ unFlattened })
  return unFlattened
})

const map = computed(() => {
  if (!data.value) return {}
  return data.value.reduce((acc, item) => {
    acc[item.key] = {
      isLeaf: item.isLeaf,
      value: item.translation,
      key: item.key,
    }
    return acc
  }, {}) as Record<string, any>
})

function unFlatten(langs: Translation[]): Record<string, any> {
  const result: Record<string, any> = {}
  langs.forEach((item) => {
    if (item.isLeaf) {
      result[item.key] = item.translation
    } else {
      let current: Record<string, any> = result
      const parts = item.key.split('.')

      for (let i = 0; i < parts.length; i++) {
        if (i === parts.length - 1) {
          current[parts[i]] = item.translation
        } else {
          current = current[parts[i]] = current[parts[i]] || {}
        }
      }
    }
  })
  return result
}

function genTree(langs: Record<string, any>, parentKey?: string): TreeItem[] {
  const tree: TreeItem[] = []

  for (const key in langs) {
    const item = langs[key]
    const fullKey = `${parentKey ? `${parentKey}.` : ''}${key}`
    if (isObject(item)) {
      const mapItem = map.value?.[fullKey]
      const realKey = mapItem?.key || fullKey
      tree.push({
        title: fullKey,
        key: realKey,
        isLeaf: false,
        children: genTree(item, fullKey),
      })
    } else {
      tree.push({
        title: key,
        key: fullKey,
        isLeaf: true,
      })
    }
  }

  return tree
}

const treeNodes = computed(() => {
  if (!unFlattened.value) return []
  const tree = genTree(unFlattened.value)

  return tree
})
</script>

<style scoped></style>
