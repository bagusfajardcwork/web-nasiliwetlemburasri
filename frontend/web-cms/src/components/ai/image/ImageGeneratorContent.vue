<template>
  <div
    class="custom-scrollbar relative z-20 max-h-[50vh] flex-1 mx-auto space-y-7 w-full overflow-y-auto pb-16"
  >
    <!-- User Message -->
    <div class="flex justify-end">
      <div :class="editing ? 'w-full' : 'max-w-[480px]'">
        <!-- View mode -->
        <div v-if="!editing" class="ml-auto w-full max-w-[480px]">
          <div
            class="shadow-theme-xs bg-gray-100 dark:bg-gray-800 rounded-xl rounded-tr-xs px-4 py-3"
          >
            <p class="text-left text-base leading-6 font-normal text-gray-800 dark:text-white/90">
              {{ userText }}
            </p>
          </div>
          <div class="mt-2 flex justify-end">
            <UiTooltip content="Edit" placement="top" variant="dark">
              <button @click="handleEdit" :class="BTN_CLASS">
                <EditIcon class="size-4" />
              </button>
            </UiTooltip>
            <UiTooltip :content="copiedUser ? 'Copied!' : 'Copy'" placement="top" variant="dark">
              <button @click="handleCopyUser" :class="BTN_CLASS">
                <CopySmIcon v-if="copiedUser" class="size-4" />
                <CheckSmIcon v-else class="size-4" />
              </button>
            </UiTooltip>
          </div>
        </div>

        <!-- Edit mode -->
        <div
          v-else
          class="w-full rounded-2xl border border-gray-200 bg-white p-3 dark:border-white/10 dark:bg-gray-900"
        >
          <textarea
            rows="3"
            v-model="draft"
            @keydown.esc="handleCancel"
            class="w-full resize-none border-0 bg-transparent p-0 text-base leading-6 text-gray-800 [scrollbar-width:none] outline-none placeholder:text-gray-400 focus:ring-0 dark:text-white/90 [&::-webkit-scrollbar]:hidden"
          ></textarea>
          <div class="mt-2 flex items-center justify-end gap-2">
            <button
              @click="handleCancel"
              class="inline-flex h-9 items-center justify-center rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
            >
              Cancel
            </button>
            <button
              @click="handleSend"
              class="inline-flex h-9 items-center justify-center rounded-lg bg-gray-900 px-5 py-2 text-sm font-medium text-white transition hover:bg-black dark:bg-white dark:text-gray-900"
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- AI Response -->
    <div class="flex justify-start">
      <div>
        <div class="max-w-[480px]">
          <p class="mb-2 flex items-center gap-1.5 text-sm text-gray-500 dark:text-gray-400">
            <img src="/images/model/nanobanana.svg" alt="model" />
            Nano Banana 2.0
          </p>
          <p class="mb-2 text-base leading-6 text-gray-800 dark:text-white/90">
            I have generated Minimalist building facade with vertical panels and greenery in a
            planter, set against a clear blue sky for a modern aesthetic.
          </p>
          <div class="group relative w-full max-w-[300px] overflow-hidden rounded-xl">
            <img
              src="/images/ai/img-1.png"
              class="w-full rounded-xl border border-gray-100 object-cover dark:border-gray-700"
              alt=""
            />
            <!-- Hover Action Bar -->
            <div
              class="absolute right-0 bottom-0 left-0 flex translate-y-full items-center justify-between px-3 py-3 opacity-0 transition-all duration-300 ease-in-out group-hover:translate-y-0 group-hover:opacity-100"
            >
              <div class="flex items-center gap-2">
                <!-- Edit Button -->
                <UiTooltip content="Edit" placement="top" variant="dark">
                  <button
                    class="inline-flex size-9 items-center justify-center rounded-full bg-white/90 text-gray-700 shadow backdrop-blur-sm transition hover:bg-white"
                  >
                    <EditIcon class="size-4" />
                  </button>
                </UiTooltip>
                <!-- Regenerate Button -->
                <UiTooltip content="Regenerate" placement="top" variant="dark">
                  <button
                    class="inline-flex size-9 items-center justify-center rounded-full bg-white/90 text-gray-700 shadow backdrop-blur-sm transition hover:bg-white"
                  >
                    <RegenerateIcon class="size-4" />
                  </button>
                </UiTooltip>
                <!-- Copy Button -->
                <UiTooltip
                  :content="copiedImage ? 'Copied!' : 'Copy'"
                  placement="top"
                  variant="dark"
                >
                  <button
                    @click="handleCopyImage"
                    class="inline-flex size-9 items-center justify-center rounded-full bg-white/90 text-gray-700 shadow backdrop-blur-sm transition hover:bg-white"
                  >
                    <CopySmIcon v-if="copiedImage" class="size-4" />
                    <CheckSmIcon v-else class="size-4" />
                  </button>
                </UiTooltip>
              </div>
              <!-- Download Button -->
              <UiTooltip content="Download" placement="top" variant="dark">
                <button
                  class="inline-flex size-9 items-center justify-center rounded-full bg-white/90 text-gray-700 shadow backdrop-blur-sm transition hover:bg-white"
                >
                  <DownloadIcon class="size-4" />
                </button>
              </UiTooltip>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import UiTooltip from '@/components/ui/Tooltip.vue'
import { CheckSmIcon, CopySmIcon, DownloadIcon, EditIcon, RegenerateIcon } from '@/icons'

const BTN_CLASS =
  'group flex size-8 items-center justify-center rounded-lg p-2 text-sm font-medium text-gray-800 hover:bg-gray-100 hover:text-gray-900 dark:border-white/5 dark:bg-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-white/90'

const defaultUserMessage =
  'Minimalist building facade with vertical panels and greenery in a planter, set against a clear blue sky for a modern aesthetic.'

const userText = ref(defaultUserMessage)
const editing = ref(false)
const draft = ref('')
const copiedUser = ref(false)
const copiedImage = ref(false)

const handleEdit = () => {
  draft.value = userText.value
  editing.value = true
}

const handleSend = () => {
  userText.value = draft.value.trim() || userText.value
  editing.value = false
}

const handleCancel = () => {
  editing.value = false
}

const handleCopyUser = async () => {
  try {
    await navigator.clipboard.writeText(userText.value)
    copiedUser.value = true
    setTimeout(() => {
      copiedUser.value = false
    }, 2000)
  } catch (err) {
    console.error('Failed to copy text: ', err)
  }
}

const handleCopyImage = async () => {
  try {
    await navigator.clipboard.writeText('/images/ai/img-1.png')
    copiedImage.value = true
    setTimeout(() => {
      copiedImage.value = false
    }, 2000)
  } catch (err) {
    console.error('Failed to copy: ', err)
  }
}
</script>
