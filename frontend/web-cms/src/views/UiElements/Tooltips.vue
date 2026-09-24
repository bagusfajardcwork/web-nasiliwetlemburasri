<template>
  <AdminLayout>
    <PageBreadcrumb :pageTitle="currentPageTitle" />
    <div class="space-y-5 sm:space-y-6">
      <ComponentCard title="Default Tooltip">
        <DefaultTooltip />
      </ComponentCard>
      <ComponentCard title="White and Dark Tooltip">
        <TooltipLightDark />
      </ComponentCard>
      <ComponentCard title="Tooltip Placement">
        <TooltipPlacement />
      </ComponentCard>
    </div>
  </AdminLayout>
</template>

<script setup>
import { ref } from 'vue'
import PageBreadcrumb from '@/components/common/PageBreadcrumb.vue'
import AdminLayout from '@/components/layout/AdminLayout.vue'
import ComponentCard from '@/components/common/ComponentCard.vue'
import DefaultTooltip from '@/components/ui/tooltip/DefaultTooltip.vue'
import TooltipLightDark from '@/components/ui/tooltip/TooltipLightDark.vue'
import TooltipPlacement from '@/components/ui/tooltip/TooltipPlacement.vue'
const currentPageTitle = ref('Tooltips')
</script>

<style></style>
