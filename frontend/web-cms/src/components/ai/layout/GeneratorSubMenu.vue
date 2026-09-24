<template>
  <div>
    <div class="mb-2 flex gap-1 items-center">
      <button
        @click="$emit('back')"
        class="flex items-center gap-2 rounded-lg p-2 text-gray-800 hover:bg-gray-100 dark:text-white/90 dark:hover:bg-gray-800"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
        >
          <path
            d="M10.0833 3.83301L5.91669 7.99967L10.0833 12.1663"
            stroke="currentColor"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </button>
      <span class="text-base font-medium text-gray-800 dark:text-white"> {{ title }}</span>
    </div>
    <div class="space-y-0.5">
      <slot></slot>
    </div>
  </div>
</template>

<script setup>
defineProps({
  title: {
    type: String,
    required: true,
  },
})
defineEmits(['back'])
</script>
