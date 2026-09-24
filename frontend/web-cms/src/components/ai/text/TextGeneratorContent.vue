<template>
  <div
    ref="scrollContainer"
    class="custom-scrollbar relative z-20 max-h-[50vh] flex-1 mx-auto space-y-7 w-full overflow-y-auto pb-16"
  >
    <div
      v-for="msg in messages"
      :key="msg.id"
      :class="['flex', msg.isUser ? 'justify-end' : 'justify-start']"
    >
      <!-- User Message -->
      <div v-if="msg.isUser" :class="msg.editing ? 'w-full' : 'max-w-[480px]'">
        <!-- View mode -->
        <div v-if="!msg.editing" class="ml-auto w-full max-w-[480px]">
          <div
            class="shadow-theme-xs bg-gray-100 dark:bg-gray-800 rounded-xl rounded-tr-xs px-4 py-3"
          >
            <p
              v-for="(p, pIdx) in msg.text"
              :key="pIdx"
              :class="['text-left text-base leading-6 font-normal text-gray-800 dark:text-white/90', pIdx > 0 ? 'mt-2' : '']"
            >
              {{ p }}
            </p>
          </div>
          <div class="mt-2 flex justify-end">
            <UiTooltip content="Edit" placement="top" variant="dark">
              <button @click="handleEdit(msg)" :class="BTN_CLASS">
                <EditIcon class="size-4" />
              </button>
            </UiTooltip>
            <UiTooltip :content="copiedMap[msg.id] ? 'Copied!' : 'Copy'" placement="top" variant="dark">
              <button @click="handleCopy(msg)" :class="BTN_CLASS">
                <CopySmIcon v-if="copiedMap[msg.id]" class="size-4" />
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
            v-model="msg.draft"
            @keydown.esc="handleCancel(msg)"
            class="w-full resize-none border-0 bg-transparent p-0 text-base leading-6 text-gray-800 [scrollbar-width:none] outline-none placeholder:text-gray-400 focus:ring-0 dark:text-white/90 [&::-webkit-scrollbar]:hidden"
          ></textarea>
          <div class="mt-2 flex items-center justify-end gap-2">
            <button
              @click="handleCancel(msg)"
              class="inline-flex h-9 items-center justify-center rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
            >
              Cancel
            </button>
            <button
              @click="handleSend(msg)"
              class="inline-flex h-9 items-center justify-center rounded-lg bg-gray-900 px-5 py-2 text-sm font-medium text-white transition hover:bg-black dark:bg-white dark:text-gray-900"
            >
              Send
            </button>
          </div>
        </div>
      </div>

      <!-- AI Response -->
      <div v-else>
        <div class="max-w-[480px]">
          <p class="mb-2 flex items-center gap-1.5 text-sm text-gray-500 dark:text-gray-400">
            <img :src="msg.model?.icon || '/images/model/claude.svg'" alt="model" />
            {{ msg.model?.name || 'Claude Sonnet 4.6' }}
          </p>
          <p
            v-for="(p, pIdx) in msg.text"
            :key="pIdx"
            :class="['text-base leading-6 text-gray-800 dark:text-white/90', pIdx > 0 ? 'mt-2' : '']"
          >
            {{ p }}
          </p>
        </div>
        <div class="relative inline-flex mt-3">
          <UiTooltip :content="copiedMap[msg.id] ? 'Copied!' : 'Copy'" placement="top" variant="dark">
            <button @click="handleCopy(msg)" :class="BTN_CLASS">
              <CopySmIcon v-if="copiedMap[msg.id]" class="size-4" />
              <CheckSmIcon v-else class="size-4" />
            </button>
          </UiTooltip>
          <UiTooltip content="Like" placement="top" variant="dark">
            <button
              @click="handleLike(msg)"
              :class="[
                REACTION_BTN_CLASS,
                likesMap[msg.id] ? 'bg-brand-50/50 dark:bg-brand-500/10' : ''
              ]"
            >
              <LikeIcon
                :class="[
                  REACTION_ICON_CLASS,
                  likesMap[msg.id] ? 'text-brand-500' : 'text-gray-800 dark:text-gray-400',
                ]"
              />
            </button>
          </UiTooltip>
          <UiTooltip content="Dislike" placement="top" variant="dark">
            <button
              @click="handleDislike(msg)"
              :class="[
                REACTION_BTN_CLASS,
                dislikesMap[msg.id] ? 'bg-brand-50/50 dark:bg-brand-500/10' : ''
              ]"
            >
              <DislikeIcon
                :class="[
                  REACTION_ICON_CLASS,
                  dislikesMap[msg.id] ? 'text-brand-500' : 'text-gray-800 dark:text-gray-400',
                ]"
              />
            </button>
          </UiTooltip>
          <UiTooltip content="Regenerate" placement="top" variant="dark">
            <button :class="BTN_CLASS">
              <RegenerateIcon class="size-4" />
            </button>
          </UiTooltip>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, nextTick, onMounted } from 'vue'
