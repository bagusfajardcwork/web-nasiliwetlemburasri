<script setup lang="ts">
import { onMounted, ref, onBeforeUnmount } from 'vue'
import jsVectorMap from 'jsvectormap'
import 'jsvectormap/dist/maps/world'

const mapRef = ref<HTMLElement | null>(null)
const mapInstance = ref<any>(null)

const markers = [
  {
    name: 'United States',
    coords: [37.2580397, -104.657039],
  },
  { name: 'India', coords: [20.7504374, 73.7276105] },
  { name: 'United Kingdom', coords: [53.613, -11.6368] },
  {
    name: 'Australia',
    coords: [-25.0304388, 115.2092761],
  },
]

const initMap = () => {
  if (mapRef.value) {
    mapInstance.value = new jsVectorMap({
      selector: mapRef.value,
      map: 'world',
      zoomOnScroll: false,
      zoomButtons: false,
      regionStyle: {
        initial: {
          fontFamily: 'Outfit',
          fill: '#D9D9D9',
          stroke: 'none',
          strokeWidth: 0,
          strokeOpacity: 0,
        },
        hover: {
          fillOpacity: 0.7,
          fill: '#465FFF',
          cursor: 'pointer',
        },
        selected: {
          fill: '#465FFF',
        },
        selectedHover: {},
      },
      markers: markers,
      markerStyle: {
        initial: {
          strokeWidth: 1,
          fill: '#465FFF',
          fillOpacity: 1,
          r: 5,
        },
        hover: {
          fill: '#3538CD',
          fillOpacity: 1,
        },
        selected: {},
        selectedHover: {},
      },
    })
  }
}

onMounted(() => {
  initMap()
})

onBeforeUnmount(() => {
  if (mapInstance.value) {
    mapInstance.value.destroy()
  }
})
</script>

<template>
  <div class="rounded-2xl border border-gray-200 bg-white p-5 sm:p-6 dark:border-gray-800 dark:bg-white/[0.03]">
    <div class="mb-5">
      <h3 class="text-lg font-semibold text-gray-800 dark:text-white/90">
        Global User Distribution
      </h3>
      <p class="text-theme-sm mt-1 text-gray-500 dark:text-gray-400">
        Track active users and customer locations worldwide
      </p>
    </div>

    <div class="overflow-hidden rounded-2xl border border-gray-200 bg-gray-50 dark:border-gray-800 dark:bg-gray-900">
      <div class="relative map-btn w-full" style="height: 274px">
        <div ref="mapRef" class="h-full w-full bg-transparent!"></div>
      </div>
    </div>
  </div>
</template>
