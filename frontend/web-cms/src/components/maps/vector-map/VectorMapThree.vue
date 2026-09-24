<script setup lang="ts">
import { onMounted, ref, onBeforeUnmount } from 'vue'
import jsVectorMap from 'jsvectormap'
import '../us-aea-en.js'

const mapRef = ref<HTMLElement | null>(null)
const mapInstance = ref<any>(null)

const markers = [
  { name: 'Los Angeles', coords: [34.05, -118.24] },
  { name: 'New York', coords: [40.71, -74.0] },
  { name: 'Chicago', coords: [41.87, -87.62] },
  { name: 'Houston', coords: [29.76, -95.36] },
  { name: 'Denver', coords: [39.73, -104.99] },
  { name: 'Seattle', coords: [47.6, -122.33] },
  { name: 'Miami', coords: [25.76, -80.19] },
  { name: 'Atlanta', coords: [33.74, -84.38] },
  { name: 'Philadelphia', coords: [39.95, -75.16] },
  { name: 'Boston', coords: [42.36, -71.05] },
  { name: 'Nashville', coords: [36.16, -86.78] },
  { name: 'Dallas', coords: [32.77, -96.79] },
  { name: 'Minneapolis', coords: [44.97, -93.26] },
  { name: 'Washington D.C.', coords: [38.9, -77.03] },
  { name: 'San Francisco', coords: [37.77, -122.41] },
  { name: 'Las Vegas', coords: [36.1, -115.17] },
  { name: 'Phoenix', coords: [33.44, -112.07] },
  { name: 'San Antonio', coords: [29.42, -98.49] },
]

const initMap = () => {
  if (mapRef.value) {
    mapInstance.value = new jsVectorMap({
      selector: mapRef.value,
      map: 'us_aea_en',
      zoomOnScroll: false,
      zoomButtons: false,
      regionStyle: {
        initial: {
          fill: '#C5D8FF',
          fillOpacity: 1,
          stroke: 'white',
          strokeWidth: 2,
          strokeOpacity: 1,
        },
        hover: {
          fillOpacity: 0.8,
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
          fill: '#465fff',
          stroke: 'white',
          strokeWidth: 2,
          r: 5,
        },
        hover: {
          fill: '#3538CD',
        },
        selected: {},
        selectedHover: {},
      },
    })
  }
}

const handleZoomIn = () => {
  if (mapInstance.value) {
    const map = mapInstance.value
    const scale = map.scale || 1
    const zoomStep = map.params?.zoomStep || 1.5
    const animate = map.params?.zoomAnimate !== false
    const width = map._width || map.container?.offsetWidth || 0
    const height = map._height || map.container?.offsetHeight || 0

    if (typeof map._setScale === 'function') {
      map._setScale(scale * zoomStep, width / 2, height / 2, false, animate)
    }
  }
}

const handleZoomOut = () => {
  if (mapInstance.value) {
    const map = mapInstance.value
    const scale = map.scale || 1
    const zoomStep = map.params?.zoomStep || 1.5
    const animate = map.params?.zoomAnimate !== false
    const width = map._width || map.container?.offsetWidth || 0
    const height = map._height || map.container?.offsetHeight || 0

    if (typeof map._setScale === 'function') {
      map._setScale(scale / zoomStep, width / 2, height / 2, false, animate)
    }
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
        US Customer Heatmap
      </h3>
      <p class="text-theme-sm mt-1 text-gray-500 dark:text-gray-400">
        Analyze customer density and regional performance
      </p>
    </div>

    <div class="relative overflow-hidden rounded-2xl border border-gray-200 bg-gray-50 dark:border-gray-800 dark:bg-gray-900">
      <div id="mapCustomerPinPoint" class="map-btn w-full" style="height: 274px">
        <div ref="mapRef" class="h-full w-full bg-transparent!"></div>
      </div>

      <!-- Zoom Controls -->
      <div class="absolute bottom-3 right-3 z-10">
        <div class="flex flex-col overflow-hidden rounded-lg border border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-900">
          <button
            @click="handleZoomIn"
            class="flex h-9 w-9 items-center justify-center border-b border-gray-200 text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:border-gray-800 dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-white"
            aria-label="Zoom in"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M8 3.33334V12.6667M3.33334 8H12.6667"
                stroke="currentColor"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </button>
          <button
            @click="handleZoomOut"
            class="flex h-9 w-9 items-center justify-center text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-white"
            aria-label="Zoom out"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M3.33334 8H12.6667"
                stroke="currentColor"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
