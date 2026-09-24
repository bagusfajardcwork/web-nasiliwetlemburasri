<template>
  <div class="max-w-full overflow-x-auto custom-scrollbar">
    <div id="chartFortyFour">
      <VueApexCharts type="donut" height="280" :options="chartOptions" :series="series" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import VueApexCharts from 'vue3-apexcharts'
import { useTheme } from '@/components/layout/ThemeProvider.vue'

const { isDarkMode } = useTheme()

const series = [35, 25, 20, 12, 8]

const chartOptions = computed(() => ({
  chart: {
    type: 'donut' as const,
    height: 280,
    toolbar: { show: false },
    fontFamily: 'Outfit, sans-serif',
  },
  labels: ['Email', 'Social Media', 'Mobile', 'Direct', 'Other'],
  colors: ['#4E5BA6', '#4E5BA6', '#BDB4FE', '#B9E6FE', '#FCE7F6'],
  plotOptions: {
    pie: {
      startAngle: -90,
      endAngle: 90,
      offsetY: 10,
      donut: { size: '55%' },
    },
  },
  dataLabels: { enabled: false },
  stroke: {
    show: true,
    width: 3,
    colors: [isDarkMode.value ? '#1D2939' : '#ffffff'],
  },
  legend: {
    show: true,
    position: 'bottom' as const,
    horizontalAlign: 'center' as const,
    markers: { shape: 'circle' as const, size: 6, offsetX: -2, strokeWidth: 0 },
    itemMargin: { horizontal: 10, vertical: 0 },
    labels: { colors: isDarkMode.value ? '#98A2B3' : '#344054' },
    fontSize: '13px',
  },
  tooltip: { enabled: false },
  responsive: [{ breakpoint: 480, options: { chart: { height: 240 } } }],
}))
</script>
