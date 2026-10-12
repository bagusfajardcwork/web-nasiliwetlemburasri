<template>
  <div class="row">
    <div class="col-xxl-6">
      <RestaurantStatsToday />

      <div class="row">
        <div class="col-sm-6">
          <TotalOrdersChart />
        </div>
        <div class="col-sm-6">
          <PendingOrdersChart />
        </div>
      </div>
    </div>
    <div class="col-xxl-6">
      <div class="row">
        <div class="col-sm-6">
          <Revenue />
        </div>
        <div class="col-sm-6">
          <Expense />
        </div>
      </div>

      <TopSellingItems />
    </div>
    <div class="col-lg-12">
      <RecentOrdersList />
    </div>
    <div class="col-xxl-3">
      <OrderSummaryChart />
    </div>
    <div class="col-xxl-6 col-lg-6">
      <RevenueExpenseChart />
    </div>
    <div class="col-xxl-3 col-lg-6">
      <LowStockAlerts />
    </div>
    <div class="col-lg-4 col-md-6 col-xl-6 col-xxl-4">
      <StaffPerformanceScores />
    </div>
    <div class="col-lg-4 col-md-6 col-xl-6 col-xxl-4">
      <RevenueByBranches />
    </div>
    <div class="col-lg-4 col-xl-12 col-xxl-4">
      <Tickets />
    </div>
    <div class="col-lg-12">
      <CustomerRatings />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import RestaurantStatsToday from "@/components/Dashboard/Restaurant/RestaurantStatsToday.vue";
import TotalOrdersChart from "@/components/Dashboard/Restaurant/TotalOrdersChart.vue";
import PendingOrdersChart from "@/components/Dashboard/Restaurant/PendingOrdersChart.vue";
import Revenue from "@/components/Dashboard/Restaurant/Revenue.vue";
import Expense from "@/components/Dashboard/Restaurant/Expense.vue";
import TopSellingItems from "@/components/Dashboard/Restaurant/TopSellingItems.vue";
import RecentOrdersList from "@/components/Dashboard/Restaurant/RecentOrdersList.vue";
import OrderSummaryChart from "@/components/Dashboard/Restaurant/OrderSummaryChart.vue";
import RevenueExpenseChart from "@/components/Dashboard/Restaurant/RevenueExpenseChart.vue";
import LowStockAlerts from "@/components/Dashboard/Restaurant/LowStockAlerts.vue";
import StaffPerformanceScores from "@/components/Dashboard/Restaurant/StaffPerformanceScores.vue";
import RevenueByBranches from "@/components/Dashboard/Restaurant/RevenueByBranches.vue";
import Tickets from "@/components/Dashboard/Restaurant/Tickets.vue";
import CustomerRatings from "@/components/Dashboard/Restaurant/CustomerRatings.vue";

export default defineComponent({
  name: "RestaurantPage",
  components: {
    RestaurantStatsToday,
    TotalOrdersChart,
    PendingOrdersChart,
    Revenue,
    Expense,
    TopSellingItems,
    RecentOrdersList,
    OrderSummaryChart,
    RevenueExpenseChart,
    LowStockAlerts,
    StaffPerformanceScores,
    RevenueByBranches,
    Tickets,
    CustomerRatings,
  },
});
</script>
