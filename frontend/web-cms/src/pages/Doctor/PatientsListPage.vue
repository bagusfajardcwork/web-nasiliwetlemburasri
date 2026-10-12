<template>
  <div class="main-content-container overflow-hidden">
    <PageTitle pageTitle="Patients List" subTitle="Doctor" />

    <PatientsList />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import PageTitle from "@/components/Common/PageTitle.vue";
import PatientsList from "@/components/Pages/Doctor/PatientsList/index.vue";

export default defineComponent({
  name: "PatientsListPage",
  components: {
    PageTitle,
    PatientsList,
  },
});
</script>
