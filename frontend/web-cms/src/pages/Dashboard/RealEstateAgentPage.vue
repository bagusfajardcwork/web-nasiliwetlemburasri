<template>
  <div class="main-content-container overflow-hidden">
    <WelcomeRealEstateAgent />

    <Stats />
    <div class="row g-4 mb-4">
      <div class="col-lg-8">
        <TotalRevenueChart />
      </div>
      <div class="col-lg-4">
        <TopChannels />
      </div>
    </div>
    <div class="row g-4 mb-4">
      <div class="col-lg-4">
        <RecentClients />
      </div>
      <div class="col-lg-8">
        <MyFeaturedListings />
      </div>
    </div>
    <div class="row g-4 mb-4">
      <div class="col-lg-8">
        <RevenueGoalProgress />
      </div>
      <div class="col-lg-4">
        <SalesByCountry />
      </div>
    </div>
    <div class="row g-4 mb-4">
      <div class="col-lg-3">
        <DownloadApp />
      </div>
      <div class="col-lg-9">
        <LatestTransactions />
      </div>
    </div>

    <ClientRatings />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import WelcomeRealEstateAgent from "../../components/Dashboard/RealEstateAgent/WelcomeRealEstateAgent.vue";
import Stats from "../../components/Dashboard/RealEstateAgent/Stats.vue";
import TotalRevenueChart from "../../components/Dashboard/RealEstateAgent/TotalRevenueChart.vue";
import TopChannels from "../../components/Dashboard/RealEstateAgent/TopChannels.vue";
import RecentClients from "../../components/Dashboard/RealEstateAgent/RecentClients.vue";
import MyFeaturedListings from "../../components/Dashboard/RealEstateAgent/MyFeaturedListings.vue";
import RevenueGoalProgress from "../../components/Dashboard/RealEstateAgent/RevenueGoalProgress.vue";
import SalesByCountry from "../../components/Dashboard/RealEstateAgent/SalesByCountry.vue";
import DownloadApp from "../../components/Dashboard/RealEstateAgent/DownloadApp.vue";
import LatestTransactions from "../../components/Dashboard/RealEstateAgent/LatestTransactions.vue";
import ClientRatings from "../../components/Dashboard/RealEstateAgent/ClientRatings.vue";

export default defineComponent({
  name: "RealEstateAgentPage",
  components: {
    WelcomeRealEstateAgent,
    Stats,
    TotalRevenueChart,
    TopChannels,
    RecentClients,
    MyFeaturedListings,
    RevenueGoalProgress,
    SalesByCountry,
    DownloadApp,
    LatestTransactions,
    ClientRatings,
  },
});
</script>
