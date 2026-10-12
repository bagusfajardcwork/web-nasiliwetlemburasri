<template>
  <div class="main-content-container overflow-hidden" id="audio_control2">
    <div class="row">
      <div class="col-xxl-8">
        <Featured />
      </div>

      <div class="col-xxl-4">
        <PopularHosts />
      </div>
    </div>
    <div class="row">
      <div class="col-lg-8">
        <RecentlyPlayed />
      </div>
      <div class="col-lg-4">
        <Player />
      </div>
    </div>
    <div class="row">
      <div class="col-xxl-8">
        <MostPopular />
      </div>
      <div class="col-xxl-4">
        <UpcomingEpisodes />

        <TodayEarningsChart />
      </div>
    </div>
    <div class="row">
      <div class="col-xl-5 col-xxl-6 col-lg-5">
        <ListenerAnalyticsChart />
      </div>
      <div class="col-xl-7 col-xxl-6 col-lg-7">
        <TopPodcasts />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onBeforeUnmount, onMounted } from "vue";
import Featured from "../../components/Dashboard/Podcast/Featured.vue";
import PopularHosts from "../../components/Dashboard/Podcast/PopularHosts.vue";
import RecentlyPlayed from "../../components/Dashboard/Podcast/RecentlyPlayed.vue";
import Player from "../../components/Dashboard/Podcast/Player.vue";
import MostPopular from "../../components/Dashboard/Podcast/MostPopular.vue";
import UpcomingEpisodes from "../../components/Dashboard/Podcast/UpcomingEpisodes.vue";
import TodayEarningsChart from "../../components/Dashboard/Podcast/TodayEarningsChart.vue";
import ListenerAnalyticsChart from "../../components/Dashboard/Podcast/ListenerAnalyticsChart.vue";
import TopPodcasts from "../../components/Dashboard/Podcast/TopPodcasts.vue";

export default defineComponent({
  name: "PodcastPage",
  components: {
    Featured,
    PopularHosts,
    RecentlyPlayed,
    Player,
    MostPopular,
    UpcomingEpisodes,
    TodayEarningsChart,
    ListenerAnalyticsChart,
    TopPodcasts,
  },
  setup() {
    onMounted(() => {
      document.body.classList.add("bg-white", "podcast-page");
    });

    onBeforeUnmount(() => {
      document.body.classList.remove("bg-white", "podcast-page");
    });
  },
});
</script>

<style lang="scss">
body {
  &.podcast-page {
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
