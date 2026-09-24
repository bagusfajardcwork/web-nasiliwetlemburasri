<template>
  <GeneratorBaseLayout :on-submit="props.onSubmit" @submit="$emit('submit', $event)">
    <slot />

    <template #toolbar="{ handleSubmit }">
      <div class="flex items-center justify-between pt-2">
        <!-- Left: Attachment -->
        <UiTooltip content="Attachment" placement="top" variant="light">
          <label
            class="flex size-9 cursor-pointer items-center hover:bg-gray-100 dark:hover:bg-gray-900 justify-center gap-1.5 rounded-lg border border-gray-200 text-sm text-gray-500 hover:text-gray-700 dark:border-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
          >
            <input type="file" class="sr-only" />
            <PaperClipIcon class="size-5" />
          </label>
        </UiTooltip>

        <!-- Right: Model + Send -->
        <div class="flex items-center gap-2">
          <div class="relative" ref="modelDropdownRef">
            <button
              @click="modelOpen = !modelOpen"
              :aria-expanded="modelOpen"
              class="flex items-center h-9 rounded-lg px-2.5 py-2 hover:bg-gray-100 dark:hover:bg-gray-900 gap-1.5 text-sm text-gray-700 dark:text-gray-400"
            >
              <component :is="currentModelIcon" class="size-[18px] shrink-0" />
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
                  <component :is="icon" class="size-[18px] shrink-0" />
                  {{ label }}
                  <component :is="badge" v-if="badge" />
                </button>
              </li>
            </ul>
          </div>

          <button
            @click="handleSubmit"
            class="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-gray-900 text-white transition hover:bg-gray-800 dark:bg-white/90 dark:text-gray-800 dark:hover:bg-gray-900 dark:hover:text-white/90"
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
import UiTooltip from '@/components/ui/Tooltip.vue'
import { PaperClipIcon } from '@/icons'
import BoltAltIcon from '@/icons/BoltAltIcon.vue'
import MicrophoneIcon from '@/icons/MicrophoneIcon.vue'

const props = defineProps({ onSubmit: { type: Function, default: null } })
defineEmits(['submit'])

// ─── Model icons ────────────────────────────────────────────────────────────
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
const GEMINI_ICON = {
  setup() {
    return () =>
      h('span', { class: 'flex items-center justify-center shrink-0 size-[18px]' }, [
        h('img', { src: '/images/model/gemini.svg', width: '18', height: '18', alt: 'Gemini' }),
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
  { label: 'Gemini 2.5 Pro', icon: GEMINI_ICON },
  { label: 'Gemini Flash', icon: GEMINI_ICON },
]

const modelOpen = ref(false)
const modelDropdownRef = ref(null)
const modelSelected = ref('Auto')

const currentModelIcon = computed(() => {
  const m = MODEL_OPTIONS.find((m) => m.label === modelSelected.value)
  return m ? m.icon : null
})

const handleClickOutside = (event) => {
  if (!document.contains(event.target)) return
  if (modelDropdownRef.value && !modelDropdownRef.value.contains(event.target))
    modelOpen.value = false
}

onMounted(() => document.addEventListener('click', handleClickOutside))
onUnmounted(() => document.removeEventListener('click', handleClickOutside))

const selectModel = (label) => {
  modelSelected.value = label
  modelOpen.value = false
}
</script>
