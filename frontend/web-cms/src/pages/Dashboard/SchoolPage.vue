<template>
  <div class="main-content-container overflow-hidden">
    <SchoolOverview />
    <div class="row">
      <div class="col-xxl-8">
        <Stats />
      </div>
      <div class="col-xxl-4">
        <UpcomingEvents />
      </div>
    </div>
    <div class="row">
      <div class="col-lg-8 col-md-7">
        <AttendanceAnalyticsChart />
      </div>
      <div class="col-lg-4 col-md-5">
        <Teachers />
      </div>
    </div>
    <div class="row">
      <div class="col-xxl-4 col-md-6">
        <StudentsOverviewChart />
      </div>
      <div class="col-xxl-4 col-md-6">
        <NewAdmissionsChart />
      </div>
      <div class="col-xxl-4 col-md-12">
        <NoticeBoard />
      </div>
    </div>

    <StudentsList />
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, onBeforeUnmount } from "vue";
import SchoolOverview from "../../components/Dashboard/School/SchoolOverview.vue";
import Stats from "../../components/Dashboard/School/Stats/index.vue";
import UpcomingEvents from "../../components/Dashboard/School/UpcomingEvents.vue";
import AttendanceAnalyticsChart from "../../components/Dashboard/School/AttendanceAnalyticsChart.vue";
import Teachers from "../../components/Dashboard/School/Teachers.vue";
import StudentsOverviewChart from "../../components/Dashboard/School/StudentsOverviewChart.vue";
import NewAdmissionsChart from "../../components/Dashboard/School/NewAdmissionsChart.vue";
import NoticeBoard from "../../components/Dashboard/School/NoticeBoard.vue";
import StudentsList from "../../components/Dashboard/School/StudentsList.vue";

export default defineComponent({
  name: "SchoolPage",
  components: {
    SchoolOverview,
    Stats,
    UpcomingEvents,
    AttendanceAnalyticsChart,
    Teachers,
    StudentsOverviewChart,
    NewAdmissionsChart,
    NoticeBoard,
    StudentsList,
  },
  setup() {
    onMounted(() => {
      document.body.classList.add("bg-white", "school-page");
    });

    onBeforeUnmount(() => {
      document.body.classList.remove("bg-white", "school-page");
    });
  },
});
</script>

<style lang="scss">
body {
  &.school-page {
    .sidebar-area {
      border-right: var(--bs-border-width) var(--bs-border-style)
        var(--bs-border-color) !important;
    }
    .header-area {
      padding: 12px 0 !important;
      &.sticky {
        padding-left: 25px !important;
        padding-right: 25px !important;
      }
      &.mb-4 {
        margin-bottom: 0.5rem !important;
      }
    }
    .footer-area {
      border: var(--bs-border-width) var(--bs-border-style)
        var(--bs-border-color) !important;
    }
  }
}
</style>
