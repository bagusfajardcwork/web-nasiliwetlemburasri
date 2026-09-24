<template>
  <div v-show="activeTab === 'model'" class="mx-auto py-6 xl:py-8.5 xl:max-w-162.5">
    <h2
      class="mb-6 border-b border-gray-200 pb-4 text-2xl font-semibold text-gray-900 dark:border-gray-800 dark:text-white/90"
    >
      Models
    </h2>
    <div class="space-y-6">
      <!-- ALL MODELS -->
      <div class="space-y-4">
        <h3 class="mb-2 text-xs font-medium text-gray-500 uppercase dark:text-gray-400">
          All Models
        </h3>
        <div
          class="rounded-2xl border border-gray-100 bg-white dark:border-gray-800 dark:bg-white/3"
        >
          <!-- Filters -->
          <div
            class="flex flex-col flex-wrap gap-3 border-b border-gray-100 px-4 py-3 sm:flex-row sm:items-center dark:border-gray-800"
          >
            <!-- Search -->
            <div class="flex-1">
              <div class="relative">
                <span
                  class="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-gray-500 dark:text-gray-400"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                  >
                    <path
                      d="M14.3822 14.3835L17.7073 17.7086M16.4583 9.37461C16.4583 13.2857 13.287 16.4562 9.375 16.4562C5.46299 16.4562 2.29167 13.2857 2.29167 9.37461C2.29167 5.46353 5.46299 2.29297 9.375 2.29297C13.287 2.29297 16.4583 5.46353 16.4583 9.37461Z"
                      stroke="currentColor"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                </span>
                <input
                  v-model="search"
                  type="text"
                  placeholder="Search Model ..."
                  class="dark:bg-dark-900 shadow-theme-xs focus:border-brand-300 focus:ring-brand-500/10 dark:focus:border-brand-800 h-9 w-full rounded-lg border border-gray-200 bg-transparent py-2.5 pr-3 pl-12 text-sm text-gray-800 placeholder:text-gray-400 focus:ring-3 focus:outline-hidden dark:border-gray-800 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30"
                />
              </div>
            </div>
            <div class="flex gap-3">
              <!-- Provider dropdown -->
              <div ref="providerDropdownRef" class="relative">
                <button
                  @click="providerOpen = !providerOpen"
                  class="flex h-9 items-center gap-1.5 rounded-lg border border-gray-200 bg-white py-2 pr-3 pl-3.5 text-sm text-gray-700 shadow-xs hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
                >
                  <span>{{ provider === 'Provider' ? 'All' : provider }}</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                  >
                    <path
                      d="M4.79163 8.02148L9.99996 13.2298L15.2083 8.02148"
                      stroke="currentColor"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                </button>
                <div
                  v-show="providerOpen"
                  class="absolute top-full left-0 z-50 mt-1 w-36 space-y-px rounded-xl bg-white p-1.5 shadow-lg dark:bg-gray-800"
                >
                  <button
                    v-for="p in providers"
                    :key="p"
                    @click="selectProvider(p)"
                    :class="
                      provider === p
                        ? 'bg-gray-100 dark:bg-white/10'
                        : 'hover:bg-gray-50 dark:hover:bg-white/5'
                    "
                    class="flex w-full items-center rounded-lg px-2 py-2 text-sm font-medium text-gray-700 dark:text-gray-300"
                  >
                    {{ p === 'Provider' ? 'All' : p }}
                  </button>
                </div>
              </div>
              <!-- Generation dropdown -->
              <div ref="generationDropdownRef" class="relative">
                <button
                  @click="generationOpen = !generationOpen"
                  class="flex h-9 items-center gap-1.5 rounded-lg border border-gray-200 bg-white py-2 pr-3 pl-3.5 text-sm text-gray-700 shadow-xs hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
                >
                  <span>{{ generation }}</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                  >
                    <path
                      d="M4.79163 8.02148L9.99996 13.2298L15.2083 8.02148"
                      stroke="currentColor"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                </button>
                <div
                  v-show="generationOpen"
                  class="absolute top-full left-0 z-50 mt-1 w-40 space-y-px rounded-xl bg-white p-1.5 shadow-lg dark:bg-gray-800"
                >
                  <button
                    v-for="g in generations"
                    :key="g"
                    @click="selectGeneration(g)"
                    :class="
                      generation === g
                        ? 'bg-gray-100 dark:bg-white/10'
                        : 'hover:bg-gray-50 dark:hover:bg-white/5'
                    "
                    class="flex w-full items-center rounded-lg px-2 py-2 text-sm font-medium text-gray-700 dark:text-gray-300"
                  >
                    {{ g }}
                  </button>
                </div>
              </div>
            </div>
          </div>

          <!-- Model list -->
          <div
            v-for="(model, index) in filteredModels"
            :key="index"
            :class="
              index < filteredModels.length - 1
                ? 'border-b border-gray-100 dark:border-gray-800'
                : ''
            "
            class="flex items-center justify-between px-5 py-3.5"
          >
            <div class="flex items-center gap-3">
              <template v-if="model.icon === 'gpt'">
                <img src="/images/model/model-sm/gpt.svg" alt="" class="size-5 dark:hidden" />
                <img
                  src="/images/model/model-sm/gpt-white.svg"
                  alt=""
                  class="hidden size-5 dark:block"
                />
              </template>
              <template v-else-if="model.icon === 'grok'">
                <img src="/images/model/model-sm/grok.svg" alt="" class="size-5 dark:hidden" />
                <img
                  src="/images/model/model-sm/grok-white.svg"
                  alt=""
                  class="hidden size-5 dark:block"
                />
              </template>
              <template v-else-if="model.icon === 'claude'">
                <img src="/images/model/model-sm/claude.svg" alt="" class="size-5" />
              </template>
              <template v-else-if="model.icon === 'google'">
                <img src="/images/model/model-sm/gemini.svg" alt="" class="size-5" />
              </template>
              <span class="text-sm font-medium text-gray-800 dark:text-white/90">{{
                model.name
              }}</span>
              <span
                v-if="model.badge"
                class="inline-flex items-center justify-center rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-600 dark:bg-green-500/15 dark:text-green-400"
                >{{ model.badge }}</span
              >
            </div>
            <!-- Toggle -->
            <label class="flex cursor-pointer items-center select-none">
              <div class="relative">
                <input type="checkbox" class="sr-only" v-model="model.enabled" />
                <div
                  class="block h-5 w-9 rounded-full transition"
                  :class="model.enabled ? 'bg-brand-500' : 'bg-gray-200 dark:bg-white/10'"
                ></div>
                <div
                  :class="model.enabled ? 'translate-x-full' : 'translate-x-0'"
                  class="shadow-theme-sm absolute top-0.5 left-0.5 h-4 w-4 rounded-full bg-white transition duration-200 ease-linear"
                ></div>
              </div>
            </label>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'

