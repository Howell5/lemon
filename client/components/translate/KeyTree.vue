<template>
  <div class="flex flex-col gap-4 w-350">
    <Tree :value="treeNodes" />
  </div>
</template>

<script setup lang="ts">
import Tree, { type TreeProps } from 'primevue/tree'
import isObject from 'lodash-es/isObject'
import { unFlatten } from '../../utils/index'
const slug = useRoute().params.slug as string

const { data } = useTranslation(slug, { locale: 'en' })

const list = computed(() => {
  return data.value?.reduce((acc, item) => {
    acc[item.key] = item.translation
    return acc
  }, {})
})

function genTree(lang: any, parentKey?: string): TreeProps['value'] {
  const tree = []
  for (let key in lang) {
    const value = lang[key]
    if (isObject(value)) {
      const realKey = parentKey ? `${parentKey}.${key}` : key
      tree.push({
        label: key,
        key: realKey,
        children: genTree(value, realKey),
      })
    } else {
      const realKey = parentKey
      tree.push({
        label: key,
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

  // console.log({ tree })

  return tree
})
</script>

<style scoped></style>
