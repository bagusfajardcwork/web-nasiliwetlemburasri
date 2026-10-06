<script setup lang="ts">
import { computed } from 'vue'
import { ChevronLeftIcon, ChevronRightIcon } from '@/icons'
import Button from '@/components/ui/Button.vue'

interface Props {
  currentPage: number
  totalPages: number
  total?: number
  loading?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  total: 0,
  loading: false,
})

const emit = defineEmits<{
  'update:currentPage': [page: number]
}>()

const displayedPages = computed(() => {
  const pages: (number | string)[] = []

  for (let i = 1; i <= props.totalPages; i++) {
    if (
      i === 1 ||
      i === props.totalPages ||
      (i >= props.currentPage - 1 && i <= props.currentPage + 1)
    ) {
      pages.push(i)
    } else if (pages[pages.length - 1] !== '...') {
      pages.push('...')
    }
  }

  return pages
})

const goToPage = (page: number) => {
  if (props.loading || page < 1 || page > props.totalPages || page === props.currentPage) {
    return
  }

  emit('update:currentPage', page)
}

const prevPage = () => {
  if (props.currentPage > 1) {
    goToPage(props.currentPage - 1)
  }
}

const nextPage = () => {
  if (props.currentPage < props.totalPages) {
    goToPage(props.currentPage + 1)
  }
}
</script>

<template>
  <div
    class="flex flex-col gap-4 border-t border-gray-200 px-5 py-4 sm:flex-row sm:items-center sm:justify-between dark:border-gray-800"
  >
    <!-- Total -->
    <div class="text-sm text-gray-500 dark:text-gray-400">
      Total:
      <span class="font-medium text-gray-700 dark:text-gray-300">
        {{ total }}
      </span>
      data
    </div>

    <!-- Pagination -->
    <div class="flex items-center gap-1">
      <!-- Previous -->
      <Button
        size="sm"
        variant="primary"
        :disabled="currentPage === 1 || loading"
        :startIcon="ChevronLeftIcon"
        @click="prevPage"
      />

      <!-- Pages -->
      <template v-for="(page, index) in displayedPages" :key="`${page}-${index}`">
        <!-- Number -->
        <button
          v-if="typeof page === 'number'"
          type="button"
          :disabled="loading"
          class="min-w-9 rounded-lg px-3 py-2 text-sm transition"
          :class="
            page === currentPage
              ? 'bg-brand-500 text-white'
              : 'text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-white/[0.05]'
          "
          @click="goToPage(page)"
        >
          {{ page }}
        </button>

        <!-- Dots -->
        <span v-else class="px-2 text-gray-400"> ... </span>
      </template>

      <!-- Next -->
      <Button
        size="sm"
        variant="primary"
        :disabled="currentPage === totalPages || loading"
        :startIcon="ChevronRightIcon"
        @click="nextPage"
      />
    </div>
  </div>
</template>
