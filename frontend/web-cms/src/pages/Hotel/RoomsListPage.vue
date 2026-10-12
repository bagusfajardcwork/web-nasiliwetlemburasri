<template>
  <div class="main-content-container overflow-hidden">
    <PageTitle pageTitle="Rooms List" subTitle="Hotel" />

    <RoomsList />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import PageTitle from "@/components/Common/PageTitle.vue";
import RoomsList from "@/components/Pages/Hotel/RoomsList/index.vue";

export default defineComponent({
  name: "RoomsListPage",
  components: {
    PageTitle,
    RoomsList,
  },
});
</script>
