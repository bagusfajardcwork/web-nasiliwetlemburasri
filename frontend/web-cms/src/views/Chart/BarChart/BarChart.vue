<template>
  <AdminLayout>
    <PageBreadcrumb :pageTitle="currentPageTitle" />
    <div class="space-y-5 sm:space-y-6">
      <ComponentCard title="Bar Chart 1">
        <BarChartOne />
      </ComponentCard>
      <ComponentCard title="Bar Chart 2">
        <BarChartTwo />
      </ComponentCard>
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ComponentCard title="Bar Chart 3">
          <BarChartThree />
        </ComponentCard>
        <ComponentCard title="Bar Chart 4">
          <BarChartFour />
        </ComponentCard>
        <ComponentCard title="Bar Chart 5">
          <BarChartFive />
        </ComponentCard>
        <ComponentCard title="Bar Chart 6">
          <BarChartSix />
        </ComponentCard>
      </div>
    </div>
  </AdminLayout>
</template>

<script setup>
import BarChartOne from '@/components/charts/BarChart/BarChartOne.vue'
import BarChartTwo from '@/components/charts/BarChart/BarChartTwo.vue'
import BarChartThree from '@/components/charts/BarChart/BarChartThree.vue'
import ComponentCard from '@/components/common/ComponentCard.vue'
import PageBreadcrumb from '@/components/common/PageBreadcrumb.vue'
import AdminLayout from '@/components/layout/AdminLayout.vue'
import { ref } from 'vue'
import BarChartFour from '@/components/charts/BarChart/BarChartFour.vue'
import BarChartSix from '@/components/charts/BarChart/BarChartSix.vue'
import BarChartFive from '@/components/charts/BarChart/BarChartFive.vue'
const currentPageTitle = ref('Bar Chart')
</script>
