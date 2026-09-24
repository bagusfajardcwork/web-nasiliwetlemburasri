<template>
  <div>
    <div id="chartSixteen" class="flex justify-center mx-auto">
      <VueApexCharts
        type="donut"
        :options="chartOptions"
        :series="series"
        width="400"
      ></VueApexCharts>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import VueApexCharts from 'vue3-apexcharts'
import { useTheme } from '@/components/layout/ThemeProvider.vue'

const { isDarkMode } = useTheme()

const series = ref([45, 65, 25, 25])

const chartOptions = computed(() => ({
  colors: ['#9b8afb', '#fd853a', '#fdb022', '#32d583'],
  labels: ['Downloads', 'Apps', 'Documents', 'Media'],
  chart: {
    fontFamily: 'Outfit, sans-serif',
    type: 'donut',
    width: 400,
  },
  stroke: {
    show: false,
    width: 4,
    colors: 'transparent',
  },
  plotOptions: {
    pie: {
      donut: {
        lineCap: 'smooth',
        size: '65%',
        background: 'transparent',
        labels: {
          show: true,
          name: {
            show: true,
            offsetY: 0,
            fontSize: '12px',
            fontWeight: 'normal',
          },
          value: {
            show: true,
            offsetY: 10,
            fontSize: '14px',
            formatter: () => 'Used of 135 GB',
          },
          total: {
            show: true,
            label: 'Total 135 GB',
            fontSize: '24px',
            fontWeight: 'bold',
          },
        },
      },
      expandOnClick: false,
    },
  },
  dataLabels: {
    enabled: false,
  },
  tooltip: {
    enabled: false,
  },
  legend: {
    show: true,
    position: 'bottom',
    horizontalAlign: 'left',
    fontFamily: 'Outfit',
    fontSize: '14px',
    fontWeight: 400,
    markers: {
      size: 5,
      shape: 'circle',
      radius: 999,
      strokeWidth: 0,
    },
    itemMargin: {
      horizontal: 10,
      vertical: 6,
    },
  },
  responsive: [
    {
      breakpoint: 640,
      options: {
        chart: {
          width: 380,
        },
        legend: {
          itemMargin: {
            horizontal: 7,
            vertical: 5,
          },
        },
      },
    },
    {
      breakpoint: 375,
      options: {
        legend: {
          fontSize: '12px',
        },
      },
    },
    {
      breakpoint: 1500,
      options: {
        legend: {
          itemMargin: {
            horizontal: 10,
            vertical: 6,
          },
        },
      },
    },
  ],
}))
</script>

<style></style>
