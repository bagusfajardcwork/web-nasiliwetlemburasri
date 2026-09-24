<template>
  <div class="max-w-full">
    <div id="chartFortyTwo">
      <VueApexCharts type="radialBar" height="320" :options="chartOptions" :series="series" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import VueApexCharts from 'vue3-apexcharts'

const series = ref([62.25, 75, 50, 35])

const chartOptions = ref({
  chart: {
    type: 'radialBar' as const,
    height: 320,
    toolbar: { show: false },
    fontFamily: 'Outfit, sans-serif',
  },
  colors: ['#FCE7F6', '#BDB4FE', '#7A5AF8', '#4E5BA6'],
  plotOptions: {
    radialBar: {
      startAngle: 0,
      endAngle: 360,
      hollow: {
        size: '50%',
        background: 'transparent',
      },
      track: {
        background: '#F2F4F7',
        strokeWidth: '100%',
        margin: 4,
      },
      dataLabels: {
        name: {
          show: true,
          fontSize: '14px',
          fontWeight: '500',
          color: '#667085',
          offsetY: -4,
        },
        value: {
          show: true,
          fontSize: '22px',
          fontWeight: '700',
          color: '#101828',
          offsetY: 14,
          formatter: () => '62.25%',
        },
        total: {
          show: true,
          label: 'Total',
          fontSize: '14px',
          fontWeight: '500',
          color: '#667085',
          formatter: () => '62.25%',
        },
      },
    },
  },
  stroke: {
    lineCap: 'butt' as const,
  },
  legend: {
    show: false,
  },
  tooltip: {
    enabled: false,
  },
})
</script>
