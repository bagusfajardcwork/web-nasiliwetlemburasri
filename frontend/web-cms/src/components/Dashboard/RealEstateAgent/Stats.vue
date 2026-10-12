<template>
  <div class="welcome-card-wrap mb-4">
    <div class="row justify-content-center g-4">
      <div
        class="col-lg-3 col-sm-6"
        v-for="(stat, index) in stats"
        :key="index"
      >
        <div class="card border-0 rounded-3 bg-white p-25">
          <div class="d-flex align-items-center justify-content-between">
            <div class="flex-grow-1">
              <span class="d-block">{{ stat.title }}</span>
              <h3 class="fs-24 mt-6 mb-11 lh-1">{{ stat.value }}</h3>
              <div>
                <span
                  class="d-inline-block border px-2 rounded-pill fs-12 fw-medium"
                  :class="{
                    'bg-success-80 border-success-60 text-success-60':
                      stat.trend > 0,
                    'bg-card-text-c border-danger-50 text-danger-50':
                      stat.trend <= 0,
                  }"
                >
                  {{ stat.trend > 0 ? "+" : "" }}{{ stat.trend }}%
                </span>
              </div>
            </div>
            <div class="flex-shrink-0">
              <img :src="getImagePath(index)" :alt="'building' + (index + 1)" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

interface StatItem {
  title: string;
  value: string | number;
  trend: number;
}

export default defineComponent({
  name: "StatsDashboard",
  setup() {
    const stats: StatItem[] = [
      {
        title: "Total Listings",
        value: 3251,
        trend: 3.4,
      },
      {
        title: "Sales Volume",
        value: "$1.2M",
        trend: -3.2,
      },
      {
        title: "Active Deals",
        value: 1124,
        trend: 1.4,
      },
      {
        title: "Closed Deals",
        value: 2312,
        trend: -1.2,
      },
    ];

    const getImagePath = (index: number): string => {
      return require(`@/assets/images/building${index + 1}.png`);
    };

    return {
      stats,
      getImagePath,
    };
  },
});
</script>
