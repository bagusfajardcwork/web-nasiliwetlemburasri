<template>
  <div class="main-content-container overflow-hidden">
    <PageTitle pageTitle="Dish Details" subTitle="Restaurant" />

    <DishDetails />
    <div class="mb-4"></div>
    <ReviewsComponent />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import PageTitle from "@/components/Common/PageTitle.vue";
import DishDetails from "@/components/Pages/Restaurant/DishDetails/index.vue";
import ReviewsComponent from "@/components/Pages/Restaurant/DishDetails/ReviewsComponent.vue";

export default defineComponent({
  name: "DishDetailsPage",
  components: {
    PageTitle,
    DishDetails,
    ReviewsComponent,
  },
});
</script>
