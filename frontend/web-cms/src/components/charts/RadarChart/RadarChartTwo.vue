<template>
  <div class="max-w-full overflow-x-auto custom-scrollbar">
    <div id="chartThirtyEight">
      <VueApexCharts type="radar" height="380" :options="chartOptions" :series="series" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import VueApexCharts from 'vue3-apexcharts'
import { useTheme } from '@/components/layout/ThemeProvider.vue'

const { isDarkMode } = useTheme()

const series = [
  { name: 'Desktop', data: [70, 55, 40, 30, 10, 5, 60] },
  { name: 'Mobile', data: [55, 40, 50, 60, 15, 35, 45] },
]

const chartOptions = computed(() => ({
  chart: {
    type: 'radar' as const,
    height: 380,
    toolbar: { show: false },
    fontFamily: 'Outfit, sans-serif',
    background: 'transparent',
  },
  labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
  colors: ['#3641F5', '#EE46BC'],
  fill: { opacity: 0.2 },
  stroke: { show: true, width: 2, colors: ['#465FFF', '#F05FB5'] },
  markers: { size: 0 },
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
    max: 90,
    tickAmount: 9,
    labels: {
      style: { fontSize: '11px', colors: '#98A2B3' },
      formatter: (val: number) => String(val),
    },
  },
  xaxis: {
    labels: {
      style: {
        fontSize: '13px',
        colors: Array(7).fill(isDarkMode.value ? '#98A2B3' : '#344054'),
      },
    },
  },
  legend: {
    show: true,
    position: 'bottom' as const,
    horizontalAlign: 'center' as const,
    markers: { shape: 'circle' as const, size: 6, strokeWidth: 0, offsetX: -2 },
    itemMargin: { horizontal: 12, vertical: 0 },
    labels: { colors: isDarkMode.value ? '#98A2B3' : '#344054' },
    fontSize: '14px',
  },
  tooltip: { y: { formatter: (val: number) => String(val) } },
}))
</script>
