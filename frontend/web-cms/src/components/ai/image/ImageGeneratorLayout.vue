<template>
  <GeneratorBaseLayout :on-submit="props.onSubmit" @submit="$emit('submit', $event)">
    <slot />

    <template #toolbar="{ handleSubmit }">
      <div class="flex items-center justify-between pt-2">
        <!-- Left: Attachment + mobile menu + desktop dropdowns -->
        <div class="flex items-center gap-2">
          <UiTooltip content="Attachment" placement="top" variant="light">
            <label
              class="flex size-9 cursor-pointer items-center justify-center gap-1.5 rounded-lg border border-gray-200 text-sm text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:hover:bg-gray-900 dark:border-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
            >
              <input type="file" class="sr-only" />
              <PaperClipIcon class="size-5" />
            </label>
          </UiTooltip>

          <!-- Mobile Menu -->
          <div ref="mobileMenuRef" class="relative block sm:hidden" @keydown.esc="closeMobileMenu">
            <button
              type="button"
              @click="mobileMenuOpen = !mobileMenuOpen"
              class="flex size-9 cursor-pointer items-center justify-center gap-1.5 rounded-lg border border-gray-200 text-sm text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:hover:bg-gray-900 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:text-gray-300"
            >
              <HorizontalSlideIcon class="size-5" />
            </button>

            <div
              v-if="mobileMenuOpen"
              class="shadow-theme-md absolute bottom-full left-0 mb-2 w-56 overflow-hidden rounded-2xl bg-white p-1.5 dark:bg-gray-900"
            >
              <div v-if="activeMenu === null">
                <button
                  @click="activeMenu = 'aspect-ratio'"
                  class="flex w-full items-center justify-between gap-2 rounded-lg px-3.5 py-3 text-gray-800 hover:bg-gray-100 dark:text-white/90 dark:hover:bg-gray-800"
                >
                  <div class="flex items-center gap-2.5">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="18"
                      height="18"
                      viewBox="0 0 20 20"
                      fill="none"
                    >
                      <path
                        d="M15.0001 14.9997L15.0001 4.99967C15.0001 4.0792 14.2539 3.33301 13.3335 3.33301L6.66679 3.33301C5.74631 3.33301 5.00012 4.0792 5.00012 4.99967L5.00012 14.9997C5.00012 15.9201 5.74631 16.6663 6.66679 16.6663L13.3335 16.6663C14.2539 16.6663 15.0001 15.9201 15.0001 14.9997Z"
                        stroke="currentColor"
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                    <span class="text-sm font-medium">Aspect Ratio</span>
                  </div>
                  <div class="flex items-center gap-1">
                    <span class="text-sm">{{ selected }}</span
                    ><ChevronRightIcon class="size-4" />
                  </div>
                </button>
                <button
                  @click="activeMenu = 'variants'"
                  class="flex w-full items-center justify-between gap-2 rounded-lg px-3.5 py-3 text-gray-800 hover:bg-gray-100 dark:text-white/90 dark:hover:bg-gray-800"
                >
                  <div class="flex items-center gap-2.5">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="18"
                      height="18"
                      viewBox="0 0 20 20"
                      fill="none"
                    >
                      <path
                        d="M4.18733 11.3287L2.61708 11.8916C2.19187 12.044 2.19187 12.6453 2.61708 12.7978L9.51246 15.2695C9.82748 15.3825 10.1719 15.3825 10.487 15.2695L17.3824 12.7978C17.8076 12.6453 17.8076 12.044 17.3824 11.8916L15.8194 11.3313M9.51246 4.72923L2.61708 7.20101C2.19187 7.35343 2.19187 7.95477 2.61708 8.10719L9.51246 10.579C9.82748 10.6919 10.1719 10.6919 10.487 10.579L17.3824 8.1072C17.8076 7.95477 17.8076 7.35343 17.3824 7.20101L10.487 4.72923C10.172 4.6163 9.82748 4.6163 9.51246 4.72923Z"
                        stroke="currentColor"
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                    <span class="text-sm font-medium">Variants</span>
                  </div>
                  <div class="flex items-center gap-1">
                    <span class="text-sm">{{ variantSelected }}</span
                    ><ChevronRightIcon class="size-4" />
                  </div>
                </button>
                <button
                  @click="activeMenu = 'resolution'"
                  class="flex w-full items-center justify-between gap-2 rounded-lg px-3.5 py-3 text-gray-800 hover:bg-gray-100 dark:text-white/90 dark:hover:bg-gray-800"
                >
                  <div class="flex items-center gap-2.5">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="18"
                      height="18"
                      viewBox="0 0 20 20"
                      fill="none"
                    >
                      <path
                        d="M14.0339 3.33301H5.96607C5.50036 3.33301 5.07326 3.59191 4.85784 4.0048L3.09863 7.37662C2.86279 7.82865 2.92512 8.37862 3.25616 8.7664L10 16.6663L16.7439 8.7664C17.0749 8.37862 17.1372 7.82865 16.9014 7.37662L15.1422 4.0048C14.9268 3.59191 14.4997 3.33301 14.0339 3.33301Z"
                        stroke="currentColor"
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M7.08334 7.28711L12.9167 7.28711"
                        stroke="currentColor"
                        stroke-width="1.5"
                        stroke-linecap="round"
                      />
                    </svg>
                    <span class="text-sm font-medium">Resolution</span>
                  </div>
                  <div class="flex items-center gap-1">
                    <span class="text-sm">{{ resolutionSelected }}</span
                    ><ChevronRightIcon class="size-4" />
                  </div>
                </button>
              </div>
              <SubMenu
                v-if="activeMenu === 'aspect-ratio'"
                title="Aspect Ratio"
                @back="activeMenu = null"
              >
                <button
                  v-for="item in aspectRatios"
                  :key="item.value"
                  @click="selectAspectRatio(item.value)"
                  :class="[
                    'flex w-full items-center gap-2 rounded-lg px-2 py-2 text-sm hover:bg-gray-100 hover:text-gray-900 dark:hover:bg-gray-800 dark:hover:text-white',
                    selected === item.value
                      ? 'bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-white'
                      : 'text-gray-700 dark:text-gray-400',
                  ]"
                >
                  <component :is="item.icon" />{{ item.value }}
                </button>
              </SubMenu>
              <SubMenu v-if="activeMenu === 'variants'" title="Variants" @back="activeMenu = null">
                <button
                  v-for="item in variants"
                  :key="item"
                  @click="selectVariant(item)"
                  :class="[
                    'flex w-full items-center gap-2 rounded-lg px-2 py-2 text-sm hover:bg-gray-100 hover:text-gray-900 dark:hover:bg-gray-800 dark:hover:text-white',
                    variantSelected === item
                      ? 'bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-white'
                      : 'text-gray-700 dark:text-gray-400',
                  ]"
                >
                  {{ item }}
                </button>
              </SubMenu>
              <SubMenu
                v-if="activeMenu === 'resolution'"
                title="Resolution"
                @back="activeMenu = null"
              >
                <button
                  v-for="item in resolutions"
                  :key="item"
                  @click="selectResolution(item)"
                  :class="[
                    'flex w-full items-center gap-2 rounded-lg px-2 py-2 text-sm hover:bg-gray-100 hover:text-gray-900 dark:hover:bg-gray-800 dark:hover:text-white',
                    resolutionSelected === item
                      ? 'bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-white'
                      : 'text-gray-700 dark:text-gray-400',
                  ]"
                >
                  {{ item }}
                </button>
              </SubMenu>
            </div>
          </div>

          <!-- Desktop dropdowns -->
          <div class="hidden gap-2 sm:flex">
            <div class="relative" ref="aspectRatioRef">
              <UiTooltip content="Aspect Ratio" placement="top" variant="light">
                <button
                  type="button"
                  @click="open = !open"
                  :aria-expanded="open"
                  class="flex cursor-pointer h-9 items-center justify-center gap-1.5 rounded-lg border border-gray-200 py-2 pr-3 pl-2.5 text-sm text-gray-500 dark:hover:bg-gray-900 hover:text-gray-700 dark:border-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                >
                  <AspectIcon class="size-5" /><span>{{ selected }}</span>
                </button>
              </UiTooltip>
              <ul
                v-if="open"
                class="shadow-theme-md absolute bottom-full left-0 mb-2 min-w-[106px] space-y-0.5 rounded-xl bg-white p-1.5 dark:bg-gray-900"
              >
                <li v-for="item in aspectRatios" :key="item.value">
                  <button
                    type="button"
                    @click="selectAspectRatioDesktop(item.value)"
                    :class="[
                      'flex w-full items-center gap-2 rounded-lg px-1.5 py-2 text-sm transition-colors hover:bg-gray-100 hover:text-gray-900 dark:hover:bg-gray-800 dark:hover:text-white',
                      selected === item.value
                        ? 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-white'
                        : 'text-gray-700 dark:text-gray-400',
                    ]"
                    role="menuitem"
                  >
                    <component :is="item.icon" />{{ item.value }}
                  </button>
                </li>
              </ul>
            </div>

            <div ref="variantDropdownRef" class="relative">
              <UiTooltip content="Variants" placement="top" variant="light">
                <button
                  type="button"
                  @click="variantOpen = !variantOpen"
                  :aria-expanded="variantOpen"
                  class="flex cursor-pointer h-9 items-center justify-center gap-1.5 rounded-lg border border-gray-200 py-2 pr-3 pl-2.5 text-sm text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:hover:bg-gray-900 dark:border-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                >
                  <StackIcon class="size-5" /><span>{{ variantSelected }}</span>
                </button>
              </UiTooltip>
              <ul
                v-if="variantOpen"
                class="shadow-theme-md absolute bottom-full left-0 mb-2 min-w-[74px] space-y-0.5 rounded-xl bg-white p-1.5 dark:bg-gray-900"
              >
                <li v-for="variant in variants" :key="variant">
                  <button
                    type="button"
                    @click="selectVariantDesktop(variant)"
                    :class="[
                      'flex w-full items-center gap-2 rounded-lg px-1.5 py-2 text-sm transition-colors hover:bg-gray-100 hover:text-gray-900 dark:hover:bg-gray-800 dark:hover:text-white',
                      variantSelected === variant
                        ? 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-white'
                        : 'text-gray-700 dark:text-gray-400',
                    ]"
                    role="menuitem"
                  >
                    {{ variant }}
                  </button>
                </li>
              </ul>
            </div>

            <div ref="resolutionDropdownRef" class="relative">
              <UiTooltip content="Resolution" placement="top" variant="light">
                <button
                  type="button"
                  @click="resolutionOpen = !resolutionOpen"
                  :aria-expanded="resolutionOpen"
                  class="flex cursor-pointer h-9 items-center justify-center gap-1.5 rounded-lg border border-gray-200 py-2 pr-3 pl-2.5 text-sm text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:hover:bg-gray-900 dark:border-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                >
                  <DiamondIcon class="size-5" /><span>{{ resolutionSelected }}</span>
                </button>
              </UiTooltip>
              <ul
                v-if="resolutionOpen"
                class="shadow-theme-md absolute bottom-full left-0 mb-2 min-w-[86px] space-y-0.5 rounded-xl bg-white p-1.5 dark:bg-gray-900"
              >
                <li v-for="resolution in resolutions" :key="resolution">
                  <button
                    type="button"
                    @click="selectResolutionDesktop(resolution)"
                    :class="[
                      'flex w-full items-center gap-2 rounded-lg px-1.5 py-2 text-sm transition-colors hover:bg-gray-100 hover:text-gray-900 dark:hover:bg-gray-800 dark:hover:text-white',
                      resolutionSelected === resolution
                        ? 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-white'
                        : 'text-gray-700 dark:text-gray-400',
                    ]"
                    role="menuitem"
                  >
                    {{ resolution }}
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <!-- Right: Model + Send -->
        <div class="flex items-center gap-2">
          <div class="relative" ref="modelDropdownRef">
            <button
              @click="modelOpen = !modelOpen"
              :aria-expanded="modelOpen"
              class="flex items-center gap-1.5 py-2 px-2.5 rounded-lg h-9 hover:bg-gray-100 dark:hover:bg-gray-900 text-sm text-gray-700 dark:text-gray-400"
            >
              <component :is="currentModelIcon" class="size-[18px] shrink-0" />
              <span>{{ modelSelected }}</span>
              <ChevronDownIcon
                :class="[
                  'size-4.5 transition-transform duration-150',
                  modelOpen ? 'rotate-180' : '',
                ]"
              />
            </button>
            <ul
              v-if="modelOpen"
              role="menu"
              class="absolute right-0 bottom-full mb-2 min-w-[220px] space-y-0.5 rounded-xl bg-white p-1.5 shadow-md dark:bg-gray-900"
            >
              <li v-for="{ label, icon, badge } in MODEL_OPTIONS" :key="label">
                <button
                  @click="selectModelDesktop(label)"
                  :class="menuItemClass(modelSelected === label)"
                  role="menuitem"
                >
                  <component :is="icon" class="size-5 shrink-0" />{{ label
                  }}<component :is="badge" v-if="badge" />
                </button>
              </li>
            </ul>
          </div>
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
import UiTooltip from '@/components/ui/Tooltip.vue'
import SubMenu from '../layout/GeneratorSubMenu.vue'
import {
  SliderHorizontal as HorizontalSlideIcon,
  ChevronRightIcon,
  ChevronDownIcon,
  PaperClipIcon,
  MicrophoneIcon,
  BoltIcon,
  Stack as StackIcon,
  Aspect as AspectIcon,
  Diamond as DiamondIcon,
} from '@/icons'

