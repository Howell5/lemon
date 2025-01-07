<script setup lang="ts">
import { ref, watch, type Ref } from 'vue'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { AlertDialog } from '@/components/ui/alert-dialog'

// import {
//   baiduTranslate,
//   baiduLocaleMap,
//   type KeyofBaiduLocales,
// } from '@/translator/index'

type KeyofBaiduLocales = 'en' | 'zh' | 'zh-CN' | 'zh-TW' | 'zh-HK' | 'zh-SG'

interface Props {
  currentKey: string
}

const props = withDefaults(defineProps<Props>(), {
  currentKey: '',
})

const projectStore = useProjectStore()

const project = computed(() => projectStore.project)

const route = useRoute()

const slug = route.params.slug as string

const certainKey = computed(() => props.currentKey)

const { data } = useTranslation(slug, certainKey)

function baiduTranslate(enValue: string, from: string, to: string) {
  return Promise.resolve(enValue)
}

const baiduLocaleMap = {
  en: 'en',
  zh: 'zh',
  'zh-CN': 'zh',
  'zh-TW': 'zh',
  'zh-HK': 'zh',
  'zh-SG': 'zh',
}

// 定义触发事件
const emit = defineEmits<{
  'update:currentKey': [key: string]
  edit: [params: Record<string, any>, isDel?: boolean]
  publish: []
}>()

const innerLocales: Ref<Partial<Record<string, string>>> = ref({})

watch(
  () => data.value,
  () => {
    if (!project.value || !data.value) return
    const defaultLocale = project.value?.defaultLocale
    const list = data.value?.sort((item) =>
      item.locale === defaultLocale ? -1 : 1
    )
    innerLocales.value = list?.reduce((acc, item) => {
      acc[item.locale] = item.translation
      return acc
    }, {})
  }
)

function change(locale: KeyofBaiduLocales, value: string) {
  innerLocales.value = {
    ...innerLocales.value,
    [locale]: value,
  }
}

async function handleTranslate(target: KeyofBaiduLocales) {
  const enValue = innerLocales.value.en
  if (!enValue) return

  const to = baiduLocaleMap[target]
  const value = await baiduTranslate(enValue, 'en', to)

  innerLocales.value = {
    ...innerLocales.value,
    [target]: value,
  }
}

function fallbackAllMissing() {
  const enValue = innerLocales.value.en
  if (!enValue) return

  const keys = Object.keys(innerLocales.value) as KeyofBaiduLocales[]
  keys.forEach((key) => {
    if (key === 'en' || innerLocales.value[key]) return
    innerLocales.value[key] = enValue
  })
}

function deleteKey() {
  emit('edit', { [props.currentKey]: null }, true)
}

function clearAll() {
  const keys = Object.keys(innerLocales.value) as KeyofBaiduLocales[]
  keys.forEach((key) => {
    innerLocales.value[key] = ''
  })
}

function translateAllMissing() {
  const enValue = innerLocales.value.en
  if (!enValue) return

  const keys = Object.keys(innerLocales.value) as KeyofBaiduLocales[]
  keys.forEach(async (key) => {
    if (key === 'en' || innerLocales.value[key]) return

    const to = baiduLocaleMap[key]
    const value = await baiduTranslate(enValue, 'en', to)
    innerLocales.value[key] = value
  })
}

function modifyKey() {
  const newKey = prompt(
    '请输入新的 Key 值 (！！！一般不建议使用，更推荐使用 fork !!!）',
    props.currentKey
  )
  if (newKey && newKey !== props.currentKey) {
    const newLocales = { ...innerLocales.value }
    emit('edit', { [props.currentKey]: null }) // Delete old key
    emit('edit', { [newKey]: newLocales }) // Add new key
    emit('update:currentKey', newKey)
  }
}

