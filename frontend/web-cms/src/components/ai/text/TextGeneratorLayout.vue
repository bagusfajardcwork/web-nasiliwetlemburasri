<template>
  <GeneratorBaseLayout
    input-z-class="z-40"
    :on-submit="props.onSubmit"
    @submit="$emit('submit', $event)"
  >
    <slot />

    <template #toolbar="{ handleSubmit }">
      <div class="flex items-center justify-between pt-2">
        <div class="flex items-center gap-1">
          <!-- + Dropdown -->
          <div class="relative" ref="dropdownRef">
            <button
              @click="dropdownOpen = !dropdownOpen"
              class="flex size-9 items-center justify-center dark:hover:bg-gray-900 gap-1.5 rounded-lg border border-gray-100 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
              >
                <path
                  d="M5 10.0002H15.0006M10.0002 5V15.0006"
                  stroke="currentColor"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </button>
            <ul
              v-if="dropdownOpen"
              role="menu"
              class="absolute bottom-full left-0 mb-2 min-w-[200px] space-y-0.5 rounded-xl bg-white p-1.5 shadow-md dark:bg-gray-900"
            >
              <li>
                <input type="file" ref="fileInputRef" class="hidden" />
                <button @click="triggerFileInput" :class="menuItemClass(false)" role="menuitem">
                  <UploadIcon class="size-[18px] shrink-0" />
                  Upload File
                </button>
              </li>
              <hr class="my-1 border-gray-200 dark:border-white/10" />
              <li v-for="{ label, icon } in SEARCH_OPTIONS" :key="label">
                <button
                  @click="selectOption(label)"
                  :class="menuItemClass(selected === label)"
                  role="menuitem"
                >
                  <component :is="icon" class="size-[18px] shrink-0" />
                  {{ label }}
                </button>
              </li>
            </ul>
          </div>

          <!-- After-select chip -->
          <button
            v-if="selected !== ''"
            @click="selected = ''"
            class="text-brand-500 group hover:bg-brand-500/10 flex h-9 items-center gap-2 rounded-lg px-2.5 py-2 text-sm font-medium"
          >
            <CloseIcon
              class="bg-brand-500/20 hidden size-5 shrink-0 rounded-full group-hover:block"
            />
            <component :is="CHIP_ICONS[selected]" class="size-5 shrink-0 group-hover:hidden" />
            <span class="hidden sm:inline">{{ selected }}</span>
          </button>
        </div>

        <div class="flex items-center gap-2">
          <!-- Model dropdown -->
          <div class="relative" ref="modelDropdownRef">
            <button
              @click="modelOpen = !modelOpen"
              :aria-expanded="modelOpen"
              class="flex items-center gap-1.5 text-sm h-9 px-2.5 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-900 text-gray-700 dark:text-gray-400"
            >
              <component :is="currentModelIcon" class="size-5 shrink-0" />
              <span>{{ modelSelected }}</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 18 18"
                fill="none"
                :class="['transition-transform duration-150', modelOpen ? 'rotate-180' : '']"
              >
                <path
                  d="M4.3125 7.21875L9 11.9063L13.6875 7.21875"
                  stroke="currentColor"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </button>
            <ul
              v-if="modelOpen"
              role="menu"
              class="absolute right-0 bottom-full mb-2 min-w-[220px] space-y-0.5 rounded-xl bg-white p-1.5 shadow-md dark:bg-gray-900"
            >
              <li v-for="{ label, icon, badge } in MODEL_OPTIONS" :key="label">
                <button
                  @click="selectModel(label)"
                  :class="menuItemClass(modelSelected === label)"
                  role="menuitem"
                >
                  <component :is="icon" class="size-5 shrink-0" />
                  {{ label }}
                  <component :is="badge" v-if="badge" />
                </button>
              </li>
            </ul>
          </div>

          <!-- Send Button -->
          <button
            @click="handleSubmit"
            class="inline-flex size-9 items-center justify-center rounded-lg bg-gray-900 text-white transition hover:bg-gray-800 dark:bg-white/90 dark:text-gray-800 dark:hover:bg-gray-900 dark:hover:text-white/90"
          >
            <MicrophoneIcon class="size-5" />
          </button>
        </div>
      </div>
    </template>
  </GeneratorBaseLayout>
</template>

<script setup>
import { ref, computed, h, onMounted, onUnmounted } from 'vue'
import GeneratorBaseLayout from '../layout/GeneratorBaseLayout.vue'

