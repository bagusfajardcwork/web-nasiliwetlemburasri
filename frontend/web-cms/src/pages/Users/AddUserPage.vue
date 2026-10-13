<template>
  <div class="main-content-container overflow-hidden">
    <PageTitle pageTitle="Tambah Pengguna" subTitle="Pengguna" />

    <AddUser />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import PageTitle from "@/components/Common/PageTitle.vue";
import AddUser from "@/components/Pages/Users/AddUser/index.vue";

export default defineComponent({
  name: "AddUserPage",
  components: {
    PageTitle,
    AddUser,
  },
});
</script>
