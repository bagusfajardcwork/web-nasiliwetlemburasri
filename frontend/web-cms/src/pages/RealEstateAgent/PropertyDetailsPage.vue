<template>
  <div class="main-content-container overflow-hidden">
    <PageTitle pageTitle="Property Details" subTitle="Real Estate Agent" />

    <PropertyDetails />
    <Reviews />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import PageTitle from "@/components/Common/PageTitle.vue";
import PropertyDetails from "@/components/Pages/RealEstateAgent/PropertyDetails/index.vue";
import Reviews from "@/components/Pages/RealEstateAgent/PropertyDetails/Reviews.vue";

export default defineComponent({
  name: "PropertyDetailsPage",
  components: {
    PageTitle,
    PropertyDetails,
    Reviews,
  },
});
</script>
