<template>
  <div class="max-w-full">
    <div id="chartFortyOne" class="relative flex justify-center">
      <VueApexCharts type="radialBar" height="300" :options="chartOptions" :series="series" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import VueApexCharts from 'vue3-apexcharts'

const series = ref([75, 55, 40])

const chartOptions = ref({
  chart: {
    type: 'radialBar' as const,
    height: 300,
    toolbar: { show: false },
    fontFamily: 'Outfit, sans-serif',
  },
  colors: ['#262E89', '#FEB273', '#BDB4FE'],
  plotOptions: {
    radialBar: {
      startAngle: -90,
      endAngle: 90,
      offsetY: 60,
      hollow: {
        size: '25%',
        background: 'transparent',
      },
      track: {
        background: '#F4F5F5',
        strokeWidth: '100%',
        margin: 2,
      },
      dataLabels: {
        name: { show: false },
        value: { show: false },
        total: { show: false },
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
