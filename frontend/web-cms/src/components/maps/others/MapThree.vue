<script setup lang="ts">
import { onMounted, ref, onBeforeUnmount } from 'vue'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

const mapContainerRef = ref<HTMLDivElement | null>(null)
const mapInstance = ref<L.Map | null>(null)

onMounted(() => {
  if (mapContainerRef.value) {
    const homeLatLng: L.LatLngExpression = [40.765, -74.45]
    const officeLatLng: L.LatLngExpression = [40.78, -74.41]

    const map = L.map(mapContainerRef.value, {
      center: [40.772, -74.43],
      zoom: 13,
      scrollWheelZoom: false,
      zoomControl: false,
      attributionControl: false,
    })

    mapInstance.value = map

    L.tileLayer(
      'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png',
      {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
      }
    ).addTo(map)

    // Custom marker HTML generator
    const makeIcon = (label: string, svgPath: string) =>
      L.divIcon({
        html: `
          <div style="display:flex;flex-direction:column;align-items:center;">
            <div style="
              width:40px;height:40px;border-radius:50%;
              border:1px solid #c7d7fe;
              background:#eff4ff;color:#3538CD;
              display:flex;align-items:center;justify-content:center;
            ">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">${svgPath}</svg>
            </div>
            <div style="
              margin-top:6px;background:#fff;color:#1d2939;
              border-radius:999px;padding:2px 10px;font-size:11px;
              font-weight:500;box-shadow:0 2px 8px rgba(0,0,0,0.12);
              white-space:nowrap;
            ">${label}</div>
          </div>
        `,
        className: '',
        iconSize: [60, 80],
        iconAnchor: [30, 40],
      })

    const homeSvg =
      '<path d="M3 9.5L12 3l9 6.5V20a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9.5z"/><polyline points="9 22 9 12 15 12 15 22"/>'
    const officeSvg =
      '<rect x="2" y="7" width="20" height="15" rx="1"/><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/><line x1="12" y1="12" x2="12" y2="12.01"/>'

    L.marker(homeLatLng, { icon: makeIcon('Home', homeSvg) }).addTo(map)
    L.marker(officeLatLng, { icon: makeIcon('Office', officeSvg) }).addTo(map)
  }
})

onBeforeUnmount(() => {
  if (mapInstance.value) {
    mapInstance.value.remove()
  }
})

const handleZoomIn = () => {
  if (mapInstance.value) {
    mapInstance.value.zoomIn()
  }
}

const handleZoomOut = () => {
  if (mapInstance.value) {
    mapInstance.value.zoomOut()
  }
}
</script>

<template>
  <div class="rounded-2xl border border-gray-200 bg-white p-5 sm:p-6 dark:border-gray-800 dark:bg-white/[0.03]">
    <div class="mb-5 flex items-start justify-between">
      <div>
        <h3 class="text-lg font-semibold text-gray-800 dark:text-white/90">
          Washington D.C. Region
        </h3>
        <p class="text-theme-sm mt-1 text-gray-500 dark:text-gray-400">
          Interactive map with Home and Office Pinned
        </p>
      </div>
    </div>

    <div class="relative z-0 overflow-hidden rounded-2xl border border-gray-200 dark:border-gray-800">
      <div
        ref="mapContainerRef"
        id="mapLocationView"
        class="h-[300px] w-full"
      ></div>

      <!-- Zoom Controls -->
      <div class="absolute top-3 right-3 z-[999]">
        <div class="flex flex-col overflow-hidden rounded-lg border border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-900">
          <button
            id="mapLocationZoomIn"
            type="button"
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
            id="mapLocationZoomOut"
            type="button"
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
