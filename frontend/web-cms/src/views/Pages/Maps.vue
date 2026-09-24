<template>
  <AdminLayout>
    <PageBreadcrumb :pageTitle="currentPageTitle" />
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <MapOne />
      <MapTwo />
      <MapThree />
    </div>
  </AdminLayout>
</template>

<script setup>
import { ref } from 'vue'
import AdminLayout from '@/components/layout/AdminLayout.vue'
import PageBreadcrumb from '@/components/common/PageBreadcrumb.vue'
import MapOne from '@/components/maps/others/MapOne.vue'
import MapTwo from '@/components/maps/others/MapTwo.vue'
import MapThree from '@/components/maps/others/MapThree.vue'

const currentPageTitle = ref('Maps')
</script>
