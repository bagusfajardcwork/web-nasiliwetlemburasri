<template>
  <div class="main-content-container overflow-hidden">
    <div class="row g-4">
      <div class="col-lg-8">
        <Stats />

        <div class="row g-4 mb-4">
          <div class="col-lg-6">
            <RoomsAvailabilityChart />
          </div>
          <div class="col-lg-6">
            <GuestActivityChart />
          </div>
        </div>

        <UpcomingVIPReservations />
      </div>
      <div class="col-lg-4">
        <RecentBookings />
      </div>
    </div>

    <PopularRooms />

    <CustomerReviews />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Stats from "../../components/Dashboard/Hotel/Stats/index.vue";
import RoomsAvailabilityChart from "../../components/Dashboard/Hotel/RoomsAvailabilityChart.vue";
import GuestActivityChart from "../../components/Dashboard/Hotel/GuestActivityChart.vue";
import UpcomingVIPReservations from "../../components/Dashboard/Hotel/UpcomingVIPReservations.vue";
import RecentBookings from "../../components/Dashboard/Hotel/RecentBookings.vue";
import PopularRooms from "../../components/Dashboard/Hotel/PopularRooms.vue";
import CustomerReviews from "../../components/Dashboard/Hotel/CustomerReviews.vue";

export default defineComponent({
  name: "HotelPage",
  components: {
    Stats,
    RoomsAvailabilityChart,
    GuestActivityChart,
    UpcomingVIPReservations,
    RecentBookings,
    PopularRooms,
    CustomerReviews,
  },
});
</script>
