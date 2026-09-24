<template>
  <div class="flex items-center flex-wrap gap-10">
    <Tooltip content="This is a tooltip" placement="top">
      <Button size="sm">Tooltip Top</Button>
    </Tooltip>
    <Tooltip content="This is a tooltip" placement="right">
      <Button size="sm">Tooltip Right</Button>
    </Tooltip>
    <Tooltip content="This is a tooltip" placement="left">
      <Button size="sm">Tooltip Left</Button>
    </Tooltip>
    <Tooltip content="This is a tooltip" placement="bottom">
      <Button size="sm">Tooltip Bottom</Button>
    </Tooltip>
  </div>
</template>

<script setup lang="ts">
import Tooltip from '../Tooltip.vue'
import Button from '../Button.vue'
</script>
