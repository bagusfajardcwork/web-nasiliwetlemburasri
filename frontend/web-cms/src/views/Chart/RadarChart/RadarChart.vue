<template>
  <AdminLayout>
    <PageBreadcrumb :pageTitle="currentPageTitle" />
    <div class="gap-6 grid-cols-1 lg:grid-cols-2 grid">
      <ComponentCard title="Radar Chart 1">
        <RadarChartOne />
      </ComponentCard>
      <ComponentCard title="Radar Chart 2">
        <RadarChartTwo />
      </ComponentCard>
      <ComponentCard title="Radar Chart 3">
        <RadarChartThree />
      </ComponentCard>
    </div>
  </AdminLayout>
</template>

<script setup>
import RadarChartOne from '@/components/charts/RadarChart/RadarChartOne.vue'
import RadarChartThree from '@/components/charts/RadarChart/RadarChartThree.vue'
import RadarChartTwo from '@/components/charts/RadarChart/RadarChartTwo.vue'
import ComponentCard from '@/components/common/ComponentCard.vue'
import PageBreadcrumb from '@/components/common/PageBreadcrumb.vue'
import AdminLayout from '@/components/layout/AdminLayout.vue'
import { ref } from 'vue'
const currentPageTitle = ref('Radar Chart')
</script>
