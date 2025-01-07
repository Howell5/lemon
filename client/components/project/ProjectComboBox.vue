<script setup lang="ts">
import { Button } from '@/components/ui/button'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command'

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { cn } from '@/lib/utils'
import { Check, ChevronsUpDown } from 'lucide-vue-next'
import { ref } from 'vue'

const { projectList } = userProjectList()

const list = computed(() => {
  return projectList.value?.map((item) => ({
    value: item.slug,
    label: item.name,
  }))
})

const projectStore = useProjectStore()

const open = ref(false)

function selectProject(slug: string) {
  projectStore.currentProjectSlug = slug
  open.value = false
}
</script>

<template>
  <Popover v-model:open="open">
    <PopoverTrigger as-child>
      <Button
        variant="outline"
        role="combobox"
        :aria-expanded="open"
        class="w-[200px] justify-between"
      >
        {{
          projectStore?.currentProjectSlug
            ? projectStore.currentProjectSlug
            : 'Select project...'
        }}
        <ChevronsUpDown class="ml-2 h-4 w-4 shrink-0 opacity-50" />
      </Button>
    </PopoverTrigger>
    <PopoverContent class="w-[200px] p-0">
      <Command>
        <CommandInput class="h-9" placeholder="Search project..." />
        <CommandEmpty>No project found.</CommandEmpty>
        <CommandList>
          <CommandGroup>
            <CommandItem
              v-for="item in list"
              :key="item.value"
              :value="item.value"
              @select="selectProject(item.value)"
            >
              {{ item.label }}
              <Check
                :class="
                  cn(
                    'ml-auto h-4 w-4',
                    projectStore.currentProjectSlug === item.value
                      ? 'opacity-100'
                      : 'opacity-0'
                  )
                "
              />
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </Command>
    </PopoverContent>
  </Popover>
</template>