const props = defineProps({ onSubmit: { type: Function, default: null } })
defineEmits(['submit'])

// ─── Model icons ─────────────────────────────────────────────────────────────
const mkIcon = (src, alt, srcDark) => ({
  setup() {
    return () =>
      h(
        'span',
        { class: 'flex items-center justify-center shrink-0 size-[18px]' },
        srcDark
          ? [
              h('img', { src, width: '18', height: '18', class: 'block dark:hidden', alt }),
              h('img', {
                src: srcDark,
                width: '18',
                height: '18',
                class: 'hidden dark:block',
                alt,
              }),
            ]
          : [h('img', { src, width: '18', height: '18', alt })],
      )
  },
})

const NANOBANANA_ICON = mkIcon('/images/model/nanobanana.svg', 'Nano Banana')
const GPT_ICON = mkIcon('/images/model/gpt-light.svg', 'gpt', '/images/model/gpt-dark.svg')
const SEEDREAM_ICON = mkIcon('/images/model/seedream.svg', 'Seedream')
const FLUX_ICON = mkIcon('/images/model/flux.svg', 'flux', '/images/model/flux-dark.svg')
const GROK_ICON = mkIcon('/images/model/grok-light.svg', 'grok', '/images/model/grok-dark.svg')
const IDEOGRAM_ICON = mkIcon(
  '/images/model/ideogram.svg',
  'ideogram',
  '/images/model/ideogram-dark.svg',
)

