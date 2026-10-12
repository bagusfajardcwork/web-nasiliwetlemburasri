<template>
  <div class="main-content-container overflow-hidden">
    <PageTitle pageTitle="Menus" subTitle="Restaurant" />

    <Menus />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import PageTitle from "@/components/Common/PageTitle.vue";
import Menus from "@/components/Pages/Restaurant/Menus/index.vue";

export default defineComponent({
  name: "MenusPage",
  components: {
    PageTitle,
    Menus,
  },
});
</script>
