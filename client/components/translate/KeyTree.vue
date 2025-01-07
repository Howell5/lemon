<template>
  <div class="flex flex-col gap-4px">
    <Tree v-model:selected-key="selectedKey" :items="treeNodes" />
  </div>
</template>

<script setup lang="ts">
import { Tree, type TreeItem } from '@/components/ui/tree'
import isObject from 'lodash-es/isObject'
import { unFlatten } from '@/utils/index'

const route = useRoute()

const slug = route.params.slug as string

const qKey = route.query.key as string

const { data } = useProjectTranslations(ref(slug), 'en')

const selectedKey = ref<string>('')

const projectStore = useProjectStore()

// watchEffect(() => {
//   if (qKey) {
//     selectedKey.value = {
//       [qKey]: true,
//     }
//   }
// })

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
  const obj = unFlatten(list.value)

  console.log({ obj })

  const tree = genTree(obj)

  console.log({ tree })

  return tree
})
</script>

<style scoped></style>
