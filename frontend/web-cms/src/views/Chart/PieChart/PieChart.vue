<template>
  <AdminLayout>
    <PageBreadcrumb :pageTitle="currentPageTitle" />
    <div class="grid grid-cols-1 gap-6 xl:grid-cols-2">
      <ComponentCard title="Doughnut Chart 1">
        <PieChartOne />
      </ComponentCard>
      <ComponentCard title="Doughnut Chart 2">
        <PieChartTwo />
      </ComponentCard>
      <ComponentCard title="Doughnut Chart 3">
        <PieChartThree />
      </ComponentCard>
      <ComponentCard title="Doughnut Chart 4">
        <PieChartFour />
      </ComponentCard>
      <ComponentCard title="Doughnut Chart 5">
        <PieChartFive />
      </ComponentCard>
    </div>
  </AdminLayout>
</template>

<script setup>
import PieChartFive from '@/components/charts/PieChart/PieChartFive.vue'
import PieChartFour from '@/components/charts/PieChart/PieChartFour.vue'
import PieChartOne from '@/components/charts/PieChart/PieChartOne.vue'
import PieChartThree from '@/components/charts/PieChart/PieChartThree.vue'
import PieChartTwo from '@/components/charts/PieChart/PieChartTwo.vue'
import ComponentCard from '@/components/common/ComponentCard.vue'
import PageBreadcrumb from '@/components/common/PageBreadcrumb.vue'
import AdminLayout from '@/components/layout/AdminLayout.vue'
import { ref } from 'vue'
const currentPageTitle = ref('Doughnut Chart')
</script>
