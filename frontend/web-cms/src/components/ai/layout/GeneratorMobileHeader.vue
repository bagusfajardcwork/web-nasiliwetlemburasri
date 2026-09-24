<template>
  <!-- Mobile Chat Header -->
  <div
    class="my-6 flex items-center justify-between rounded-2xl border border-gray-200 bg-white p-3 xl:hidden dark:border-gray-800 dark:bg-gray-900"
  >
    <h4 class="pl-2 text-lg font-medium text-gray-800 dark:text-white/90">Chats History</h4>
    <button
      @click="emit('toggle-sidebar')"
      class="inline-flex h-11 w-11 items-center justify-center rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-800"
    >
      <Menu class="size-5" />
    </button>
  </div>
</template>

<script setup>
import { Menu } from '@/icons'
const emit = defineEmits(['toggle-sidebar'])
</script>
