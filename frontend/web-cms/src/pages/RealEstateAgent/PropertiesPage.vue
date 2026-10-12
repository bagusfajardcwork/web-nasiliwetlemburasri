<template>
  <div class="main-content-container overflow-hidden">
    <PageTitle pageTitle="Properties" subTitle="Real Estate Agent" />

    <Properties />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import PageTitle from "@/components/Common/PageTitle.vue";
import Properties from "@/components/Pages/RealEstateAgent/Properties/index.vue";

export default defineComponent({
  name: "PropertiesPage",
  components: {
    PageTitle,
    Properties,
  },
});
</script>
