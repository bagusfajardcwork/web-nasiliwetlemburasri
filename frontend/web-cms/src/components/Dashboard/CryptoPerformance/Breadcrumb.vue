<template>
  <div
    class="card border-0 rounded-3 bg-white p-25 bg-img debit-card-bg-for-dark-mode mb-4"
    :style="cardBackgroundStyle"
  >
    <div
      class="d-flex justify-content-between align-items-center flex-wrap gap-2 crypto-performance"
    >
      <h5 class="mb-0 text-white">Crypto Performance</h5>

      <nav style="--bs-breadcrumb-divider: '>'" aria-label="breadcrumb">
        <ol class="breadcrumb align-items-center mb-0 lh-1">
          <li class="breadcrumb-item">
            <a href="#" class="d-flex align-items-center text-decoration-none">
              <i
                class="ri-home-4-line fs-18 text-white me-1 position-relative"
                style="top: -1px"
              ></i>
              <span class="text-secondary hover text-white fs-13">
                Dashboard
              </span>
            </a>
          </li>
          <li class="breadcrumb-item active" aria-current="page">
            <span class="text-white fs-13">Crypto Performance</span>
          </li>
        </ol>
      </nav>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Breadcrumb",
  computed: {
    cardBackgroundStyle() {
      return {
        backgroundImage: `url(${require("@/assets/images/sparkline-bg.jpg")})`,
      };
    },
  },
});
</script>