const MENU_ITEM_BASE =
  'flex w-full items-center gap-2 rounded-lg px-1.5 py-2 text-sm hover:bg-gray-100 hover:text-gray-900 dark:hover:bg-gray-800 dark:hover:text-white'
const menuItemClass = (active) =>
  `${MENU_ITEM_BASE} ${active ? 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-white' : 'text-gray-700 dark:text-gray-400'}`

const MODEL_OPTIONS = [
  { label: 'Auto', icon: BoltIcon },
  { label: 'Nano Banana Pro', icon: NANOBANANA_ICON },
  { label: 'GPT 4.5 Image', icon: GPT_ICON },
  { label: 'Seedream 5.0', icon: SEEDREAM_ICON },
  { label: 'FLUX.2 Pro', icon: FLUX_ICON },
  { label: 'Grok Imagine', icon: GROK_ICON },
  { label: 'Ideogram', icon: IDEOGRAM_ICON },
]

// ─── Aspect ratio SVG icons (reusable helper) ────────────────────────────────
const mkRatioIcon = (d) => ({
  setup() {
    return () =>
      h(
        'svg',
        {
          class: 'shrink-0',
          xmlns: 'http://www.w3.org/2000/svg',
          width: '18',
          height: '18',
          viewBox: '0 0 18 18',
          fill: 'none',
        },
        [
          h('path', {
            d,
            stroke: 'currentColor',
            'stroke-width': '1.3',
            'stroke-linecap': 'round',
            'stroke-linejoin': 'round',
          }),
        ],
      )
  },
})

