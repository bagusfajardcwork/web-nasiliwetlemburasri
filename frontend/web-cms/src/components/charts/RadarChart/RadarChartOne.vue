<template>
  <div class="max-w-full overflow-x-auto custom-scrollbar">
    <div id="chartThirtySeven" class="w-full">
      <VueApexCharts type="radar" height="320" :options="chartOptions" :series="series" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import VueApexCharts from 'vue3-apexcharts'
import { useTheme } from '@/components/layout/ThemeProvider.vue'

const { isDarkMode } = useTheme()

const series = [{ name: 'Data', data: [9, 7, 3, 5, 3, 4, 6, 8] }]

const chartOptions = computed(() => ({
  chart: {
    type: 'radar' as const,
    height: 320,
    toolbar: { show: false },
    fontFamily: 'Outfit, sans-serif',
    background: 'transparent',
  },
  labels: ['Estonia', 'Germany', 'France', 'Spain', 'Italy', 'Canada', 'Japan', 'Brazil'],
  colors: ['#465FFF'],
  fill: { opacity: 0.3 },
  stroke: { show: true, width: 3, colors: ['#465FFF'] },
  markers: {
    size: 4,
    colors: ['#465FFF'],
    strokeColors: isDarkMode.value ? '#1D2939' : '#fff',
    strokeWidth: 2,
  },
  dataLabels: { enabled: false },
  plotOptions: {
    radar: {
      polygons: {
        strokeColors: isDarkMode.value ? '#313D4F' : '#E4E7EC',
        connectorColors: isDarkMode.value ? '#313D4F' : '#E4E7EC',
        fill: {
          colors: isDarkMode.value ? ['#1e2d40', '#1a2535'] : ['#ffffff', '#ffffff'],
        },
      },
    },
  },
  yaxis: {
    show: true,
    min: 0,
    max: 9,
    tickAmount: 3,
    labels: {
      style: { fontSize: '11px', colors: '#98A2B3' },
      formatter: (val: number) => String(val),
    },
  },
  xaxis: {
    labels: {
      style: {
        fontSize: '13px',
        colors: Array(8).fill(isDarkMode.value ? '#98A2B3' : '#344054'),
      },
    },
  },
  legend: { show: false },
  tooltip: { y: { formatter: (val: number) => String(val) } },
}))
</script>
