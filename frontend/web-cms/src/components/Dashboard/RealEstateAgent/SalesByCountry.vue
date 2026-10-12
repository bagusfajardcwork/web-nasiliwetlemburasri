<template>
  <div class="card bg-white border-0 rounded-3">
    <div class="card-body p-4">
      <div
        class="d-flex justify-content-between align-items-center flex-wrap gap-3 mb-4"
      >
        <h5 class="mb-0">Sales By Country</h5>
        <div class="dropdown action-opt">
          <button
            class="btn bg-transparent p-0"
            type="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <i data-feather="more-vertical" style="stroke: #64748b"></i>
          </button>
          <ul
            class="dropdown-menu dropdown-menu-end bg-white border box-shadow"
          >
            <li>
              <a
                class="dropdown-item"
                href="javascript:;"
                @click="setTimeRange('day')"
              >
                This Day
              </a>
            </li>
            <li>
              <a
                class="dropdown-item"
                href="javascript:;"
                @click="setTimeRange('week')"
              >
                This Week
              </a>
            </li>
            <li>
              <a
                class="dropdown-item"
                href="javascript:;"
                @click="setTimeRange('month')"
              >
                This Month
              </a>
            </li>
            <li>
              <a
                class="dropdown-item"
                href="javascript:;"
                @click="setTimeRange('year')"
              >
                This Year
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div class="ext-center" style="margin: 25px 0">
        <img src="@/assets/images/map.svg" alt="map" />
      </div>
      <ul class="px-0 mb-0 list-unstyled border-top pt-12">
        <li
          v-for="country in filteredCountries"
          :key="country.code"
          class="mb-12 pb-12 border-bottom"
        >
          <div class="d-flex align-items-center justify-content-between">
            <div class="flex-shrink-0">
              <div class="d-flex align-items-center" style="gap: 8px">
                <img
                  :src="getFlagImage(country.code)"
                  style="width: 24px"
                  :alt="country.name"
                />
                <h4 class="mb-0 fs-14 fw-medium lh-1 text-body">
                  {{ country.name }}
                </h4>
              </div>
            </div>
            <div class="flex-grow-1 ms-3">
              <div class="d-flex align-items-center justify-content-end">
                <div class="progress-responsive" style="width: 120px">
                  <div
                    class="progress rounded-pill"
                    style="height: 5px; background-color: #ecf0ff"
                    role="progressbar"
                    :aria-valuenow="country.percentage"
                    aria-valuemin="0"
                    aria-valuemax="100"
                  >
                    <div
                      class="progress-bar rounded-pill"
                      :style="`width: ${country.percentage}%; height: 5px; background-color: ${country.color}`"
                    ></div>
                  </div>
                </div>
                <span class="count text-body ms-3 fs-14 fw-medium">
                  {{ country.percentage }}%
                </span>
              </div>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";

interface CountryData {
  code: string;
  name: string;
  percentage: number;
  color: string;
  timeRange: string[]; // which time ranges this data applies to
}

export default defineComponent({
  name: "SalesByCountry",
  props: {
    countries: {
      type: Array as PropType<CountryData[]>,
      required: false,
      default: () => [
        {
          code: "portugal",
          name: "Portugal",
          percentage: 85,
          color: "#757dff",
          timeRange: ["day", "week", "month", "year"],
        },
        {
          code: "germany",
          name: "Germany",
          percentage: 65,
          color: "#0f79f3",
          timeRange: ["day", "week", "month", "year"],
        },
        {
          code: "spain",
          name: "Spain",
          percentage: 45,
          color: "#9135e8",
          timeRange: ["week", "month", "year"],
        },
        {
          code: "canada",
          name: "Canada",
          percentage: 75,
          color: "#25b003",
          timeRange: ["month", "year"],
        },
        {
          code: "france",
          name: "France",
          percentage: 55,
          color: "#ff6b4a",
          timeRange: ["year"],
        },
      ],
    },
  },
  data() {
    return {
      currentTimeRange: "month" as "day" | "week" | "month" | "year",
    };
  },
  computed: {
    filteredCountries(): CountryData[] {
      return this.countries
        .filter((country) => country.timeRange.includes(this.currentTimeRange))
        .sort((a, b) => b.percentage - a.percentage);
    },
  },
  methods: {
    setTimeRange(range: "day" | "week" | "month" | "year") {
      this.currentTimeRange = range;
      // You could also emit an event here if parent component needs to know
      // this.$emit('time-range-changed', range);
    },
    getFlagImage(code: string): string {
      // Assuming you have flag images named by country code
      return require(`@/assets/images/${code}.svg`);
    },
  },
});
</script>

<style lang="scss" scoped>
.ext-center {
  text-align: center;
}
.list-unstyled {
  li {
    &:last-child {
      margin-bottom: 0;
    }
  }
}
</style>
