<template>
  <div class="relative h-[calc(100vh-76px)] px-4 xl:flex xl:px-0">
    <GeneratorMobileHeader @toggle-sidebar="toggleSidebar" />

    <!-- Main Content Area -->
    <div class="flex-1 xl:pb-10">
      <GeneratorTopBar />
      <div>
        <div class="relative mx-auto flex max-w-180 flex-col">
          <!-- Content slot (messages, images, etc.) -->
          <slot />

          <!-- Fixed Input Wrapper -->
          <div
            :class="inputZClass"
            class="fixed bottom-5 lg:bottom-10 left-1/2 w-full -translate-x-1/2 transform px-4 sm:px-6 lg:px-8"
          >
            <div
              class="mx-auto w-full max-w-[720px] rounded-2xl border border-gray-200 bg-white p-3 shadow-xs dark:border-gray-700 dark:bg-white/5"
            >
              <textarea
                placeholder="Type your prompt here..."
                v-model="currentMessage"
                ref="textareaRef"
                class="h-20 w-full resize-none border-none bg-transparent p-2 font-normal text-gray-800 outline-none placeholder:text-gray-400 focus:ring-0 dark:text-white"
              ></textarea>

              <!-- Toolbar slot — unique per generator type -->
              <slot name="toolbar" :currentMessage="currentMessage" :handleSubmit="handleSubmit" />
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- AI History Sidebar -->
    <AiHistorySidebar />
  </div>
</template>

<script setup>
import { ref, provide } from 'vue'
import AiHistorySidebar from '../sidebar/AiHistorySidebar.vue'
import GeneratorTopBar from './GeneratorTopBar.vue'
import GeneratorMobileHeader from './GeneratorMobileHeader.vue'

const props = defineProps({
  onSubmit: {
    type: Function,
    default: null,
  },
  // Allow layouts to customise z-index of the input bar (text uses z-40, others use z-20)
  inputZClass: {
    type: String,
    default: 'z-20',
  },
})

const emit = defineEmits(['submit', 'input-change'])

// Sidebar state
const isSidebarOpen = ref(false)
const toggleSidebar = () => {
  isSidebarOpen.value = !isSidebarOpen.value
}
const closeSidebar = () => {
  isSidebarOpen.value = false
}

// Provide sidebar state to child components (e.g. AiHistorySidebar)
provide('aiSidebar', { isSidebarOpen, toggleSidebar, closeSidebar })

// Textarea state
const currentMessage = ref('')
const isLoading = ref(false)
const textareaRef = ref(null)

const handleSubmit = async () => {
  if (!currentMessage.value.trim() || isLoading.value) return
  const message = currentMessage.value.trim()
  currentMessage.value = ''
  if (textareaRef.value) textareaRef.value.style.height = 'auto'
  if (props.onSubmit) {
    await props.onSubmit(message)
  } else {
    emit('submit', message)
  }
}

defineExpose({ currentMessage, isLoading, handleSubmit, toggleSidebar, closeSidebar })
</script>
