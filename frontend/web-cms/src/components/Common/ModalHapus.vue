<script setup lang="ts">

const props = withDefaults(
    defineProps<{
      show: boolean;
      title?: string;
      message?: string;
      itemName?: string;
      loading?: boolean;
    }>(),
    {
      title: "Konfirmasi Hapus",
      message: "Apakah Anda yakin ingin menghapus data ini?",
      itemName: "",
      loading: false,
    },
);

const emit = defineEmits<{
  "update:show": [value: boolean];
  confirm: [];
}>();

function closeModal() {
  if (props.loading) return;

  emit("update:show", false);
}
</script>

<template>
  <BModal
      :model-value="show"
      :title="title"
      centered
      no-close-on-backdrop
      no-close-on-esc
      @update:model-value="(value) => {
    if (!loading) emit('update:show', value);
  }"
  >
    <p class="mb-2 fs-16 text-dark">{{ message }}</p>

    <p v-if="itemName" class="fw-semibold text-dark-emphasis mb-0">
      {{ itemName }}
    </p>

    <template #footer>
      <BButton
          variant="dark"
          :disabled="loading"
          @click="closeModal"
      >
        Batal
      </BButton>

      <BButton
          variant="danger"
          :disabled="loading"
          @click="emit('confirm')"
      >
        <span
            v-if="loading"
            class="spinner-border spinner-border-sm me-2"
            role="status"
        />
        <i :class="[loading ? 'ri-loader-2-line' : 'ri-delete-bin-line', 'me-1']" />
        {{ loading ? "Menghapus..." : "Ya, Hapus" }}
      </BButton>
    </template>
  </BModal>
</template>