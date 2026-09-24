<template>
  <!-- Top bar -->
  <div class="mb-4 flex items-center justify-between xl:p-4">
    <!-- Title dropdown -->
    <div class="relative" ref="dropdownRef">
      <button
        @click="dropdownOpen = !dropdownOpen"
        class="flex items-center gap-3 rounded-lg bg-transparent px-2 py-1 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800"
      >
        {{ title }}
        <ChevronDownIcon
          :class="['size-4 transition-transform duration-150', { 'rotate-180': dropdownOpen }]"
        />
      </button>

      <ul
        v-if="dropdownOpen"
        class="absolute top-full left-0 z-30 mt-1 w-45 space-y-0.5 rounded-xl bg-white p-1.5 shadow-md dark:bg-gray-800"
      >
        <!-- Star / Unstar -->
        <li>
          <button
            @click="handleToggleStar"
            class="flex w-full items-center gap-2 rounded-lg bg-transparent px-1.5 py-2 text-gray-700 hover:bg-gray-100 hover:text-gray-800 dark:text-gray-400 dark:hover:bg-gray-900 dark:hover:text-white/90"
          >
            <StarFill v-if="starred" class="size-5" />
            <StarLine v-else class="size-5" />
            {{ starred ? 'Remove Starred' : 'Add Starred' }}
          </button>
        </li>

        <!-- Rename -->
        <li>
          <button
            @click="handleOpenRename"
            class="flex w-full items-center gap-2 rounded-lg bg-transparent px-1.5 py-2 text-gray-700 hover:bg-gray-100 hover:text-gray-800 dark:text-gray-400 dark:hover:bg-gray-900 dark:hover:text-white/90"
          >
            <EditIcon class="size-5" />
            Rename
          </button>
        </li>

        <hr class="my-1 border-gray-200 dark:border-white/10" />

        <!-- Delete -->
        <li>
          <button
            @click="dropdownOpen = false"
            class="flex w-full items-center gap-2 rounded-lg bg-transparent px-1.5 py-2 text-gray-700 hover:bg-gray-100 hover:text-gray-800 dark:text-gray-400 dark:hover:bg-gray-900 dark:hover:text-white/90"
          >
            <TrashIconLg class="size-5" />
            Delete
          </button>
        </li>
      </ul>
    </div>

    <!-- Share button -->
    <button
      @click="shareModalOpen = true"
      class="flex items-center gap-1.5 rounded-[10px] border border-gray-200 bg-white px-3 py-2 text-sm text-gray-700 transition-all hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-900"
    >
      <Share class="size-5" />
      Share
    </button>
  </div>

  <RenameModal
    :isOpen="renameModalOpen"
    @close="renameModalOpen = false"
    :currentTitle="title"
    @save="handleSaveRename"
  />

  <ShareModal :isOpen="shareModalOpen" @close="shareModalOpen = false" />
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import RenameModal from '../modals/RenameModal.vue'
import ShareModal from '../modals/ShareModal.vue'
import { ChevronDownIcon, EditIcon, Share, StarFill, StarLine, TrashIconLg } from '@/icons'

const dropdownOpen = ref(false)
const starred = ref(false)
const dropdownRef = ref<HTMLDivElement | null>(null)

const handleClickOutside = (event: MouseEvent) => {
  if (dropdownRef.value && !dropdownRef.value.contains(event.target as Node)) {
    dropdownOpen.value = false
  }
}

onMounted(() => document.addEventListener('click', handleClickOutside))
onUnmounted(() => document.removeEventListener('click', handleClickOutside))

const renameModalOpen = ref(false)
const shareModalOpen = ref(false)
const title = ref('Generate responsive login')

const handleToggleStar = () => {
  starred.value = !starred.value
  dropdownOpen.value = false
}

const handleOpenRename = () => {
  dropdownOpen.value = false
  renameModalOpen.value = true
}

const handleSaveRename = (name: string) => {
  title.value = name
  renameModalOpen.value = false
}
</script>
