<template>
  <div class="row">
    <div class="col-xxl-9">
      <SAWelcome />

      <Stats />
    </div>
    <div class="col-xxl-3">
      <CustomerVisits />
    </div>
    <div class="col-lg-4">
      <TopSellingProducts />
    </div>
    <div class="col-lg-8">
      <GrossRevenue />
    </div>
    <div class="col-xxl-9">
      <RecentSales />
    </div>
    <div class="col-xxl-3">
      <div class="row">
        <div class="col-sm-6 col-xxl-12">
          <SalesByGenderChart />
        </div>
        <div class="col-sm-6 col-xxl-12">
          <SalesThisMonthChart />
        </div>
      </div>
    </div>
    <div class="col-lg-4">
      <SalesByCategoryChart />
    </div>
    <div class="col-lg-8">
      <StockAlerts />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import SAWelcome from "@/components/Dashboard/StoreAnalysis/SAWelcome.vue";
import Stats from "@/components/Dashboard/StoreAnalysis/Stats.vue";
import CustomerVisits from "@/components/Dashboard/StoreAnalysis/CustomerVisits.vue";
import TopSellingProducts from "@/components/Dashboard/StoreAnalysis/TopSellingProducts.vue";
import GrossRevenue from "@/components/Dashboard/StoreAnalysis/GrossRevenue.vue";
import RecentSales from "@/components/Dashboard/StoreAnalysis/RecentSales.vue";
import SalesByGenderChart from "@/components/Dashboard/StoreAnalysis/SalesByGenderChart.vue";
import SalesThisMonthChart from "@/components/Dashboard/StoreAnalysis/SalesThisMonthChart.vue";
import SalesByCategoryChart from "@/components/Dashboard/StoreAnalysis/SalesByCategoryChart.vue";
import StockAlerts from "@/components/Dashboard/StoreAnalysis/StockAlerts.vue";

export default defineComponent({
  name: "StoreAnalysisPage",
  components: {
    SAWelcome,
    Stats,
    CustomerVisits,
    TopSellingProducts,
    GrossRevenue,
    RecentSales,
    SalesByGenderChart,
    SalesThisMonthChart,
    SalesByCategoryChart,
    StockAlerts,
  },
});
</script>
