<template>
  <div class="main-content-container overflow-hidden">
    <PageTitle pageTitle="Transactions" subTitle="Crypto Trader" />

    <Transactions />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import PageTitle from "@/components/Common/PageTitle.vue";
import Transactions from "@/components/Pages/CryptoTrader/Transactions/index.vue";

export default defineComponent({
  name: "TransactionsPage",
  components: {
    PageTitle,
    Transactions,
  },
});
</script>