const aspectRatios = [
  {
    value: '16:9',
    icon: mkRatioIcon(
      'M14.25 5.25H3.75C2.92157 5.25 2.25 5.92157 2.25 6.75V11.25C2.25 12.0784 2.92157 12.75 3.75 12.75H14.25C15.0784 12.75 15.75 12.0784 15.75 11.25V6.75C15.75 5.92157 15.0784 5.25 14.25 5.25Z',
    ),
  },
  {
    value: '4:3',
    icon: mkRatioIcon(
      'M13.5 4.5H4.5C3.67157 4.5 3 5.17157 3 6V12C3 12.8284 3.67157 13.5 4.5 13.5H13.5C14.3284 13.5 15 12.8284 15 12V6C15 5.17157 14.3284 4.5 13.5 4.5Z',
    ),
  },
  {
    value: '1:1',
    icon: mkRatioIcon(
      'M12.75 3.75H5.25C4.42157 3.75 3.75 4.42157 3.75 5.25V12.75C3.75 13.5784 4.42157 14.25 5.25 14.25H12.75C13.5784 14.25 14.25 13.5784 14.25 12.75V5.25C14.25 4.42157 13.5784 3.75 12.75 3.75Z',
    ),
  },
  {
    value: '3:4',
    icon: mkRatioIcon(
      'M13.5001 13.5L13.5001 4.5C13.5001 3.67157 12.8285 3 12.0001 3L6.00012 3C5.17169 3 4.50012 3.67157 4.50012 4.5L4.50012 13.5C4.50012 14.3284 5.17169 15 6.00012 15L12.0001 15C12.8285 15 13.5001 14.3284 13.5001 13.5Z',
    ),
  },
  {
    value: '9:16',
    icon: mkRatioIcon(
      'M12.75 14.249L12.75 3.74902C12.75 2.9206 12.0784 2.24902 11.25 2.24902L6.75 2.24902C5.92157 2.24902 5.25 2.9206 5.25 3.74902L5.25 14.249C5.25 15.0775 5.92157 15.749 6.75 15.749L11.25 15.749C12.0784 15.749 12.75 15.0775 12.75 14.249Z',
    ),
  },
]