defineProps({
  activeTab: { type: String, required: true },
})

const providerOpen = ref(false)
const generationOpen = ref(false)
const provider = ref('Provider')
const generation = ref('All Generation')
const search = ref('')
const providerDropdownRef = ref(null)
const generationDropdownRef = ref(null)

const providers = ['Provider', 'OpenAI', 'Google', 'Anthropic', 'xAI']
const generations = ['All Generation', 'Text', 'Image', 'Video', 'Code']

const selectProvider = (p) => {
  provider.value = p
  providerOpen.value = false
}

const selectGeneration = (g) => {
  generation.value = g
  generationOpen.value = false
}

const models = ref([
  {
    name: 'ChatGPT 5.5',
    badge: 'New',
    provider: 'OpenAI',
    generation: 'Text',
    icon: 'gpt',
    enabled: false,
  },
  {
    name: 'ChatGPT 4.5',
    badge: '',
    provider: 'OpenAI',
    generation: 'Text',
    icon: 'gpt',
    enabled: true,
  },
  {
    name: 'Claude Sonnet 4.6',
    badge: 'New',
    provider: 'Anthropic',
    generation: 'Text',
    icon: 'claude',
    enabled: false,
  },
  {
    name: 'Claude Sonnet 4.5',
    badge: '',
    provider: 'Anthropic',
    generation: 'Text',
    icon: 'claude',
    enabled: false,
  },
  {
    name: 'Gemini 3.1 Pro',
    badge: '',
    provider: 'Google',
    generation: 'Text',
    icon: 'google',
    enabled: false,
  },
  {
    name: 'Gemini 3 Flash',
    badge: '',
    provider: 'Google',
    generation: 'Text',
    icon: 'google',
    enabled: false,
  },
  { name: 'Grok 3', badge: '', provider: 'xAI', generation: 'Text', icon: 'grok', enabled: false },
  {
    name: 'Grok 2.0',
    badge: '',
    provider: 'xAI',
    generation: 'Text',
    icon: 'grok',
    enabled: false,
  },
])

const filteredModels = computed(() => {
  return models.value.filter((m) => {
    const matchSearch =
      search.value === '' || m.name.toLowerCase().includes(search.value.toLowerCase())
    const matchProvider = provider.value === 'Provider' || m.provider === provider.value
    const matchGeneration =
      generation.value === 'All Generation' || m.generation === generation.value
    return matchSearch && matchProvider && matchGeneration
  })
})

const handleClickOutside = (event) => {
  if (providerDropdownRef.value && !providerDropdownRef.value.contains(event.target)) {
    providerOpen.value = false
  }
  if (generationDropdownRef.value && !generationDropdownRef.value.contains(event.target)) {
    generationOpen.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>
