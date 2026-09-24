<template>
  <div id="chartToken" class="api-token-chart">
    <VueApexCharts
      :options="chartOptions"
      :series="series"
      height="300"
      type="donut"
      width="100%"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import VueApexCharts from 'vue3-apexcharts'
import type { ApexOptions } from 'apexcharts'
import { useTheme } from '@/components/layout/ThemeProvider.vue'

const { isDarkMode } = useTheme()

const series = ref([900, 700, 850])

const chartOptions = computed<ApexOptions>(() => ({
  colors: ['#7592FF', '#7CD4FD', '#BDB4FE'],
  labels: ['GPT', 'Gemini', 'xAI'],
  chart: {
    fontFamily: 'Outfit, sans-serif',
    type: 'donut',
    width: 300,
  },
  stroke: {
    show: false,
    width: 4,
    colors: ['transparent'],
  },
  plotOptions: {
    pie: {
      donut: {
        size: '70%',
        labels: {
          show: true,
          name: {
            show: true,
            offsetY: 0,
            fontSize: '12px',
          },
          value: {
            show: true,
            offsetY: 10,
            fontSize: '12px',
            formatter: () => 'Total API Token Used',
          },
          total: {
            show: true,
            label: '13.5M',
            fontSize: '24px',
            fontWeight: 600,
          },
        },
      },
    },
  },
  dataLabels: {
    enabled: false,
  },
  tooltip: {
    enabled: true,
    custom: function ({ series, seriesIndex, w }: any) {
      return (
        '<div class="rounded-lg border border-gray-200 bg-white p-2 dark:border-gray-800 dark:bg-gray-900">' +
        '<div class="flex items-center gap-2">' +
        ' <div class="size-2 rounded-full" style="background-color: ' +
        w.config.colors[seriesIndex] +
        '"></div>' +
        ' <span class="text-xs font-medium text-gray-800 dark:text-white/90">' +
        w.config.labels[seriesIndex] +
        '</span>' +
        '</div>' +
        '<div class="mt-1 text-xs text-gray-500 dark:text-gray-400">' +
        series[seriesIndex] +
        ' Units' +
        '</div>' +
        '</div>'
      )
    },
  },
  legend: {
    show: true,
    position: 'bottom' as const,
    horizontalAlign: 'center' as const,
    markers: { shape: 'circle' as const, size: 6, offsetX: -2, strokeWidth: 0 },
    itemMargin: { horizontal: 12, vertical: 0 },
    labels: { colors: isDarkMode.value ? '#98A2B3' : '#344054' },
    fontSize: '14px',
    onItemHover: { highlightDataSeries: true },
  },
  responsive: [
    {
      breakpoint: 640,
      options: {
        chart: {
          width: '100%',
          height: 280,
        },
      },
    },
  ],
}))
</script>

<style>
.api-token-chart .apexcharts-tooltip {
  background: transparent !important;
  border: none !important;
  box-shadow: none !important;
}
</style>
