<template>
  <div class="main-content-container overflow-hidden">
    <div class="row g-4 mb-4">
      <div class="col-lg-8">
        <MyCards />
      </div>
      <div class="col-lg-4">
        <div class="row g-4">
          <div class="col-lg-12 col-sm-6">
            <TotalBalance />
          </div>
          <div class="col-lg-12 col-sm-6">
            <TotalExpense />
          </div>
        </div>
      </div>
    </div>
    <div class="row g-4 mb-4">
      <div class="col-lg-4">
        <CardsWithAmountChart />
      </div>
      <div class="col-lg-4 col-md-6">
        <DailyLimit />
      </div>
      <div class="col-lg-4 col-md-6">
        <QuickTransfer />
      </div>
    </div>
    <div class="row g-4 mb-4">
      <div class="col-xxl-9">
        <RecentTransactions />
      </div>
      <div class="col-xxl-3">
        <div class="row g-4">
          <div class="col-xxl-12 col-sm-6">
            <CreditUtilizationRatioChart />
          </div>
          <div class="col-xxl-12 col-sm-6">
            <MonthlySpendingChart />
          </div>
        </div>
      </div>
    </div>
    <div class="row g-4 mb-4">
      <div class="col-xxl-4 col-md-12 col-lg-6">
        <SpendingBreakdownChart />
      </div>
      <div class="col-xxl-4 col-md-6">
        <InterestChargeFeesChart />
      </div>
      <div class="col-xxl-4 col-md-6 col-lg-12">
        <StatisticsChart />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import MyCards from "../../components/Dashboard/CreditCard/MyCards.vue";
import TotalBalance from "../../components/Dashboard/CreditCard/TotalBalance.vue";
import TotalExpense from "../../components/Dashboard/CreditCard/TotalExpense.vue";
import CardsWithAmountChart from "../../components/Dashboard/CreditCard/CardsWithAmountChart.vue";
import DailyLimit from "../../components/Dashboard/CreditCard/DailyLimit.vue";
import QuickTransfer from "../../components/Dashboard/CreditCard/QuickTransfer.vue";
import RecentTransactions from "../../components/Dashboard/CreditCard/RecentTransactions.vue";
import CreditUtilizationRatioChart from "../../components/Dashboard/CreditCard/CreditUtilizationRatioChart.vue";
import MonthlySpendingChart from "../../components/Dashboard/CreditCard/MonthlySpendingChart.vue";
import SpendingBreakdownChart from "../../components/Dashboard/CreditCard/SpendingBreakdownChart.vue";
import InterestChargeFeesChart from "../../components/Dashboard/CreditCard/InterestChargeFeesChart.vue";
import StatisticsChart from "../../components/Dashboard/CreditCard/StatisticsChart.vue";

export default defineComponent({
  name: "CreditCardPage",
  components: {
    MyCards,
    TotalBalance,
    TotalExpense,
    CardsWithAmountChart,
    DailyLimit,
    QuickTransfer,
    RecentTransactions,
    CreditUtilizationRatioChart,
    MonthlySpendingChart,
    SpendingBreakdownChart,
    InterestChargeFeesChart,
    StatisticsChart,
  },
});
</script>
