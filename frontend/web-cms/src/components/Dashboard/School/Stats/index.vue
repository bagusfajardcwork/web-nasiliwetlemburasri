<template>
  <div class="card-group custom-shadow mb-4 rounded-3">
    <TotalStudents />

    <TotalTeachers />

    <AttendanceToday />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import TotalStudents from "./TotalStudents.vue";
import TotalTeachers from "./TotalTeachers.vue";
import AttendanceToday from "./AttendanceToday.vue";

export default defineComponent({
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Stats",
  components: {
    TotalStudents,
    TotalTeachers,
    AttendanceToday,
  },
});
</script>
