<template>
  <AdminLayout>
    <PageBreadcrumb :pageTitle="currentPageTitle" />
    <div class="gap-6 grid-cols-1 lg:grid-cols-2 grid">
      <ComponentCard title="Radial Chart 1">
        <RadialChartOne />
      </ComponentCard>
      <ComponentCard title="Radial Chart 2">
        <RadialChartTwo />
      </ComponentCard>
      <ComponentCard title="Radial Chart 3">
        <RadialChartThree />
      </ComponentCard>
      <ComponentCard title="Radial Chart 4">
        <RadialChartFour />
      </ComponentCard>
    </div>
  </AdminLayout>
</template>

<script setup>
import RadialChartOne from '@/components/charts/RadialChart/RadialChartOne.vue'
import RadialChartTwo from '@/components/charts/RadialChart/RadialChartTwo.vue'
import RadialChartThree from '@/components/charts/RadialChart/RadialChartThree.vue'
import RadialChartFour from '@/components/charts/RadialChart/RadialChartFour.vue'
import ComponentCard from '@/components/common/ComponentCard.vue'
import PageBreadcrumb from '@/components/common/PageBreadcrumb.vue'
import AdminLayout from '@/components/layout/AdminLayout.vue'
import { ref } from 'vue'
const currentPageTitle = ref('Radar Chart')
</script>
