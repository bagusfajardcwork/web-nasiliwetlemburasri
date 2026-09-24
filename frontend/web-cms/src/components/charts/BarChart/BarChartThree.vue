<script setup lang="ts">
import VueApexCharts from 'vue3-apexcharts'
import type { ApexOptions } from 'apexcharts'

const darkCount = 14
const lightCount = 14
const grayCount = 14

const chartOptions: ApexOptions = {
  colors: [
    ...Array(darkCount).fill('#465FFF'),
    ...Array(lightCount).fill('#36BFFA'),
    ...Array(grayCount).fill('#E4E7EC'),
  ],
  chart: {
    fontFamily: 'Outfit, sans-serif',
    type: 'bar',
    height: 32,
    sparkline: { enabled: true },
    toolbar: { show: false },
    animations: { enabled: false },
  },
  plotOptions: {
    bar: {
      horizontal: false,
      distributed: true,
      columnWidth: '70%',
      borderRadius: 1,
      borderRadiusApplication: 'around',
    },
  },
  dataLabels: { enabled: false },
  xaxis: {
    labels: { show: false },
    axisBorder: { show: false },
    axisTicks: { show: false },
  },
  yaxis: { show: false },
  grid: {
    show: false,
    padding: { top: 0, right: 0, bottom: 0, left: 0 },
  },
  tooltip: { enabled: false },
  legend: { show: false },
}

const chartSeries = [{ data: Array(darkCount + lightCount + grayCount).fill(100) }]
</script>

<template>
  <VueApexCharts :options="chartOptions" :series="chartSeries" type="bar" height="32" />
</template>
