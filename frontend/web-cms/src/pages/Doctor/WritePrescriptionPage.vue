<template>
  <div class="main-content-container overflow-hidden">
    <PageTitle pageTitle="Write a Prescription" subTitle="Doctor" />

    <WritePrescription />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import PageTitle from "@/components/Common/PageTitle.vue";
import WritePrescription from "@/components/Pages/Doctor/WritePrescription/index.vue";

export default defineComponent({
  name: "WritePrescriptionPage",
  components: {
    PageTitle,
    WritePrescription,
  },
});
</script>
