<script setup lang="ts">
export interface TreeItem {
  title: string
  icon?: string
  key: string
  isLeaf?: boolean
  children?: TreeItem[]
}

const props = defineProps<{
  items: TreeItem[]
  level: number
  expandedItems: Set<string>
  parentPath?: string
  currentKey?: string
}>()

const emit = defineEmits<{
  (event: 'toggle', item: TreeItem, path: string): void
}>()

const getItemPath = (item: TreeItem) => {
  return props.parentPath ? `${props.parentPath}/${item.title}` : item.title
}

const hasChildren = (item: TreeItem) =>
  item.children && item.children.length > 0

function toggle(item: TreeItem, path: string) {
  emit('toggle', item, path)
}
</script>

<template>
  <ul class="min-w-200px select-none">
    <li v-for="item in items" :key="item.title" class="relative my-2px">
      <div
        class="flex items-center py-4px px-8px rounded-md hover:bg-neutral-900 hover:text-white cursor-pointer"
        :class="{
          'pl-[calc(0.5rem_+_var(--level)_*_1rem)]': level > 0,
          'bg-neutral-900 text-white': item.isLeaf && item.key === currentKey,
        }"
        :style="{ '--level': level }"
        @click="toggle(item, getItemPath(item))"
      >
        <template v-if="hasChildren(item)">
          <span class="mr-4px h-16px w-16px shrink-0">
            <svg
              class="h-16px w-16px transition-transform duration-200"
              :class="{
                'transform rotate-90': expandedItems.has(getItemPath(item)),
              }"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <path
                fill="none"
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="m9 18 6-6-6-6"
              />
            </svg>
          </span>
        </template>
        <span v-else class="ml-5px"></span>

        <span v-if="item.icon" class="mr-6px h-16px w-16px shrink-0">
          <Icon :name="item.icon" class="h-16px w-16px" />
        </span>

        <span class="text-14px">{{ item.title }}</span>
      </div>

      <template
        v-if="hasChildren(item) && expandedItems.has(getItemPath(item))"
      >
        <TreeItems
          :items="item.children!"
          :level="level + 1"
          :expanded-items="expandedItems"
          :parent-path="getItemPath(item)"
          @toggle="(item, path) => toggle(item, path)"
        />
      </template>
    </li>
  </ul>
</template>
