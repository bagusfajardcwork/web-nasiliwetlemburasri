<script setup lang="ts">

withDefaults(
    defineProps<{
      page: number;
      perPage: number;
      total: number;
      limit?: number;
      size?: "sm" | "md" | "lg";
    }>(),
    {
      limit: 5,
      size: "sm",
    },
);

const emit = defineEmits<{
  "update:page": [page: number];
}>();
</script>

<template>
  <div
      v-if="total > 0"
      class="d-flex flex-wrap justify-content-between align-items-center gap-3"
  >
    <div class="text-secondary small">
      Menampilkan
      {{ (page - 1) * perPage + 1 }}
      sampai
      {{ Math.min(page * perPage, total) }}
      dari {{ total }} data
    </div>

    <BPagination
        :model-value="page"
        :total-rows="total"
        :per-page="perPage"
        :limit="limit"
        :size="size"
        first-number
        last-number
        @update:model-value="emit('update:page', $event)"
    />
  </div>
</template>