import UiTooltip from '@/components/ui/Tooltip.vue'
import { CheckSmIcon, CopySmIcon, DislikeIcon, EditIcon, LikeIcon, RegenerateIcon } from '@/icons'

const BTN_CLASS =
  'group flex size-8 items-center justify-center rounded-lg p-2 text-sm font-medium text-gray-800 hover:bg-gray-100 hover:text-gray-900 dark:border-white/5 dark:bg-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-white/90'

const REACTION_BTN_CLASS =
  'group flex size-8 items-center justify-center rounded-lg p-2 text-sm font-medium hover:bg-gray-100 dark:border-white/5 dark:bg-gray-900 dark:hover:bg-gray-800'

const REACTION_ICON_CLASS = 'size-4 transition-colors duration-200 dark:group-hover:text-white/90'

const defaultUserMessage =
  "Can you generate some random, creative, and engaging placeholder text for me? It doesn't need to follow any specific structure—just something fun or interesting to fill space temporarily."

interface Message {
  id: number
  isUser: boolean
  model?: {
    name: string
    icon: string
  }
  text: string[]
  editing?: boolean
  draft?: string
}

const messages = ref<Message[]>([
  {
    id: 1,
    isUser: true,
    text: [defaultUserMessage]
  },
  {
    id: 2,
    isUser: false,
    model: {
      name: 'Claude Sonnet 4.6',
      icon: '/images/model/claude.svg'
    },
    text: [
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus et varius tortor. Aenean dui magna, vehicula in lacinia non, euismod sed odio. Aliquam erat volutpat.'
    ]
  },
  {
    id: 3,
    isUser: true,
    text: [
      "I'm looking for a block of random, imaginative text—something quirky or unexpected to use as placeholder content."
    ]
  },
  {
    id: 4,
    isUser: false,
    model: {
      name: 'Claude Sonnet 4.6',
      icon: '/images/model/claude.svg'
    },
    text: [
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus et varius tortor. Aenean dui magna, vehicula in lacinia non, euismod sed odio. Aliquam erat volutpat.',
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus et varius tortor. Aenean dui magna, vehicula in lacinia non, euismod sed odio. Aliquam erat volutpat.'
    ]
  }
])

const likesMap = ref<Record<number, boolean>>({})
const dislikesMap = ref<Record<number, boolean>>({})
const copiedMap = ref<Record<number, boolean>>({})

const scrollContainer = ref<HTMLDivElement | null>(null)

const scrollToBottom = () => {
  if (scrollContainer.value) {
    scrollContainer.value.scrollTop = scrollContainer.value.scrollHeight
  }
}

watch(
  messages,
  () => {
    nextTick(() => {
      scrollToBottom()
    })
  },
  { deep: true }
)

onMounted(() => {
  scrollToBottom()
})

const handleEdit = (msg: Message) => {
  msg.draft = msg.text.join('\n')
  msg.editing = true
}

const handleSend = (msg: Message) => {
  if (msg.draft && msg.draft.trim()) {
    msg.text = msg.draft.trim().split('\n')
  }
  msg.editing = false
}

const handleCancel = (msg: Message) => {
  msg.editing = false
}

const handleCopy = async (msg: Message) => {
  try {
    const textToCopy = msg.text.join('\n')
    await navigator.clipboard.writeText(textToCopy)
    copiedMap.value[msg.id] = true
    setTimeout(() => {
      copiedMap.value[msg.id] = false
    }, 2000)
  } catch (err) {
    console.error('Failed to copy text: ', err)
  }
}

const handleLike = (msg: Message) => {
  const isLiked = !likesMap.value[msg.id]
  likesMap.value[msg.id] = isLiked
  if (isLiked) {
    dislikesMap.value[msg.id] = false
  }
}

const handleDislike = (msg: Message) => {
  const isDisliked = !dislikesMap.value[msg.id]
  dislikesMap.value[msg.id] = isDisliked
  if (isDisliked) {
    likesMap.value[msg.id] = false
  }
}

defineExpose({
  messages,
})
</script>
