<template>
  <div class="row">
    <div class="col-xxl-6">
      <WelcomeBeautySalon />
    </div>
    <div class="col-xxl-6">
      <div class="row">
        <div class="col-sm-6">
          <CustomerSatisfactionRateChart />
        </div>
        <div class="col-sm-6">
          <NewCustomers />
        </div>
      </div>
    </div>
    <div class="col-lg-8">
      <TopSellingProducts />
    </div>
    <div class="col-lg-4">
      <CustomersFromChannels />
    </div>
    <div class="col-lg-4">
      <FeaturedServices />
    </div>
    <div class="col-lg-8">
      <RecentAppointments />
    </div>
    <div class="col-lg-8">
      <RevenueByServicesChart />
    </div>
    <div class="col-lg-4">
      <TopStylistPerformance />
    </div>
  </div>

  <TopCustomers />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import WelcomeBeautySalon from "@/components/Dashboard/BeautySalon/WelcomeBeautySalon.vue";
import CustomerSatisfactionRateChart from "@/components/Dashboard/BeautySalon/CustomerSatisfactionRateChart.vue";
import NewCustomers from "@/components/Dashboard/BeautySalon/NewCustomers.vue";
import TopSellingProducts from "@/components/Dashboard/BeautySalon/TopSellingProducts.vue";
import CustomersFromChannels from "@/components/Dashboard/BeautySalon/CustomersFromChannels.vue";
import FeaturedServices from "@/components/Dashboard/BeautySalon/FeaturedServices.vue";
import RecentAppointments from "@/components/Dashboard/BeautySalon/RecentAppointments.vue";
import RevenueByServicesChart from "@/components/Dashboard/BeautySalon/RevenueByServicesChart.vue";
import TopStylistPerformance from "@/components/Dashboard/BeautySalon/TopStylistPerformance.vue";
import TopCustomers from "@/components/Dashboard/BeautySalon/TopCustomers.vue";

export default defineComponent({
  name: "BeautySalonPage",
  components: {
    WelcomeBeautySalon,
    CustomerSatisfactionRateChart,
    NewCustomers,
    TopSellingProducts,
    CustomersFromChannels,
    FeaturedServices,
    RecentAppointments,
    RevenueByServicesChart,
    TopStylistPerformance,
    TopCustomers,
  },
});
</script>
