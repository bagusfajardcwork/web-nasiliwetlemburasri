<template>
  <div class="main-content-container overflow-hidden">
    <PageTitle pageTitle="Guests List" subTitle="Hotel" />

    <GuestsList />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import PageTitle from "@/components/Common/PageTitle.vue";
import GuestsList from "@/components/Pages/Hotel/GuestsList/index.vue";

export default defineComponent({
  name: "GuestsListPage",
  components: {
    PageTitle,
    GuestsList,
  },
});
</script>
