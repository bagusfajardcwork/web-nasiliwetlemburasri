<template>
  <div class="flex items-center gap-10">
    <Tooltip content="White Tooltip" variant="light">
      <Button size="sm">Light Tooltip</Button>
    </Tooltip>
    <Tooltip content="Dark Tooltip" variant="dark">
      <Button size="sm">Dark Tooltip</Button>
    </Tooltip>
  </div>
</template>

<script setup lang="ts">
import Tooltip from '../Tooltip.vue'
import Button from '../Button.vue'
</script>
