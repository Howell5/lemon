<template>
  <div class="flex flex-col gap-4">
    <Tree
      v-model:selectionKeys="selectedKey"
      :value="treeNodes"
      selectionMode="single"
      :metaKeySelection="true"
    />
    <!-- <ul v-for="item in treeNodes" :key="item.key">
      <template v-if="item.children">
        <div>
          <span>{{ item.label }}</span>
          <ul>
            <li v-for="child in item.children" :key="child.key">
              {{ child.label }}
            </li>
          </ul>
        </div>
      </template>
      <template v-else>
        <li>{{ item.label }}</li>
      </template>
    </ul> -->
  </div>
</template>

<script setup lang="ts">
import Tree, { type TreeProps } from 'primevue/tree'
import isObject from 'lodash-es/isObject'
import { unFlatten } from '../../utils/index'

const route = useRoute()

const slug = route.params.slug as string

const qKey = route.query.key as string

const { data } = useProjectTranslations(ref(slug), 'en')

const selectedKey = ref<Record<string, boolean>>({})

const projectStore = useProjectStore()

watchEffect(() => {
  if (qKey) {
    selectedKey.value = {
      [qKey]: true,
    }
  }
})

watch(
  () => selectedKey.value,
  (newVal) => {
    if (Object.keys(newVal || {}).length > 0) {
      projectStore.currentKey = Object.keys(newVal)[0]
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

function genTree(lang: any, parentKey?: string): TreeProps['value'] {
  const tree = []
  for (let key in lang) {
    const value = lang[key]
    const realKey = parentKey ? `${parentKey}.${key}` : key
    if (isObject(value)) {
      tree.push({
        label: key,
        key: realKey,
        children: genTree(value, realKey),
      })
    } else {
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

  const tree = genTree(obj)

  return tree
})
</script>

<style scoped></style>
