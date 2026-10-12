<template>
  <div class="d-flex align-items-center justify-content-center min-vh-100">
    <div class="text-center">
      <h1 class="display-1 fw-bold text-primary">
        403
      </h1>

      <h3 class="mb-3">
        Access Forbidden
      </h3>

      <p class="text-secondary mb-4">
        Anda tidak memiliki izin untuk mengakses halaman ini.
      </p>

      <RouterLink
          to="/dashboard"
          class="btn btn-primary"
      >
        Kembali ke Dashboard
      </RouterLink>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "ForbiddenPage",
});
</script>