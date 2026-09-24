<template>
  <UiModal v-if="isOpen" :fullScreenBackdrop="true" @close="onClose">
    <template #body>
      <div
        class="relative w-full max-w-[500px] mx-4 rounded-2xl bg-white p-6 dark:bg-gray-900 shadow-md"
      >
        <h4 class="mb-5 text-base font-semibold text-gray-800 dark:text-white/90">Rename Chat</h4>
        <input
          type="text"
          v-model="draft"
          @keydown.enter="handleSave"
          placeholder="Generate Responsive Login"
          autofocus
          class="dark:bg-dark-900 h-11 w-full rounded-lg border border-gray-200 bg-transparent py-2.5 px-3 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-800 dark:bg-white/3 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800"
        />
        <div class="mt-6 flex items-center justify-end gap-3">
          <button
            @click="onClose"
            class="rounded-lg border border-gray-300 bg-white px-5 py-2.5 text-sm font-semibold text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
          >
            Cancel
          </button>
          <button
            @click="handleSave"
            class="bg-brand-500 hover:bg-brand-600 rounded-lg px-5 py-2.5 text-sm font-semibold text-white"
          >
            Save
          </button>
        </div>
      </div>
    </template>
  </UiModal>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import UiModal from '@/components/ui/Modal.vue'

const props = defineProps<{
  isOpen: boolean
  currentTitle: string
}>()

const emit = defineEmits<{
  (e: 'close'): void
  (e: 'save', name: string): void
}>()

const draft = ref(props.currentTitle)

watch(
  () => props.isOpen,
  (newIsOpen) => {
    if (newIsOpen) {
      draft.value = props.currentTitle
    }
  },
  { immediate: true },
)

const onClose = () => {
  emit('close')
}

const handleSave = () => {
  if (draft.value.trim()) {
    emit('save', draft.value.trim())
  }
  onClose()
}
</script>