import UploadIcon from '@/icons/Upload.vue'
import BoltAltIcon from '@/icons/BoltAltIcon.vue'
import GlobeIcon from '@/icons/GlobeIcon.vue'
import TelescopeIcon from '@/icons/TelescopeIcon.vue'
import CloseIcon from '@/icons/CloseIcon.vue'
import MicrophoneIcon from '@/icons/MicrophoneIcon.vue'

const props = defineProps({ onSubmit: { type: Function, default: null } })
defineEmits(['submit'])

// ─── Model icon fragments ───────────────────────────────────────────────────
const GPT_ICON = {
  setup() {
    return () =>
      h('span', { class: 'flex items-center justify-center shrink-0 size-[18px]' }, [
        h('img', {
          src: '/images/model/gpt-light.svg',
          width: '18',
          height: '18',
          class: 'block dark:hidden',
          alt: 'gpt',
        }),
        h('img', {
          src: '/images/model/gpt-dark.svg',
          width: '18',
          height: '18',
          class: 'hidden dark:block',
          alt: 'gpt',
        }),
      ])
  },
}
const CLAUDE_ICON = {
  setup() {
    return () =>
      h('span', { class: 'flex items-center justify-center shrink-0 size-[18px]' }, [
        h('img', { src: '/images/model/claude.svg', width: '18', height: '18', alt: 'claude' }),
      ])
  },
}
const GROK_ICON = {
  setup() {
    return () =>
      h('span', { class: 'flex items-center justify-center shrink-0 size-[18px]' }, [
        h('img', {
          src: '/images/model/grok-light.svg',
          width: '18',
          height: '18',
          class: 'block dark:hidden',
          alt: 'grok',
        }),
        h('img', {
          src: '/images/model/grok-dark.svg',
          width: '18',
          height: '18',
          class: 'hidden dark:block',
          alt: 'grok',
        }),
      ])
  },
}
const NewBadge = {
  setup() {
    return () =>
      h(
        'span',
        {
          class:
            'bg-success-50 dark:bg-success-500/10 dark:text-success-500 text-success-600 inline-flex h-5 items-center justify-center rounded-full px-2 text-xs',
        },
        'New',
      )
  },
}

// ─── Shared menu item class helper ─────────────────────────────────────────
const MENU_ITEM_BASE =
  'flex w-full items-center gap-2 rounded-lg px-1.5 py-2 text-sm hover:bg-gray-100 hover:text-gray-900 dark:hover:bg-gray-800 dark:hover:text-white'
const menuItemClass = (active) =>
  `${MENU_ITEM_BASE} ${active ? 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-white' : 'text-gray-700 dark:text-gray-400'}`

const MODEL_OPTIONS = [
  { label: 'Auto', icon: BoltAltIcon },
  { label: 'GPT 4.5', icon: GPT_ICON, badge: NewBadge },
  { label: 'GPT 5.5', icon: GPT_ICON },
  { label: 'Claude Sonnet 4.5', icon: CLAUDE_ICON },
  { label: 'Claude Sonnet 4.6', icon: CLAUDE_ICON },
  { label: 'Grok 3.0', icon: GROK_ICON },
  { label: 'Grok 2.0', icon: GROK_ICON },
]

const SEARCH_OPTIONS = [
  { label: 'Web Search', icon: GlobeIcon },
  { label: 'Deep Search', icon: TelescopeIcon },
]

const CHIP_ICONS = {
  'Upload File': UploadIcon,
  'Web Search': GlobeIcon,
  'Deep Search': TelescopeIcon,
}

// ─── Local state ─────────────────────────────────────────────────────────────
const dropdownOpen = ref(false)
const dropdownRef = ref(null)
const fileInputRef = ref(null)
const selected = ref('')

const modelOpen = ref(false)
const modelDropdownRef = ref(null)
const modelSelected = ref('Auto')

const currentModelIcon = computed(() => {
  const m = MODEL_OPTIONS.find((m) => m.label === modelSelected.value)
  return m ? m.icon : null
})

const handleClickOutside = (event) => {
  if (!document.contains(event.target)) return
  if (dropdownRef.value && !dropdownRef.value.contains(event.target)) dropdownOpen.value = false
  if (modelDropdownRef.value && !modelDropdownRef.value.contains(event.target))
    modelOpen.value = false
}

onMounted(() => document.addEventListener('click', handleClickOutside))
onUnmounted(() => document.removeEventListener('click', handleClickOutside))

const triggerFileInput = () => {
  fileInputRef.value?.click()
  dropdownOpen.value = false
}
const selectOption = (label) => {
  selected.value = label
  dropdownOpen.value = false
}
const selectModel = (label) => {
  modelSelected.value = label
  modelOpen.value = false
}
</script>
