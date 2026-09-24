<script setup lang="ts">
import { onMounted, ref, onBeforeUnmount } from 'vue'
import jsVectorMap from 'jsvectormap'
import 'jsvectormap/dist/maps/world'

const mapRef = ref<HTMLElement | null>(null)
const mapInstance = ref<any>(null)

const initMap = () => {
  if (mapRef.value) {
    mapInstance.value = new jsVectorMap({
      selector: mapRef.value,
      map: 'world',
      zoomOnScroll: false,
      zoomButtons: false,
      regionStyle: {
        initial: {
          fill: '#C5D8FF',
          fillOpacity: 1,
          stroke: 'white',
          strokeWidth: 0.5,
          strokeOpacity: 1,
        },
        hover: {
          fillOpacity: 0.8,
          fill: '#465FFF',
          cursor: 'pointer',
        },
        selected: {
          fill: '#3538CD',
        },
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
        Country Traffic Analytics
      </h3>
      <p class="text-theme-sm mt-1 text-gray-500 dark:text-gray-400">
        Visualize traffic volume and engagement by region
      </p>
    </div>

    <div class="relative overflow-hidden rounded-2xl border border-gray-200 bg-gray-50 dark:border-gray-800 dark:bg-gray-900">
      <div id="mapTrafficAnalytics" class="map-btn w-full" style="height: 274px">
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

<style>
/* CSS path filling based on country codes for VectorMapTwo */
#mapTrafficAnalytics path[data-code="US"] { fill: #3538CD !important; }
#mapTrafficAnalytics path[data-code="CA"] { fill: #8098F9 !important; }
#mapTrafficAnalytics path[data-code="CN"] { fill: #8098F9 !important; }
#mapTrafficAnalytics path[data-code="FR"] { fill: #9CB9FF !important; }
#mapTrafficAnalytics path[data-code="BR"] { fill: #9CB9FF !important; }
#mapTrafficAnalytics path[data-code="RU"] { fill: #9CB9FF !important; }
#mapTrafficAnalytics path[data-code="AU"] { fill: #ADC6FF !important; }
</style>