const variants = ['1', '2', '3', '4']
const resolutions = ['2K', '4K', '8K', '16K']

// ─── State ───────────────────────────────────────────────────────────────────
const open = ref(false)
const variantOpen = ref(false)
const resolutionOpen = ref(false)
const modelOpen = ref(false)
const mobileMenuOpen = ref(false)
const activeMenu = ref(null)

const aspectRatioRef = ref(null)
const variantDropdownRef = ref(null)
const resolutionDropdownRef = ref(null)
const modelDropdownRef = ref(null)
const mobileMenuRef = ref(null)

const selected = ref('16:9')
const variantSelected = ref('1')
const resolutionSelected = ref('2K')
const modelSelected = ref('Auto')

const currentModelIcon = computed(() => {
  return MODEL_OPTIONS.find((m) => m.label === modelSelected.value)?.icon ?? null
})

const handleClickOutside = (event) => {
  if (!document.contains(event.target)) return
  if (aspectRatioRef.value && !aspectRatioRef.value.contains(event.target)) open.value = false
  if (variantDropdownRef.value && !variantDropdownRef.value.contains(event.target))
    variantOpen.value = false
  if (resolutionDropdownRef.value && !resolutionDropdownRef.value.contains(event.target))
    resolutionOpen.value = false
  if (modelDropdownRef.value && !modelDropdownRef.value.contains(event.target))
    modelOpen.value = false
  if (mobileMenuRef.value && !mobileMenuRef.value.contains(event.target)) {
    mobileMenuOpen.value = false
    activeMenu.value = null
  }
}

onMounted(() => document.addEventListener('click', handleClickOutside))
onUnmounted(() => document.removeEventListener('click', handleClickOutside))

const closeMobileMenu = () => {
  mobileMenuOpen.value = false
  activeMenu.value = null
}
const selectAspectRatio = (val) => {
  selected.value = val
  closeMobileMenu()
}
const selectVariant = (val) => {
  variantSelected.value = val
  closeMobileMenu()
}
const selectResolution = (val) => {
  resolutionSelected.value = val
  closeMobileMenu()
}
const selectAspectRatioDesktop = (val) => {
  selected.value = val
  open.value = false
}
const selectVariantDesktop = (val) => {
  variantSelected.value = val
  variantOpen.value = false
}
const selectResolutionDesktop = (val) => {
  resolutionSelected.value = val
  resolutionOpen.value = false
}
const selectModelDesktop = (val) => {
  modelSelected.value = val
  modelOpen.value = false
}
</script>
