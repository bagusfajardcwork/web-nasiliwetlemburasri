<template>
  <div class="main-content-container overflow-hidden">
    <PageTitle pageTitle="Prescriptions" subTitle="Doctor" />

    <Prescriptions />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import PageTitle from "@/components/Common/PageTitle.vue";
import Prescriptions from "@/components/Pages/Doctor/Prescriptions/index.vue";

export default defineComponent({
  name: "PrescriptionsPage",
  components: {
    PageTitle,
    Prescriptions,
  },
});
</script>
