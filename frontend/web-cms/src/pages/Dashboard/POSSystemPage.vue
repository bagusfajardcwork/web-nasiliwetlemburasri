<template>
  <div class="main-content-container overflow-hidden">
    <Stats />

    <div class="row">
      <div class="col-lg-8">
        <SalesAnalytics />
      </div>
      <div class="col-lg-4">
        <CustomerSegmentation />
      </div>
    </div>
    <div class="row">
      <div class="col-xxl-8">
        <CategoriesTab />
      </div>
      <div class="col-xxl-4">
        <OrderDetails />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onBeforeUnmount, onMounted } from "vue";
import Stats from "../../components/Dashboard/POSSystem/Stats.vue";
import SalesAnalytics from "../../components/Dashboard/POSSystem/SalesAnalytics/index.vue";
import CustomerSegmentation from "../../components/Dashboard/POSSystem/CustomerSegmentation.vue";
import CategoriesTab from "../../components/Dashboard/POSSystem/CategoriesTab.vue";
import OrderDetails from "../../components/Dashboard/POSSystem/OrderDetails.vue";

export default defineComponent({
  name: "POSSystemPage",
  components: {
    Stats,
    SalesAnalytics,
    CustomerSegmentation,
    CategoriesTab,
    OrderDetails,
  },
  setup() {
    onMounted(() => {
      document.body.classList.add("bg-white", "pos-system-page");
    });

    onBeforeUnmount(() => {
      document.body.classList.remove("bg-white", "pos-system-page");
    });
  },
});
</script>

<style lang="scss">
body {
  &.pos-system-page {
    .sidebar-area {
      background-color: #f6f7f9;
    }
    .header-area {
      padding: 12px 0 !important;
      &.sticky {
        padding-left: 25px !important;
        padding-right: 25px !important;
      }
    }
    .footer-area {
      border: var(--bs-border-width) var(--bs-border-style)
        var(--bs-border-color) !important;
    }
  }
}
</style>
