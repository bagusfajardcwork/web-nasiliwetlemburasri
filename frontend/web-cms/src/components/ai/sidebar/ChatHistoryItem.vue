<template>
  <li class="group relative rounded-full px-3 py-1.5 hover:bg-gray-50 dark:hover:bg-gray-950">
    <div class="flex items-center justify-between">
      <button class="text-left text-gray-800 truncate dark:text-white/90">
        {{ chat.title }}
      </button>
      <button
        @click.stop="emit('toggle-dropdown', chat.id)"
        class="dropdown-button invisible ml-2 rounded-full p-1 text-gray-700 group-hover:visible hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-400"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="18"
          viewBox="0 0 18 18"
          fill="none"
        >
          <path
            d="M4.5 9.00384L4.5 8.99634M13.5 9.00384V8.99634M9 9.00384V8.99634"
            stroke="currentColor"
            stroke-width="3"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </button>
    </div>

    <!-- Dropdown Menu -->
    <ul
      v-show="openDropdown === chat.id"
      class="dropdown-menu absolute right-0 top-full mt-1 z-30 w-45 space-y-0.5 rounded-xl bg-white p-1.5 shadow-md dark:bg-gray-800"
    >
      <li>
        <button
          @click="emit('toggle-star', chat)"
          class="flex w-full items-center gap-2 rounded-lg bg-transparent px-1.5 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-800 dark:text-gray-400 dark:hover:bg-gray-900 dark:hover:text-white/90"
        >
          <StarFill v-if="chat.starred" class="size-5" />
          <StarLine v-else class="size-5" />
          {{ chat.starred ? 'Remove Starred' : 'Add Starred' }}
        </button>
      </li>
      <li>
        <button
          @click="emit('rename', chat)"
          class="flex w-full items-center gap-2 rounded-lg bg-transparent px-1.5 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-800 dark:text-gray-400 dark:hover:bg-gray-900 dark:hover:text-white/90"
        >
          <EditIcon class="size-5" />
          Rename
        </button>
      </li>
      <hr class="my-1 border-gray-200 dark:border-white/10" />
      <li>
        <button
          @click="emit('delete', chat.id)"
          class="flex w-full items-center gap-2 rounded-lg bg-transparent px-1.5 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-800 dark:text-gray-400 dark:hover:bg-gray-900 dark:hover:text-white/90"
        >
          <TrashIconLg class="size-5" />
          Delete
        </button>
      </li>
    </ul>
  </li>
</template>

<script setup>
import { StarFill, StarLine, EditIcon, TrashIconLg } from '@/icons'

defineProps({
  chat: {
    type: Object,
    required: true,
  },
  openDropdown: {
    type: [Number, String, null],
    default: null,
  },
})

const emit = defineEmits(['toggle-dropdown', 'toggle-star', 'rename', 'delete'])
</script>
