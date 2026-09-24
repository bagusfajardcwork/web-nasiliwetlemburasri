<template>
  <div class="max-w-full">
    <div id="chartForty">
      <VueApexCharts type="radialBar" height="300" :options="chartOptions" :series="series" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import VueApexCharts from 'vue3-apexcharts'

const series = ref([62.25])

const chartOptions = ref({
  chart: {
    type: 'radialBar' as const,
    height: 300,
    toolbar: { show: false },
    fontFamily: 'Outfit, sans-serif',
  },
  colors: ['#465FFF'],
  plotOptions: {
    radialBar: {
      startAngle: 0,
      endAngle: 360,
      hollow: {
        size: '72%',
        background: 'transparent',
      },
      track: {
        background: '#F2F4F7',
        strokeWidth: '100%',
        startAngle: 0,
        endAngle: 360,
      },
      dataLabels: {
        name: {
          show: true,
          fontSize: '15px',
          fontWeight: '600',
          color: '#344054',
          offsetY: -4,
        },
        value: {
          show: true,
          fontSize: '20px',
          fontWeight: '700',
          color: '#101828',
          offsetY: 16,
          formatter: (val: number) => `${val}%`,
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
