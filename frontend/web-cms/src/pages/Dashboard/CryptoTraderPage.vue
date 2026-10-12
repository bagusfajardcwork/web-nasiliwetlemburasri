<template>
  <div class="main-content-container overflow-hidden">
    <CryptoStatsPanel />

    <div class="row g-4 mb-4">
      <div class="col-xxl-8">
        <PriceMovementChart />
      </div>

      <div class="col-xxl-4">
        <div class="row g-4">
          <div class="col-xxl-12 col-md-6">
            <TradingVolumeChart />
          </div>

          <div class="col-xxl-12 col-md-6">
            <PortfolioDistributionChart />
          </div>
        </div>
      </div>
    </div>

    <div class="row g-4 mb-4">
      <div class="col-lg-8">
        <div class="row g-4 mb-4">
          <div class="col-md-6">
            <ProfitLossChart />
          </div>

          <div class="col-md-6">
            <RiskExposureChart />
          </div>
        </div>

        <RecentTransactions />
      </div>
      <div class="col-lg-4">
        <LivePriceTracker />

        <TradesPerMonthChart />
      </div>
    </div>

    <div class="row g-4 mb-4">
      <div class="col-xxl-4 col-md-6">
        <AssetAllocationChart />
      </div>
      <div class="col-xxl-4 col-md-6">
        <GainersLosers />
      </div>
      <div class="col-xxl-4">
        <MarketSentimentIndicatorChart />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import CryptoStatsPanel from "../../components/Dashboard/CryptoTrader/CryptoStatsPanel.vue";
import PriceMovementChart from "../../components/Dashboard/CryptoTrader/PriceMovementChart.vue";
import TradingVolumeChart from "../../components/Dashboard/CryptoTrader/TradingVolumeChart.vue";
import PortfolioDistributionChart from "../../components/Dashboard/CryptoTrader/PortfolioDistributionChart.vue";
import ProfitLossChart from "../../components/Dashboard/CryptoTrader/ProfitLossChart.vue";
import RiskExposureChart from "../../components/Dashboard/CryptoTrader/RiskExposureChart.vue";
import RecentTransactions from "../../components/Dashboard/CryptoTrader/RecentTransactions.vue";
import LivePriceTracker from "../../components/Dashboard/CryptoTrader/LivePriceTracker.vue";
import TradesPerMonthChart from "../../components/Dashboard/CryptoTrader/TradesPerMonthChart.vue";
import AssetAllocationChart from "../../components/Dashboard/CryptoTrader/AssetAllocationChart.vue";
import GainersLosers from "../../components/Dashboard/CryptoTrader/GainersLosers.vue";
import MarketSentimentIndicatorChart from "../../components/Dashboard/CryptoTrader/MarketSentimentIndicatorChart.vue";

export default defineComponent({
  name: "CryptoTraderPage",
  components: {
    CryptoStatsPanel,
    PriceMovementChart,
    TradingVolumeChart,
    PortfolioDistributionChart,
    ProfitLossChart,
    RiskExposureChart,
    RecentTransactions,
    LivePriceTracker,
    TradesPerMonthChart,
    AssetAllocationChart,
    GainersLosers,
    MarketSentimentIndicatorChart,
  },
});
</script>
