<template>
  <AdminLayout>
    <PageBreadcrumb :pageTitle="currentPageTitle" />
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <VectorMapOne />
      <VectorMapTwo />
      <VectorMapThree />
    </div>
  </AdminLayout>
</template>

<script setup>
import { ref } from 'vue'
import AdminLayout from '@/components/layout/AdminLayout.vue'
import PageBreadcrumb from '@/components/common/PageBreadcrumb.vue'
import VectorMapOne from '@/components/maps/vector-map/VectorMapOne.vue'
import VectorMapTwo from '@/components/maps/vector-map/VectorMapTwo.vue'
import VectorMapThree from '@/components/maps/vector-map/VectorMapThree.vue'

const currentPageTitle = ref('Vector Maps')
</script>