function forkKey() {
  const newKey = prompt('请输入新的 Key 值', `${props.currentKey}_fork`)
  if (newKey && newKey !== props.currentKey) {
    const newLocales = JSON.parse(JSON.stringify(innerLocales.value))
    emit('edit', { [newKey]: newLocales }) // Add new forked key
    emit('update:currentKey', newKey)
  }
}

function confirmDraft() {
  emit('edit', {
    [props.currentKey]: innerLocales.value,
  })
}

function changeLocaleValue(value: string, key: string) {
  innerLocales.value[key] = value
}
</script>

<template>
  <div class="h-full">
    <div v-if="currentKey" class="p-16px">
      <div v-if="currentKey" class="mb-32px">
        <div class="flex justify-between items-center gap-2px">
          <h2 class="font-medium text-16px mb-12px">`{{ currentKey }}`</h2>
          <AlertDialog
            title="你确定要删除这个 Key 值吗？"
            content="除非你知道确切会发生什么，否则不要删除 Key 值。"
            @continue="deleteKey"
          >
            <Button size="sm" variant="destructive">删除该 Key 值</Button>
          </AlertDialog>
        </div>

        <div class="flex items-center gap-12px">
          <Button
            size="sm"
            disabled
            rounded
            class="bg-gradient-to-r from-sky-500 to-indigo-500 text-white"
            @click="translateAllMissing"
          >
            翻译所有缺失的语言
          </Button>

          <Button
            size="sm"
            rounded
            class="bg-gradient-to-r from-green-500 to-teal-500 text-white"
            @click="modifyKey"
          >
            修改 Key 值
          </Button>

          <Button
            size="sm"
            rounded
            class="bg-gradient-to-r from-yellow-500 to-orange-500 text-white"
            @click="forkKey"
          >
            Fork 当前内容
          </Button>

          <Button
            rounded
            size="sm"
            class="bg-gradient-to-r from-sky-500 to-indigo-500 text-white"
            @click="fallbackAllMissing"
          >
            fallback 缺失语言
          </Button>

          <Button
            size="sm"
            rounded
            class="bg-gradient-to-r from-purple-500 to-pink-500 text-white"
            @click="clearAll"
          >
            清空
          </Button>
        </div>
      </div>

      <div
        v-for="(value, key) in innerLocales"
        :key="key"
        class="flex items-center mt-8px gap-12px"
      >
        <label for="input" class="min-w-[40px]">{{ key }}</label>
        <Input
          class="flex-1"
          :model-value="value"
          @update:model-value="changeLocaleValue($event, key)"
        />
        <Button
          v-if="key !== 'en'"
          @click="() => handleTranslate(key as KeyofBaiduLocales)"
        >
          Translate
        </Button>
      </div>

      <div class="flex flex-row-reverse mt-20px">
        若要使得翻译生效，请点击"发布"按钮。
      </div>

      <div class="flex flex-row-reverse mt-8px gap-12px">
        <Button @click="emit('publish')">发布</Button>
      </div>

      <div class="leading-relaxed mt-12px">
        <h2 class="font-medium text-20px">使用提示:</h2>
        <ul>
          <li>
            1.
            请先填写英文，再点击翻译按钮，翻译结果会自动填充到对应的语言框中。⚠️注意：翻译结果可能不准确，请自行校对；如果文本中有
            {{ '{}' }}这样的占位符，请不要翻译占位符内的内容。比如 "
            <span
              class="underline decoration-sky-500 underline-offset-4 decoration-2"
            >
              Will automatically renew on {{ '{date}' }}
            </span>
            " 不要翻译成 "
            <span
              class="underline decoration-red-500 underline-offset-4 decoration-2"
            >
              将在{{ '{日期}' }}自动续费
            </span>
            " ，正确的应该是 "
            <span
              class="underline decoration-sky-500 underline-offset-4 decoration-2"
            >
              将在{{ '{date}' }}自动续费
            </span>
            " 。
          </li>
        </ul>
      </div>
    </div>
    <div v-else>sss</div>
  </div>
</template>
